/**
 * Static site build for One Stop Insurance.
 *
 *  1. Bundles the client (React hydration) per language with esbuild.
 *  2. Pre-renders every page × language to real HTML files:
 *       dist/<lang>/<slug>/index.html
 *     so every URL works when opened directly or refreshed on GitHub Pages.
 *  3. Generates: root language redirect, branded 404.html, sitemap.xml,
 *     robots.txt, web manifest and a versioned service worker.
 *
 * Environment variables:
 *   BASE_PATH  Path the site is served from. Default "/one-stop-insurance/".
 *   SITE_URL   Absolute site URL for canonical/OG/sitemap. Set automatically
 *              in GitHub Actions. Default "https://YOUR-USERNAME.github.io/one-stop-insurance/".
 */
process.env.NODE_ENV = 'production';

import { build as esbuild } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { en, type Dictionary } from '../src/i18n/en';
import { hi } from '../src/i18n/hi';
import { mr } from '../src/i18n/mr';
import { DEFAULT_LANG, LANGS, LANG_META, ROUTES, href, type Lang, type RouteId } from '../src/routes';
import { business, isPlaceholder, partners } from '../src/config/site';
import { Wordmark } from '../src/components/Layout';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DICTS: Record<Lang, Dictionary> = { en, hi, mr };

const norm = (p: string) => (p.endsWith('/') ? p : p + '/');
const BASE = norm(process.env.BASE_PATH || '/');
const SITE_URL = norm(
  process.env.SITE_URL || 'https://one-stop-insurance.vercel.app/'
);
const ORIGIN = new URL(SITE_URL).origin;
const abs = (path: string) => ORIGIN + path; // path already contains BASE
const BUILD_YEAR = new Date().getFullYear();
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonLd = (o: unknown) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

function fontHref(lang: Lang) {
  const fams = ['family=Inter:wght@400;500;600;700', 'family=Poppins:wght@500;600;700;800'];
  if (lang !== 'en') fams.push('family=Noto+Sans+Devanagari:wght@400;500;600;700');
  return `https://fonts.googleapis.com/css2?${fams.join('&')}&display=swap`;
}

/* ---------------------------------------------------------------- */
async function main() {
  const t0 = Date.now();
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  // 1. Static public files (icons, images, partner logos)
  cpSync(join(ROOT, 'public'), DIST, { recursive: true, filter: (src) => !src.endsWith('README.md') });

  // 2. Client bundles (one entry per language, shared React chunk)
  const js = await esbuild({
    entryPoints: LANGS.map((l) => join(ROOT, `src/entries/${l}.tsx`)),
    bundle: true,
    splitting: true,
    format: 'esm',
    minify: true,
    target: ['es2020', 'chrome90', 'safari15', 'firefox90'],
    jsx: 'automatic',
    outdir: join(DIST, 'assets'),
    entryNames: 'app-[name]-[hash]',
    chunkNames: 'chunk-[hash]',
    define: { 'process.env.NODE_ENV': '"production"' },
    metafile: true,
    legalComments: 'none',
    charset: 'utf8',
    logLevel: 'warning',
  });
  const css = await esbuild({
    entryPoints: [join(ROOT, 'src/styles/main.css')],
    bundle: true,
    minify: true,
    outdir: join(DIST, 'assets'),
    entryNames: 'styles-[hash]',
    metafile: true,
    logLevel: 'warning',
  });

  const toUrl = (file: string) => BASE + relative(DIST, join(ROOT, file)).split('\\').join('/');
  const entryJs: Record<Lang, { url: string; imports: string[] }> = {} as never;
  type OutMeta = { entryPoint?: string; imports: { path: string; kind: string }[] };
  for (const [file, out] of Object.entries(js.metafile!.outputs as Record<string, OutMeta>)) {
    if (!out.entryPoint) continue;
    const lang = out.entryPoint.match(/entries\/(\w+)\.tsx$/)![1] as Lang;
    entryJs[lang] = { url: toUrl(file), imports: out.imports.filter((i) => i.kind === 'import-statement').map((i) => toUrl(i.path)) };
  }
  const cssUrl = toUrl(Object.keys(css.metafile.outputs).find((f) => f.endsWith('.css'))!);

  // 3. Pre-render pages
  const pageUrls: { lang: Lang; id: RouteId; path: string }[] = [];
  for (const lang of LANGS) {
    for (const route of ROUTES) {
      const path = href(BASE, lang, route.id);
      const html = renderPage(lang, route.id, path, entryJs[lang], cssUrl);
      const outDir = join(DIST, path.slice(BASE.length));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
      pageUrls.push({ lang, id: route.id, path });
    }
  }

  // 4. Root language redirect, 404, SEO files, PWA files
  writeFileSync(join(DIST, 'index.html'), renderRootRedirect(cssUrl));
  writeFileSync(join(DIST, '404.html'), render404(cssUrl));
  writeFileSync(join(DIST, 'sitemap.xml'), renderSitemap());
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
  writeFileSync(join(DIST, 'manifest.webmanifest'), JSON.stringify(manifest(), null, 2));
  writeFileSync(join(DIST, '.nojekyll'), '');
  writeFileSync(join(DIST, 'sw.js'), renderServiceWorker());

  const files = walk(DIST);
  console.log(`\n✔ Built ${pageUrls.length} pages (${LANGS.length} languages) + 404 into dist/ in ${Date.now() - t0} ms`);
  console.log(`  BASE_PATH = ${BASE}\n  SITE_URL  = ${SITE_URL}`);
  console.log(`  ${files.length} files, ${(files.reduce((s, f) => s + statSync(f).size, 0) / 1024).toFixed(0)} KB total`);
  reportPlaceholders();
}

/* ---------------------------------------------------------------- */
function renderPage(lang: Lang, id: RouteId, path: string, js: { url: string; imports: string[] }, cssUrl: string) {
  const t = DICTS[lang];
  const meta = t.meta[id === 'faqs' ? 'faqs' : id];
  const body = renderToString(<App lang={lang} t={t} route={id} base={BASE} buildYear={BUILD_YEAR} />);
  const canonical = abs(path);
  const ogImage = abs(`${BASE}icons/og-image.png`);

  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${LANG_META[l].htmlLang}" href="${abs(href(BASE, l, id))}">`).join('\n    ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${abs(href(BASE, DEFAULT_LANG, id))}">`;

  // Structured data
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '#organization',
    name: business.name,
    alternateName: business.shortName,
    url: SITE_URL,
    logo: abs(`${BASE}icons/icon-512.png`),
    areaServed: { '@type': 'State', name: 'Maharashtra', containedInPlace: { '@type': 'Country', name: 'India' } },
    knowsLanguage: ['en', 'hi', 'mr'],
  };
  if (!isPlaceholder(business.phone)) {
    org.contactPoint = { '@type': 'ContactPoint', telephone: business.phone, contactType: 'customer service', areaServed: 'IN-MH', availableLanguage: ['English', 'Hindi', 'Marathi'] };
  }
  if (!isPlaceholder(business.email)) org.email = business.email;
  const ld: unknown[] = [org];
  if (id === 'home') {
    ld.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: business.name, url: abs(path), inLanguage: LANG_META[lang].htmlLang, publisher: { '@id': SITE_URL + '#organization' } });
  } else {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.common.breadcrumbHome, item: abs(href(BASE, lang, 'home')) },
        { '@type': 'ListItem', position: 2, name: t.common.nav[id], item: canonical },
      ],
    });
  }
  if (id === 'faqs') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: LANG_META[lang].htmlLang,
      mainEntity: t.faqs.categories.flatMap((c) => c.items.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } }))),
    });
  }
  if (id === 'services') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: t.services.items.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: s.title, description: s.short, serviceType: 'Vehicle insurance assistance', areaServed: 'Maharashtra, India', provider: { '@id': SITE_URL + '#organization' } } })),
    });
  }

  const preloads = [js.url, ...js.imports].map((u) => `<link rel="modulepreload" href="${u}">`).join('\n    ');
  const loaderWordmark = renderToString(<Wordmark size="lg" />);

  return `<!doctype html>
<html lang="${LANG_META[lang].htmlLang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}">
    <link rel="canonical" href="${canonical}">
    ${alternates}
    ${xDefault}
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#102B50">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(t.meta.siteName)}">
    <meta property="og:title" content="${esc(meta.title)}">
    <meta property="og:description" content="${esc(meta.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="One Stop Insurance">
    <meta property="og:locale" content="${LANG_META[lang].ogLocale}">
    ${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LANG_META[l].ogLocale}">`).join('\n    ')}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(meta.title)}">
    <meta name="twitter:description" content="${esc(meta.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="icon" href="${BASE}favicon.ico" sizes="32x32">
    <link rel="icon" href="${BASE}icons/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="${BASE}icons/apple-touch-icon.png">
    <link rel="manifest" href="${BASE}manifest.webmanifest">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="OSI">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="${fontHref(lang)}">
    <link rel="stylesheet" href="${cssUrl}">
    ${preloads}
    <script>${headScript(lang)}</script>
    ${ld.map(jsonLd).join('\n    ')}
  </head>
  <body>
    <div class="osi-loader" aria-hidden="true">${loaderWordmark}<div class="osi-loader__bar"></div></div>
    <div id="root">${body}</div>
    <script>window.__OSI__=${JSON.stringify({ lang, route: id, base: BASE, buildYear: BUILD_YEAR })}</script>
    <script type="module" src="${js.url}"></script>
  </body>
</html>
`;
}

/** Inline, render-blocking but tiny: remembers language, shows the loader on the first page of a visit only. */
function headScript(lang: Lang) {
  return `(function(){var d=document.documentElement;try{localStorage.setItem('osi-lang','${lang}')}catch(e){}try{if(!sessionStorage.getItem('osi-seen')){sessionStorage.setItem('osi-seen','1');d.classList.add('osi-loading');window.__osiT=Date.now();setTimeout(function(){d.classList.remove('osi-loading')},3000)}}catch(e){}})();`;
}

/* ---------------------------------------------------------------- */
function renderRootRedirect(cssUrl: string) {
  const links = LANGS.map((l) => `<a href="${BASE}${l}/" hreflang="${l}" lang="${l}">${LANG_META[l].native}</a>`).join(' · ');
  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(en.meta.home.title)}</title>
    <meta name="description" content="${esc(en.meta.home.description)}">
    <link rel="canonical" href="${SITE_URL}en/">
    ${LANGS.map((l) => `<link rel="alternate" hreflang="${LANG_META[l].htmlLang}" href="${SITE_URL}${l}/">`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}en/">
    <meta name="theme-color" content="#102B50">
    <link rel="icon" href="${BASE}favicon.ico" sizes="32x32">
    <link rel="icon" href="${BASE}icons/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="manifest" href="${BASE}manifest.webmanifest">
    <link rel="stylesheet" href="${cssUrl}">
    <script>
      (function () {
        var langs = ${JSON.stringify(LANGS)}, pick = null;
        try { pick = localStorage.getItem('osi-lang'); } catch (e) {}
        if (langs.indexOf(pick) < 0) {
          var nav = (navigator.languages || [navigator.language || 'en']).map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
          pick = 'en';
          for (var i = 0; i < nav.length; i++) { if (langs.indexOf(nav[i]) >= 0) { pick = nav[i]; break; } }
        }
        location.replace('${BASE}' + pick + '/' + location.search + location.hash);
      })();
    </script>
    <noscript><meta http-equiv="refresh" content="0; url=${BASE}en/"></noscript>
  </head>
  <body class="nf-body">
    <main class="nf"><div class="nf__card">${renderToString(<Wordmark size="lg" />)}<p class="nf__langs" style="margin-top:2rem">${links}</p></div></main>
  </body>
</html>
`;
}

/* ---------------------------------------------------------------- */
function render404(cssUrl: string) {
  const copy = Object.fromEntries(LANGS.map((l) => [l, { ...DICTS[l].notFound, home: DICTS[l].notFound.home, htmlLang: LANG_META[l].htmlLang }]));
  const slugs = ROUTES.map((r) => r.slug).filter(Boolean);
  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(en.meta.notFound.title)}</title>
    <meta name="robots" content="noindex">
    <meta name="theme-color" content="#102B50">
    <link rel="icon" href="${BASE}favicon.ico" sizes="32x32">
    <link rel="icon" href="${BASE}icons/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="${fontHref('hi')}">
    <link rel="stylesheet" href="${cssUrl}">
    <script>
      // Old or language-less links such as ${BASE}services → redirect to the visitor's language.
      (function () {
        var base = '${BASE}', langs = ${JSON.stringify(LANGS)}, slugs = ${JSON.stringify(slugs)};
        var rest = location.pathname.indexOf(base) === 0 ? location.pathname.slice(base.length) : location.pathname.replace(/^\\//, '');
        var first = rest.split('/')[0];
        if (langs.indexOf(first) < 0 && slugs.indexOf(first) >= 0) {
          var l = 'en'; try { l = localStorage.getItem('osi-lang') || 'en'; } catch (e) {}
          if (langs.indexOf(l) < 0) l = 'en';
          location.replace(base + l + '/' + first + '/' + location.hash);
        }
      })();
    </script>
  </head>
  <body class="nf-body">
    <main class="nf">
      <div class="nf__card">
        <a href="${BASE}" id="nf-logo" aria-label="One Stop Insurance">${renderToString(<Wordmark size="lg" />)}</a>
        <p class="nf__code" aria-hidden="true">404</p>
        <h1 id="nf-title">${esc(en.notFound.title)}</h1>
        <p id="nf-text" class="section-text">${esc(en.notFound.text)}</p>
        <a id="nf-home" class="btn btn--navy btn--lg" href="${BASE}en/">${esc(en.notFound.home)}</a>
        <p class="nf__langs">${LANGS.map((l) => `<a href="${BASE}${l}/" lang="${l}" data-l="${l}">${LANG_META[l].native}</a>`).join('')}</p>
      </div>
    </main>
    <script>
      (function () {
        var base = '${BASE}', copy = ${JSON.stringify(copy).replace(/</g, '\\u003c')};
        var rest = location.pathname.indexOf(base) === 0 ? location.pathname.slice(base.length) : '';
        var l = rest.split('/')[0];
        if (!copy[l]) { try { l = localStorage.getItem('osi-lang'); } catch (e) {} }
        if (!copy[l]) l = 'en';
        var c = copy[l];
        document.documentElement.lang = c.htmlLang;
        document.title = c.title + ' | One Stop Insurance';
        document.getElementById('nf-title').textContent = c.title;
        document.getElementById('nf-text').textContent = c.text;
        var h = document.getElementById('nf-home'); h.textContent = c.home; h.href = base + l + '/';
        document.getElementById('nf-logo').href = base + l + '/';
      })();
    </script>
  </body>
</html>
`;
}

/* ---------------------------------------------------------------- */
function renderSitemap() {
  const urls = ROUTES.flatMap((r) =>
    LANGS.map((l) => {
      const alts = LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${LANG_META[a].htmlLang}" href="${abs(href(BASE, a, r.id))}"/>`).join('\n');
      const priority = r.id === 'home' ? '1.0' : r.id === 'terms' || r.id === 'disclaimer' ? '0.3' : '0.8';
      return `  <url>\n    <loc>${abs(href(BASE, l, r.id))}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <priority>${priority}</priority>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(href(BASE, DEFAULT_LANG, r.id))}"/>\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

function manifest() {
  return {
    name: 'One Stop Insurance',
    short_name: 'One Stop',
    description: en.meta.home.description,
    id: BASE,
    start_url: BASE,
    scope: BASE,
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#FFFFFF',
    theme_color: '#102B50',
    lang: 'en-IN',
    categories: ['finance', 'business'],
    icons: [
      { src: `${BASE}icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${BASE}icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${BASE}icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

/* ---------------------------------------------------------------- */
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function renderServiceWorker() {
  const files = walk(DIST).map((f) => BASE + relative(DIST, f).split('\\').join('/'));
  // Precache: informational pages (all languages), hashed JS/CSS, icons and manifest.
  const pages = LANGS.flatMap((l) => ROUTES.filter((r) => r.precache).map((r) => href(BASE, l, r.id)));
  const statics = files.filter((f) => /\/assets\/|\/icons\/|manifest\.webmanifest$|favicon\.ico$/.test(f) && !/og-image/.test(f));
  const precache = [BASE, ...pages, ...statics];
  const hash = createHash('sha256');
  for (const f of walk(DIST).sort()) hash.update(readFileSync(f));
  const version = hash.digest('hex').slice(0, 12);
  const tpl = readFileSync(join(ROOT, 'src/sw-template.js'), 'utf8');
  return tpl
    .replace('__VERSION__', version)
    .replace('__BASE__', BASE)
    .replace('__LANGS__', JSON.stringify(LANGS))
    .replace('__PRECACHE__', JSON.stringify(precache, null, 2));
}

/* ---------------------------------------------------------------- */
function reportPlaceholders() {
  const missing: string[] = [];
  if (isPlaceholder(business.phone)) missing.push('business.phone            (Call Now buttons)');
  if (isPlaceholder(business.whatsapp)) missing.push('business.whatsapp         (WhatsApp buttons)');
  if (isPlaceholder(business.email)) missing.push('business.email');
  if (!business.addressLines.length) missing.push('business.addressLines     (office address)');
  if (!business.hours.en) missing.push('business.hours            (operating hours, en/hi/mr)');
  if (isPlaceholder(business.mapEmbedUrl)) missing.push('business.mapEmbedUrl      (Google Maps embed)');
  if (isPlaceholder(business.directionsUrl)) missing.push('business.directionsUrl    (Get Directions link)');
  if (partners.some((p) => !p.logo)) missing.push('partners[].logo           (approved insurer logo files, optional)');
  if (!existsSync(join(ROOT, 'assets-src/photos/hero.jpg'))) missing.push('assets-src/photos/*.jpg   (professional photography, optional — see README)');
  if (SITE_URL.includes('YOUR-USERNAME')) missing.push('SITE_URL                  (set automatically by GitHub Actions)');
  if (missing.length) {
    console.log('\n⚠ Placeholders still in use (edit src/config/site.ts — see PLACEHOLDERS.md):');
    for (const m of missing) console.log('  • ' + m);
  }
  console.log('');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
