/**
 * Route table. Every route is pre-rendered for every language as
 * /<base>/<lang>/<slug>/index.html, so direct links and refreshes
 * work on GitHub Pages without any server configuration.
 */
export const LANGS = ['en', 'hi', 'mr'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export const LANG_META: Record<Lang, { label: string; native: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', native: 'English', htmlLang: 'en-IN', ogLocale: 'en_IN' },
  hi: { label: 'Hindi', native: 'हिन्दी', htmlLang: 'hi-IN', ogLocale: 'hi_IN' },
  mr: { label: 'Marathi', native: 'मराठी', htmlLang: 'mr-IN', ogLocale: 'mr_IN' },
};

export const ROUTES = [
  { id: 'home', slug: '', precache: true },
  { id: 'about', slug: 'about', precache: true },
  { id: 'vehicle', slug: 'vehicle-insurance', precache: true },
  { id: 'services', slug: 'services', precache: true },
  { id: 'types', slug: 'insurance-types', precache: true },
  { id: 'renewal', slug: 'insurance-renewal', precache: true },
  { id: 'faqs', slug: 'faqs', precache: true },
  { id: 'contact', slug: 'contact', precache: false },
  { id: 'terms', slug: 'terms', precache: false },
  { id: 'disclaimer', slug: 'disclaimer', precache: false },
] as const;

export type RouteId = (typeof ROUTES)[number]['id'];

export function slugOf(id: RouteId): string {
  return ROUTES.find((r) => r.id === id)!.slug;
}

/** Build a site-relative URL, e.g. href('/one-stop-insurance/', 'hi', 'services', 'comprehensive') */
export function href(base: string, lang: Lang, id: RouteId, hash?: string): string {
  const slug = slugOf(id);
  return `${base}${lang}/${slug ? slug + '/' : ''}${hash ? '#' + hash : ''}`;
}
