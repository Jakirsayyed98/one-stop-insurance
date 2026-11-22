/**
 * Local development / preview server (no extra dependencies).
 *   npm run dev      → builds, serves http://localhost:5173/one-stop-insurance/ and rebuilds on file changes
 *   npm run preview  → builds once and serves the production output
 * Unknown paths return dist/404.html with a 404 status — the same behaviour as GitHub Pages.
 */
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const PORT = Number(process.env.PORT || 5173);
const BASE = process.env.BASE_PATH || '';
const DIST = join(process.cwd(), 'dist');
const WATCH = !process.argv.includes('--no-watch');
const env = { ...process.env, BASE_PATH: BASE, SITE_URL: process.env.SITE_URL || `http://localhost:${PORT}${BASE}` };

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

let building: Promise<void> | null = null;
function build(): Promise<void> {
  building ??= new Promise<void>((resolve) => {
    const p = spawn(process.execPath, ['--import', 'tsx', 'scripts/build.tsx'], { stdio: 'inherit', env });
    p.on('exit', () => {
      building = null;
      resolve();
    });
  });
  return building;
}

await build();

createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://x');
  if (url.pathname === '/') {
    res.writeHead(302, { Location: BASE });
    return res.end();
  }
  if (!url.pathname.startsWith(BASE)) {
    res.writeHead(404);
    return res.end('Not found — the site lives at ' + BASE);
  }
  let file = normalize(join(DIST, decodeURIComponent(url.pathname.slice(BASE.length))));
  if (!file.startsWith(DIST)) {
    res.writeHead(403);
    return res.end();
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { Location: url.pathname + '/' + url.search });
      return res.end();
    }
    file = join(file, 'index.html');
  }
  let status = 200;
  if (!existsSync(file)) {
    status = 404;
    file = join(DIST, '404.html');
  }
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`\n  ➜ One Stop Insurance running at http://localhost:${PORT}${BASE}\n`);
});

if (WATCH) {
  let timer: NodeJS.Timeout | undefined;
  for (const dir of ['src', 'public']) {
    watch(dir, { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('↻ Change detected — rebuilding…');
        build();
      }, 150);
    });
  }
  console.log('  Watching src/ and public/ for changes (refresh the browser after a rebuild).');
}
