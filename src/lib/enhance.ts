/**
 * Progressive enhancements that run after React hydrates:
 * section reveal animations, statistic counters, loader removal
 * and service worker registration. All respect reduced motion.
 */
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (reduceMotion() || !('IntersectionObserver' in window)) return;
  const vh = window.innerHeight;
  // Only animate elements that are still below the fold, so nothing visible ever flickers.
  const pending = els.filter((el) => el.getBoundingClientRect().top > vh * 0.92);
  pending.forEach((el) => el.classList.add('reveal-pending'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add('reveal-in');
          el.classList.remove('reveal-pending');
          io.unobserve(el);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  pending.forEach((el) => io.observe(el));
}

function initCounters() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!els.length || reduceMotion() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? '';
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = '0' + suffix;
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
}

export function hideLoader() {
  const root = document.documentElement;
  if (!root.classList.contains('osi-loading')) return;
  // Keep the branded screen up for at least ~500 ms so it reads as intentional, never longer than needed.
  const shownAt = (window as unknown as { __osiT?: number }).__osiT ?? 0;
  const wait = Math.max(0, 500 - (Date.now() - shownAt));
  window.setTimeout(() => {
    root.classList.add('osi-loaded');
    window.setTimeout(() => root.classList.remove('osi-loading', 'osi-loaded'), 450);
  }, wait);
}

function registerServiceWorker(base: string) {
  if (!('serviceWorker' in navigator)) return;
  const register = () =>
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => {
      /* Offline support is optional; ignore registration failures. */
    });
  // enhance() runs after hydration, which is often after the load event has already fired.
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}

export function enhance(base: string) {
  initReveal();
  initCounters();
  hideLoader();
  registerServiceWorker(base);
}
