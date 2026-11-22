import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSite } from '../lib/context';
import { LANGS, LANG_META, type Lang, type RouteId } from '../routes';
import { business } from '../config/site';
import { contactReady, displayPhone, mailHref, telHref, whatsappHref } from '../lib/contact';
import { Icon } from './Icon';
import { CallButton, WhatsAppButton, WhatsAppGlyph } from './ui';

/* ---------- Brand wordmark ---------- */

export function Wordmark({ variant = 'dark', size = 'md' }: { variant?: 'dark' | 'light'; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`wordmark wordmark--${variant} wordmark--${size}`} aria-label="One Stop Insurance">
      <span className="wordmark__top" aria-hidden="true">
        ONE&nbsp;STOP
      </span>
      <span className="wordmark__bottom" aria-hidden="true">
        INSURANCE
      </span>
    </span>
  );
}

const NAV: RouteId[] = ['home', 'about', 'vehicle', 'services', 'types', 'renewal', 'faqs', 'contact'];

function rememberLang(lang: Lang) {
  try {
    localStorage.setItem('osi-lang', lang);
  } catch {
    /* storage unavailable */
  }
}

/* ---------- Language selector ---------- */

function LanguageDropdown() {
  const { lang, route, link, t } = useSite();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return (
    <div className="lang-dd" ref={ref}>
      <button
        type="button"
        className="lang-dd__btn"
        aria-expanded={open}
        aria-controls="lang-dd-list"
        aria-label={`${t.common.language}: ${LANG_META[lang].native}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="Globe" size={18} />
        <span>{LANG_META[lang].native}</span>
        <Icon name="ChevronDown" size={16} />
      </button>
      <ul id="lang-dd-list" className="lang-dd__list" hidden={!open}>
        {LANGS.map((l) => (
          <li key={l}>
            <a
              href={link(route, undefined, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? 'true' : undefined}
              onClick={() => rememberLang(l)}
            >
              <span>{LANG_META[l].native}</span>
              {l === lang && <Icon name="Check" size={16} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LanguageSegmented() {
  const { lang, route, link, t } = useSite();
  return (
    <div className="lang-seg" role="group" aria-label={t.common.language}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={link(route, undefined, l)}
          hrefLang={l}
          lang={l}
          className={l === lang ? 'is-active' : ''}
          aria-current={l === lang ? 'true' : undefined}
          onClick={() => rememberLang(l)}
        >
          {LANG_META[l].native}
        </a>
      ))}
    </div>
  );
}

/* ---------- Header ---------- */

export function Header() {
  const { t, route, link } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href={link('home')} className="site-header__brand" aria-label={`One Stop Insurance — ${t.common.nav.home}`}>
          <Wordmark />
        </a>

        <nav className="main-nav" aria-label={t.common.mainNav}>
          <ul>
            {NAV.map((id) => (
              <li key={id}>
                <a href={link(id)} aria-current={route === id ? 'page' : undefined}>
                  {t.common.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageDropdown />
          <CallButton className="btn--sm header-call" />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label={t.common.mainNav}>
          <ul className="mobile-menu__list">
            {NAV.map((id) => (
              <li key={id}>
                <a href={link(id)} aria-current={route === id ? 'page' : undefined} onClick={() => setOpen(false)}>
                  <span>{t.common.nav[id]}</span>
                  <Icon name="ArrowRight" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__section">
          <p className="mobile-menu__label">
            <Icon name="Globe" size={16} /> {t.common.language}
          </p>
          <LanguageSegmented />
        </div>
        <div className="mobile-menu__section mobile-menu__cta">
          <CallButton />
          <WhatsAppButton />
        </div>
      </div>
      {open && <div className="mobile-menu__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  const { t, link, lang, buildYear } = useSite();
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const f = t.common.footer;
  const services = t.services.items;
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a href={link('home')} aria-label="One Stop Insurance">
            <Wordmark variant="light" />
          </a>
          <p>{f.about}</p>
        </div>

        <nav aria-label={f.quickLinks}>
          <h2 className="site-footer__title">{f.quickLinks}</h2>
          <ul>
            {(['home', 'about', 'vehicle', 'types', 'renewal', 'faqs', 'contact'] as RouteId[]).map((id) => (
              <li key={id}>
                <a href={link(id)}>{t.common.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.services}>
          <h2 className="site-footer__title">{f.services}</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <a href={link('services', s.id)}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__title">{f.contact}</h2>
          <ul className="site-footer__contact">
            <li>
              <Icon name="Phone" size={16} />
              <span>
                <span className="sr-only">{f.phone}: </span>
                {contactReady.phone() ? <a href={telHref()}>{displayPhone(business.phone)}</a> : f.pending}
              </span>
            </li>
            <li>
              <WhatsAppGlyph size={16} />
              <a href={whatsappHref(t.common.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                {t.common.chatOnWhatsApp}
              </a>
            </li>
            <li>
              <Icon name="Mail" size={16} />
              <span>
                <span className="sr-only">{f.email}: </span>
                {contactReady.email() ? <a href={mailHref()}>{business.email}</a> : f.pending}
              </span>
            </li>
            <li>
              <Icon name="MapPin" size={16} />
              <span>
                <span className="sr-only">{f.address}: </span>
                {contactReady.address() ? business.addressLines.join(', ') : f.pending}
              </span>
            </li>
            {business.hours[lang] && (
              <li>
                <Icon name="Clock" size={16} />
                <span>{business.hours[lang]}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container site-footer__privacy">
        <h2 className="site-footer__title">{f.privacyTitle}</h2>
        <p>{f.privacyText}</p>
        {business.regulatoryNote[lang] && <p>{business.regulatoryNote[lang]}</p>}
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © <span>{year}</span> One Stop Insurance. {f.rights}
          </p>
          <ul>
            <li>
              <a href={link('terms')}>{t.common.nav.terms}</a>
            </li>
            <li>
              <a href={link('disclaimer')}>{t.common.nav.disclaimer}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Mobile bottom navigation ---------- */

export function MobileBottomNav() {
  const { t, route, link } = useSite();
  const b = t.common.bottomNav;
  const item = (id: RouteId, icon: 'House' | 'LayoutGrid' | 'Phone', label: string) => (
    <li>
      <a href={link(id)} className={route === id ? 'is-active' : ''} aria-current={route === id ? 'page' : undefined}>
        <Icon name={icon} size={22} />
        <span>{label}</span>
      </a>
    </li>
  );
  return (
    <nav className="bottom-nav" aria-label={b.label}>
      <ul>
        {item('home', 'House', b.home)}
        {item('services', 'LayoutGrid', b.services)}
        {item('contact', 'Phone', b.contact)}
        <li>
          <a href={whatsappHref(t.common.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="bottom-nav__wa" aria-label={t.common.whatsappAria}>
            <WhatsAppGlyph size={22} />
            <span>{b.whatsapp}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

/* ---------- Floating contact buttons (mobile) ---------- */

export function FloatingContact() {
  const { t } = useSite();
  return (
    <div className="fab-stack">
      <a className="fab fab--call" href={telHref()} aria-label={t.common.callAria}>
        <Icon name="Phone" size={22} />
      </a>
      <a className="fab fab--wa" href={whatsappHref(t.common.whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label={t.common.whatsappAria}>
        <WhatsAppGlyph size={24} />
      </a>
    </div>
  );
}

/* ---------- Back to top (homepage only) ---------- */

export function BackToTop() {
  const { t } = useSite();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toTop = () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className={`back-to-top${show ? ' is-visible' : ''}`} onClick={toTop} aria-label={t.common.backToTop} tabIndex={show ? 0 : -1}>
      <Icon name="ArrowUp" size={20} />
    </button>
  );
}

/* ---------- Scroll progress ---------- */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/* ---------- Page shell ---------- */

export function Layout({ children }: { children: ReactNode }) {
  const { t, route } = useSite();
  return (
    <>
      <a href="#main" className="skip-link">
        {t.common.skipToContent}
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      {route !== 'contact' && <FloatingContact />}
      {route === 'home' && <BackToTop />}
    </>
  );
}
