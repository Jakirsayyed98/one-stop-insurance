import { createContext, useContext } from 'react';
import type { Dictionary } from '../i18n/en';
import { href as buildHref, type Lang, type RouteId } from '../routes';

export interface SiteContextValue {
  lang: Lang;
  t: Dictionary;
  route: RouteId;
  /** Base path the site is served from, always ending in "/" — e.g. "/one-stop-insurance/" */
  base: string;
  /** Year the page was built; the footer replaces it with the visitor's current year after load. */
  buildYear: number;
}

export const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('SiteContext missing');
  const link = (id: RouteId, hash?: string, lang: Lang = ctx.lang) => buildHref(ctx.base, lang, id, hash);
  const asset = (path: string) => ctx.base + path.replace(/^\//, '');
  return { ...ctx, link, asset };
}
