import { useState, type ReactNode } from 'react';
import { useSite } from '../lib/context';
import { telHref, whatsappHref } from '../lib/contact';
import { Icon, type IconName } from './Icon';
import { photos, type PhotoName } from '../config/photos';
import type { RouteId } from '../routes';

/* ---------- Layout primitives ---------- */

export function Section({
  id,
  tone = 'white',
  children,
  className = '',
  labelledBy,
}: {
  id?: string;
  tone?: 'white' | 'grey' | 'navy';
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} className={`section section--${tone} ${className}`} aria-labelledby={labelledBy}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  text,
  align = 'center',
  as: Tag = 'h2',
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="section-title">
        {title}
      </Tag>
      {text && <p className="section-text">{text}</p>}
    </header>
  );
}

/** Inner-page hero with breadcrumb. */
export function PageHero({ eyebrow, title, text, current }: { eyebrow: string; title: string; text: string; current: string }) {
  const { t, link } = useSite();
  return (
    <section className="page-hero">
      <div className="page-hero__pattern" aria-hidden="true" />
      <div className="container page-hero__inner">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li>
              <a href={link('home')}>{t.common.breadcrumbHome}</a>
            </li>
            <li aria-current="page">{current}</li>
          </ol>
        </nav>
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__text">{text}</p>
      </div>
    </section>
  );
}

/* ---------- Contact actions ---------- */

export function CallButton({ variant = 'primary', label, className = '' }: { variant?: 'primary' | 'outline' | 'light' | 'ghost'; label?: string; className?: string }) {
  const { t } = useSite();
  return (
    <a className={`btn btn--${variant} ${className}`} href={telHref()} aria-label={t.common.callAria}>
      <Icon name="Phone" size={18} />
      <span>{label ?? t.common.callNow}</span>
    </a>
  );
}

export function WhatsAppButton({ variant = 'whatsapp', label, className = '' }: { variant?: 'whatsapp' | 'outline' | 'light'; label?: string; className?: string }) {
  const { t } = useSite();
  return (
    <a
      className={`btn btn--${variant} ${className}`}
      href={whatsappHref(t.common.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappAria}
    >
      <WhatsAppGlyph />
      <span>{label ?? t.common.chatOnWhatsApp}</span>
    </a>
  );
}

export function ContactButtons({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <div className={`btn-row ${className}`}>
      <CallButton variant={light ? 'light' : 'primary'} />
      <WhatsAppButton />
    </div>
  );
}

/** WhatsApp mark (simple speech-bubble glyph drawn for this site; not the trademarked logo). */
export function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return <Icon name="MessageCircle" size={size} />;
}

/** Full-width call-to-action band used at the end of inner pages. */
export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { t } = useSite();
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner" data-reveal>
        <div>
          <h2 id="cta-band-title" className="cta-band__title">
            {title ?? t.common.ctaBand.title}
          </h2>
          <p className="cta-band__text">{text ?? t.common.ctaBand.text}</p>
        </div>
        <ContactButtons light />
      </div>
    </section>
  );
}

/* ---------- Content helpers ---------- */

export function CheckList({ items, tone = 'orange' }: { items: string[]; tone?: 'orange' | 'navy' | 'muted' }) {
  return (
    <ul className={`check-list check-list--${tone}`}>
      {items.map((item) => (
        <li key={item}>
          <Icon name={tone === 'muted' ? 'CircleX' : 'CircleCheck'} size={18} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconBadge({ name, tone = 'orange' }: { name: IconName; tone?: 'orange' | 'navy' }) {
  return (
    <span className={`icon-badge icon-badge--${tone}`}>
      <Icon name={name} size={22} />
    </span>
  );
}

export function TextLink({ to, hash, children }: { to: RouteId; hash?: string; children: ReactNode }) {
  const { link } = useSite();
  return (
    <a className="text-link" href={link(to, hash)}>
      <span>{children}</span>
      <Icon name="ArrowRight" size={16} />
    </a>
  );
}

export function Notice({ children, icon = 'Info' }: { children: ReactNode; icon?: IconName }) {
  return (
    <div className="notice" role="note">
      <Icon name={icon} size={20} />
      <p>{children}</p>
    </div>
  );
}

/* ---------- Accordion (FAQ) ---------- */

export function Accordion({ items, idPrefix }: { items: { q: string; a: string }[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${idPrefix}-q${i}`;
        const panelId = `${idPrefix}-a${i}`;
        return (
          <div className={`accordion__item${isOpen ? ' is-open' : ''}`} key={btnId}>
            <h3 className="accordion__heading">
              <button
                id={btnId}
                type="button"
                className="accordion__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <Icon name="ChevronDown" size={20} className="accordion__chev" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Responsive photo (AVIF/WebP/JPEG) with illustration fallback ---------- */

export function Photo({
  name,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager = false,
  className = '',
  fallback,
}: {
  name: PhotoName;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
  fallback: ReactNode;
}) {
  const { asset } = useSite();
  const p = photos[name];
  if (!p) return <>{fallback}</>;
  const set = (ext: string) => p.widths.map((w) => `${asset(`images/photos/${name}-${w}.${ext}`)} ${w}w`).join(', ');
  const largest = p.widths[p.widths.length - 1];
  return (
    <picture className={`photo ${className}`}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={asset(`images/photos/${name}-${largest}.jpg`)}
        srcSet={set('jpg')}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
      />
    </picture>
  );
}
