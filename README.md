# One Stop Insurance (OSI) — Website, Phase 1

A professional, multilingual (English · हिन्दी · मराठी) **informational website** for **One Stop Insurance**, a vehicle insurance services business serving customers across Maharashtra, India.

Phase 1 is a static website. It explains vehicle insurance, lists services and invites visitors to **call** or **WhatsApp**. It has no backend, no forms, no purchasing and no premium calculator.

> **Before going live:** add your real phone, WhatsApp, email, address and map details. See **[PLACEHOLDERS.md](PLACEHOLDERS.md)** for the complete checklist.

---

## Contents

1. [Business introduction](#business-introduction)
2. [Technology stack](#technology-stack)
3. [Features](#features)
4. [Folder structure](#folder-structure)
5. [Prerequisites](#prerequisites)
6. [Installation & local development](#installation--local-development)
7. [Production build](#production-build)
8. [Put the site on GitHub (beginner guide)](#put-the-site-on-github-beginner-guide)
9. [Deploy with GitHub Pages](#deploy-with-github-pages)
10. [Updating the website](#updating-the-website)
11. [PWA (installable app & offline)](#pwa-installable-app--offline)
12. [SEO](#seo)
13. [Running in VS Code and Claude Code](#running-in-vs-code-and-claude-code)
14. [Phase 2 readiness](#phase-2-readiness)

---

## Business introduction

**One Stop Insurance (OSI)** helps vehicle owners across Maharashtra explore insurance options for:

- **Two-wheelers** — bikes, scooters and other eligible two-wheelers
- **Private cars** — private and personal-use vehicles
- **Commercial vehicles** — goods-carrying and passenger-carrying vehicles, commercial cars, taxis and other eligible commercial vehicles

The business assists with **new policies and renewals** over phone and WhatsApp. Policies are issued by the relevant insurer.

## Technology stack

| Layer | Choice | Why |
|-------|--------|-----|
| UI | **React 19** + **TypeScript** | Component-based, typed, easy to extend in Phase 2 |
| Rendering | **Static pre-rendering** (`react-dom/server`) + client **hydration** | Every page × language is a real HTML file, so direct links and refreshes always work on GitHub Pages, and search engines see the full content |
| Bundler | **esbuild** | Very fast, one small dependency, per-language code splitting |
| Styling | **Modern CSS** (custom properties, mobile-first) | No CSS framework needed; one well-organised stylesheet |
| Routing | Static route table (`src/routes.ts`) with language-prefixed URLs (`/en/`, `/hi/`, `/mr/`) | Clean URLs without the "SPA 404 redirect" workarounds that client-side routers need on GitHub Pages |
| Icons | **Lucide** icon paths, copied locally (ISC licence) | Same icons as `lucide-react`, with no runtime dependency |
| Fonts | **Poppins** (headings), **Inter** (English body), **Noto Sans Devanagari** (Hindi/Marathi) via Google Fonts | Professional pairing with full Devanagari support |
| Images | **sharp** pipeline → AVIF + WebP + JPEG at multiple widths | Optimised, responsive and lazy-loaded |
| PWA | Hand-written, versioned **service worker** + web manifest | Small, transparent and aware of the GitHub Pages base path |
| Hosting | **GitHub Pages** via **GitHub Actions** | Free, automatic deploy on every push to `main` |

**Why not Vite + React Router?** A client-side router on GitHub Pages needs a `404.html` redirect trick for every deep link, and it ships empty HTML to search engines. Pre-rendering each page avoids both problems. The site still uses React components throughout, so moving to Vite (or Next.js / Astro) in Phase 2 is straightforward.

Runtime dependencies: **`react`, `react-dom`** only.

## Features

- **10 pages × 3 languages** (30 pre-rendered pages): Home, About Us, Vehicle Insurance, Our Services, Insurance Types, Insurance Renewal, FAQs, Contact Us, Terms & Conditions, Disclaimer
- Branded **404 page** in all three languages. Old or language-less links (e.g. `/services`) redirect to the visitor's language.
- **Complete manual translations**: English, Hindi, Marathi. No machine-translation APIs.
- **Language memory**: the chosen language is remembered, and the root URL sends visitors to it
- **Contact actions everywhere**: `tel:` Call Now and WhatsApp click-to-chat with a pre-filled message, in the header, homepage, every service section, Contact page, footer, mobile bottom bar and floating buttons
- **Mobile-first**: hamburger menu with language switcher, fixed bottom navigation (Home · Services · Contact · WhatsApp) with active-item highlight, floating Call/WhatsApp buttons, no horizontal overflow
- **Premium UI**: navy/orange brand system, custom text wordmark, cards, steps, statistics counters, subtle reveal animations, scroll-progress bar, back-to-top (homepage only), branded loading screen (first visit of a session only)
- **Accessibility**: skip link, semantic landmarks, keyboard-operable menus and accordions (ARIA), visible focus states, `prefers-reduced-motion` support, meaningful alt text
- **PWA**: installable, offline access to informational pages, silent background updates
- **SEO**: unique titles and descriptions, canonical URLs, `hreflang`, Open Graph and Twitter cards, JSON-LD (Organization, WebSite, BreadcrumbList, FAQPage, Service list), `sitemap.xml`, `robots.txt`
- **Honest by design**: no invented phone numbers, addresses, statistics, testimonials, registrations or guarantees. Missing details show "To be updated soon", and the build lists them.

## Folder structure

```
one-stop-insurance/
├── .github/workflows/deploy.yml   # Build + deploy to GitHub Pages on push to main
├── assets-src/
│   ├── brand/                     # Source SVGs for app icons and the social share image
│   └── photos/                    # Put original photos here, then run `npm run images`
├── public/                        # Copied as-is into the site
│   ├── favicon.ico
│   ├── icons/                     # Favicons, PWA icons, apple-touch-icon, og-image
│   ├── images/                    # Generated responsive photos (after `npm run images`)
│   └── partners/                  # Approved insurer logo files (optional)
├── scripts/
│   ├── build.tsx                  # Static build: bundles, pre-renders, sitemap, SW, manifest, 404
│   ├── dev.ts                     # Local dev/preview server (behaves like GitHub Pages)
│   ├── icons.ts                   # Regenerates icons from assets-src/brand
│   └── images.ts                  # Optimises photos to AVIF/WebP/JPEG
├── src/
│   ├── config/
│   │   ├── site.ts                # ★ Business details, insurers, stats — edit this
│   │   └── photos.ts              # Generated photo registry
│   ├── i18n/
│   │   ├── en.ts                  # ★ English text (reference)
│   │   ├── hi.ts                  # ★ Hindi text
│   │   └── mr.ts                  # ★ Marathi text
│   ├── components/                # Layout (header, footer, nav), UI pieces, icons, illustrations
│   ├── pages/                     # One file per page
│   ├── lib/                       # Context, contact-link helpers, progressive enhancements
│   ├── entries/                   # Per-language client entry points
│   ├── styles/main.css            # Design system and all styles
│   ├── sw-template.js             # Service worker template (filled in at build time)
│   ├── routes.ts                  # Pages, URL slugs, languages
│   ├── App.tsx
│   └── client.tsx                 # Hydration
├── PLACEHOLDERS.md                # ★ What to fill in before launch
├── package.json
└── tsconfig.json
```

## Prerequisites

- **Node.js 20 or newer** (22 LTS recommended) — <https://nodejs.org> (the installer includes npm)
- **Git** — <https://git-scm.com/downloads>
- A code editor — **VS Code** recommended: <https://code.visualstudio.com>

Check your versions in a terminal:

```bash
node -v
npm -v
git --version
```

## Installation & local development

```bash
# 1. Go into the project folder
cd one-stop-insurance

# 2. Install dependencies (first time only)
npm install

# 3. Start the local server with auto-rebuild
npm run dev
```

Open **<http://localhost:5173/one-stop-insurance/>** in your browser. The address includes `/one-stop-insurance/` because that is where GitHub Pages will host the site.

When you save a file in `src/` or `public/`, the site rebuilds automatically. Refresh the browser to see the change.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Build + local server + rebuild on changes |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Build once and serve `dist/` (no watching) |
| `npm run typecheck` | TypeScript type check |
| `npm run images` | Optimise photos from `assets-src/photos/` |
| `npm run icons` | Regenerate icons from `assets-src/brand/` |

> **Tip:** the service worker caches pages. If you use `npm run preview` and something looks stale, open DevTools → Application → Service Workers → *Unregister*, then reload.

## Production build

```bash
npm run build
```

The finished site is in `dist/`. The build also prints any business placeholders that are still unfilled.

Optional environment variables (GitHub Actions sets both automatically):

| Variable | Default | Meaning |
|----------|---------|---------|
| `BASE_PATH` | `/one-stop-insurance/` | Path the site is served from |
| `SITE_URL` | `https://YOUR-USERNAME.github.io/one-stop-insurance/` | Full public address (used for canonical URLs, sitemap, social cards) |

## Put the site on GitHub (beginner guide)

### 1. Create a GitHub account

1. Go to <https://github.com/signup>.
2. Enter your email, a password and a **username**. Your username becomes part of the website address: `https://<username>.github.io/one-stop-insurance/`.
3. Verify your email address.

### 2. Create a public repository

1. Sign in, click **+** (top-right) → **New repository**.
2. **Repository name:** `one-stop-insurance`
3. Select **Public**.
4. **Do not** tick "Add a README", ".gitignore" or "license" (the project already has them).
5. Click **Create repository** and keep the page open. You will need the URL it shows, e.g. `https://github.com/<username>/one-stop-insurance.git`.

### 3. Initialise Git and connect the project

Open a terminal **inside the project folder** (in VS Code: *Terminal → New Terminal*):

```bash
# Tell Git who you are (once per computer)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Turn the folder into a Git repository, on a branch called main
git init
git branch -M main

# Connect it to GitHub (replace <username>)
git remote add origin https://github.com/<username>/one-stop-insurance.git
```

### 4. Commit the source code

```bash
npm install            # creates package-lock.json (commit it — makes builds repeatable)
git add .
git commit -m "Initial commit: One Stop Insurance website (Phase 1)"
```

### 5. Push to GitHub

```bash
git push -u origin main
```

The first time, Git asks you to sign in:

- **Easiest:** a browser window opens (Git Credential Manager on Windows/macOS). Approve it.
- **Or in VS Code:** use the *Source Control* panel → **Publish Branch**, and sign in to GitHub when prompted.
- **Or with a token:** GitHub no longer accepts your account password here. Create a token at *GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens* (give it **Contents: Read and write** for this repository) and paste it when Git asks for a password.

## Deploy with GitHub Pages

The workflow `.github/workflows/deploy.yml` is already included. It builds and deploys automatically on every push to `main`.

### 6. Enable GitHub Pages (one time)

1. In your repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

### 7. Run the deployment

- Pushing to `main` starts it automatically. To run it manually, open the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.
- Open the **Actions** tab to watch progress. A green tick means it succeeded, which usually takes 1–2 minutes.

### 8. Verify the live website

1. Open `https://<username>.github.io/one-stop-insurance/` — you should be redirected to `/en/` (or your browser's language).
2. Click through the menu, switch to हिन्दी and मराठी, and refresh on an inner page (e.g. `/hi/faqs/`) — it should load directly.
3. Try a wrong address (e.g. `/en/xyz`) — the branded 404 page should appear.
4. On a phone, check the bottom navigation, the WhatsApp button and **Add to Home Screen**.
5. After adding real contact details, test the **Call Now** and **WhatsApp** buttons on a phone.

### Updating the live site later

```bash
git add .
git commit -m "Describe your change"
git push
```

GitHub rebuilds and redeploys automatically. Visitors receive the new version silently on their next visit.

### Custom domain (optional)

In **Settings → Pages → Custom domain**, enter your domain and follow GitHub's DNS instructions. The workflow picks up the new address automatically, and canonical URLs and the sitemap update on the next deploy.

## Updating the website

### Business information

Edit **`src/config/site.ts`**: phone, WhatsApp, email, address, hours, map embed and directions link. Full guide: **[PLACEHOLDERS.md](PLACEHOLDERS.md)**.

### Insurance partners

In `src/config/site.ts`, the `partners` list controls the logo cards on the homepage:

```ts
export const partners = [
  { id: 'icici-lombard', name: 'ICICI Lombard', logo: 'partners/icici-lombard.svg' }, // with logo
  { id: 'hdfc-ergo', name: 'HDFC ERGO' },                                             // name card only
  // add a line to add an insurer; delete a line to remove one
];
```

- Put logo files in `public/partners/` (SVG preferred). Use **only** official logos you have permission to use.
- The "listed insurance companies" statistic updates automatically from this list.
- A disclaimer under the logos states that the display does not imply partnership or authorisation.

### Translations

All text lives in `src/i18n/en.ts` (English), `hi.ts` (Hindi) and `mr.ts` (Marathi). The three files have the same structure.

- **Change wording:** edit the text in each language file. Keep the keys (left side) unchanged.
- **Add new text:** add it to `en.ts` first, then add the same key to `hi.ts` and `mr.ts`. `npm run typecheck` reports any language that is missing it.
- The brand name "One Stop Insurance" stays in English in all languages.
- The WhatsApp pre-filled message is `common.whatsappMessage` in each language file.

### Statistics

`stats` in `src/config/site.ts`. Only verifiable facts are shown. Add business figures (customers, policies, years) **only** if they are real and verifiable.

### Replacing images and icons

**Photos** (hero and vehicle categories). The site currently shows original vehicle illustrations, so replacing them is optional.

1. Save licensed photos (≥ 1600 px wide) as `assets-src/photos/hero.jpg`, `two-wheeler.jpg`, `private-car.jpg`, `commercial.jpg`.
2. Run `npm run images`. This creates AVIF/WebP/JPEG versions in several sizes and updates `src/config/photos.ts`.
3. Rebuild. Photos then load responsively, are lazy-loaded below the fold and have fixed dimensions to prevent layout shift.

Use only images licensed for commercial use. Avoid watermarks and readable number plates.

**Icons and favicon.** Edit the SVGs in `assets-src/brand/` (`icon.svg`, `icon-maskable.svg`, `og-image.svg`), then run `npm run icons`.

**Wordmark.** The ONE STOP / INSURANCE wordmark is text-based (`Wordmark` in `src/components/Layout.tsx`, styled by `.wordmark` in `src/styles/main.css`).

**Colours and fonts.** These are CSS variables at the top of `src/styles/main.css` (`--navy`, `--orange`, `--grey`, `--text`, `--font-head`, `--font-body`).

### Legal pages

Terms & Conditions and Disclaimer are **drafts for legal review**, and a visible notice says so. After review, update the text in the language files and remove the notice in `src/pages/Legal.tsx`.

## PWA (installable app & offline)

- **Manifest:** `manifest.webmanifest` sets the name, `standalone` display mode, navy theme colour, and 192/512 px icons plus a maskable icon. An Apple touch icon is also included.
- **Service worker** (`sw.js`, generated from `src/sw-template.js`):
  - **Precaches** Home, About, Vehicle Insurance, Our Services, Insurance Types, Insurance Renewal and FAQs in all three languages, plus scripts, styles and icons.
  - **Pages:** network-first, falling back to the cached copy when offline. An uncached page falls back to that language's homepage.
  - **Scripts and styles:** cache-first (file names change with every release).
  - **Google Fonts:** stale-while-revalidate.
  - **Never cached:** WhatsApp, Google Maps, `tel:` links and any other external service.
  - **Versioned caches:** each build gets a new version, the new worker activates silently, and old caches are deleted. Visitors see no update pop-ups.
- To install: Chrome/Android → menu → *Install app* / *Add to Home screen*; Safari iOS → Share → *Add to Home Screen*.

## SEO

- Unique `<title>` and meta description for every page in every language
- Canonical URL per page, plus `hreflang` alternates (`en-IN`, `hi-IN`, `mr-IN`, `x-default`)
- Open Graph and Twitter card tags with a branded 1200×630 share image
- JSON-LD structured data: Organization (area served: Maharashtra), WebSite, BreadcrumbList, FAQPage, Service list
- `sitemap.xml` with all 30 URLs and language alternates; `robots.txt`
- Semantic HTML, with all content pre-rendered (no JavaScript needed to read it)

**Note:** on a GitHub *project* site (`username.github.io/one-stop-insurance/`), search engines only read `robots.txt` at the domain root. After launch, submit `https://<username>.github.io/one-stop-insurance/sitemap.xml` in Google Search Console yourself. With a custom domain, `robots.txt` works automatically. No search ranking is guaranteed.

## Running in VS Code and Claude Code

### VS Code

1. **File → Open Folder…** → select `one-stop-insurance`.
2. **Terminal → New Terminal**, then run `npm install` (first time) and `npm run dev`.
3. Ctrl/Cmd-click the printed link `http://localhost:5173/one-stop-insurance/`.
4. Edit files and save. The site rebuilds; refresh the browser.
5. Use the **Source Control** panel (branch icon) to commit and push to GitHub.

### Claude Code (CLI)

1. Install Claude Code. The native installer is recommended:
   - macOS / Linux / WSL: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
   - Alternatives: `brew install --cask claude-code`, or `npm install -g @anthropic-ai/claude-code`
   - Official guide: <https://code.claude.com/docs/en/quickstart>
2. In a terminal: `cd one-stop-insurance`, then `claude`. Sign in when prompted.
3. Ask for changes in plain language, for example:
   - *"Replace the placeholder phone and WhatsApp numbers in src/config/site.ts with +91 98xxxxxxxx"*
   - *"Run npm run build and fix any errors"*
   - *"Commit my changes and push to GitHub"*

## Phase 2 readiness

Phase 1 is deliberately static. The structure is ready to grow:

- Pages are plain React components and content is separated from layout, so you can move to a framework with server features (e.g. Next.js) or add API calls without rewriting the UI.
- `src/config/site.ts` centralises business data, so a future admin dashboard or CMS can provide the same values.
- The routing table, the language system and the design system (CSS variables and components) can be reused for login, vehicle-details, comparison or payment flows.

Not implemented, by design: registration/login, vehicle details collection, premium comparison, insurer APIs, agent IDs, purchasing, payments, admin dashboard, commission management.

---

© One Stop Insurance. All Rights Reserved.
