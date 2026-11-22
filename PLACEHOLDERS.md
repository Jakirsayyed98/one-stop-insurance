# Business details to add before going live

The website is complete, but some business-specific details were intentionally **not invented**.
Until you add them, the site shows neutral text such as "To be updated soon" instead of fake data.

Almost everything is in **one file: `src/config/site.ts`**. After editing, run `npm run build` (or just push to GitHub —
the site rebuilds automatically). The build prints a list of anything still missing.

## Required before launch

| # | What | Where | Format / example | Where it appears |
|---|------|-------|------------------|------------------|
| 1 | Business phone number | `business.phone` | `'+919876543210'` (with +91, no spaces) | Every **Call Now** button (`tel:` link), header, footer, Contact page, floating call button |
| 2 | WhatsApp number | `business.whatsapp` | `'919876543210'` (country code, no `+`, no spaces) | Every **WhatsApp** button (`https://wa.me/…`), bottom nav, floating button, footer, Contact page |
| 3 | Business email | `business.email` | `'info@yourdomain.com'` | Footer, Contact page |
| 4 | Office address | `business.addressLines` | `['Office No. …', 'Area, City', 'Maharashtra 4XXXXX']` | Footer, Contact page |
| 5 | Operating hours (3 languages) | `business.hours` | `{ en: 'Mon–Sat, 10 AM – 7 PM', hi: '…', mr: '…' }` | Footer, Contact page |
| 6 | Google Maps embed | `business.mapEmbedUrl` | Google Maps → your office → **Share → Embed a map** → copy only the `src="…"` URL | Contact page map |
| 7 | Get Directions link | `business.directionsUrl` | `https://www.google.com/maps/dir/?api=1&destination=<your+address+or+place+id>` | Contact page **Get Directions** button |

> The placeholder phone `+918828564497` and WhatsApp `918828564497` are used in links until you replace them, so the link formats can be tested. They do **not** reach a real number.

## Review before launch

| # | What | Where | Notes |
|---|------|-------|-------|
| 8 | Legal pages | `terms` and `disclaimer` sections in `src/i18n/en.ts`, `hi.ts`, `mr.ts` | Written as **drafts**. Have them reviewed by a qualified legal professional. Once approved, remove the yellow "Draft for review" notice by deleting the `<Notice …>{t.common.draftNotice}</Notice>` line in `src/pages/Legal.tsx`. |
| 9 | Privacy notice | `common.footer.privacyText` in each language file | Short footer notice. Review together with the legal pages. |
| 10 | Insurer list | `partners` in `src/config/site.ts` | Six insurers listed by name, as requested. Remove any you do not actually work with. A disclaimer under the logos states that the display does not imply partnership. |
| 11 | Regulatory details (optional) | `business.regulatoryNote` | Only if you work through a licensed intermediary and have **verified** registration details. Leave empty otherwise. Never add unverified numbers. |
| 12 | Insurance rules mentioned in content | FAQ / Insurance Types text | Content reflects general Indian motor insurance rules (e.g. third-party cover mandatory, long-term TP for new vehicles, 90-day NCB window). Rules change — confirm with your insurer partners periodically. |

## Optional (improves the look)

| # | What | Where | Notes |
|---|------|-------|-------|
| 13 | Professional photography | `assets-src/photos/` then `npm run images` | `hero.jpg`, `two-wheeler.jpg`, `private-car.jpg`, `commercial.jpg`. Until added, clean vehicle illustrations are shown. See README → *Replacing images*. |
| 14 | Insurer logos | `public/partners/` + `logo:` field in `partners` | Use only official logos with permission / from official media kits. Until added, clean name cards are shown. |
| 15 | Verified statistics | `stats` in `src/config/site.ts` | Only verifiable figures are shown by default. Add business figures (e.g. customers assisted) **only** if real and verifiable. |
| 16 | Custom domain | GitHub → Settings → Pages | Optional. URLs, canonical tags and sitemap adjust automatically on the next deploy. |

## Set automatically — nothing to do

- **Website address (`SITE_URL`) and base path** — set by GitHub Actions from your repository (`https://<your-username>.github.io/one-stop-insurance/`).
- **Copyright year** — updates automatically.
