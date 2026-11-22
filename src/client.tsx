import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { enhance, hideLoader } from './lib/enhance';
import type { Dictionary } from './i18n/en';
import type { Lang, RouteId } from './routes';

declare global {
  interface Window {
    __OSI__: { lang: Lang; route: RouteId; base: string; buildYear: number };
  }
}

/** Hydrates the pre-rendered page with the dictionary for its language. */
export function boot(t: Dictionary) {
  const data = window.__OSI__;
  const root = document.getElementById('root');
  if (!root || !data) return hideLoader();
  hydrateRoot(root, <App {...data} t={t} />);
  requestAnimationFrame(() => enhance(data.base));
}
