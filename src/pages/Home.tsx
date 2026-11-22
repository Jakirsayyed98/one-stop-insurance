import { useSite } from '../lib/context';
import { cities, partners, stats } from '../config/site';
import { Icon, type IconName } from '../components/Icon';
import { CarArt, HeroArt, ScooterArt, TruckArt } from '../components/Illustrations';
import { CallButton, ContactButtons, IconBadge, Photo, Section, SectionHeader, TextLink, WhatsAppButton } from '../components/ui';
import type { PhotoName } from '../config/photos';

const SERVICE_ICONS: Record<string, IconName> = {
  'new-vehicle': 'Sparkles',
  renewal: 'RefreshCw',
  comprehensive: 'ShieldCheck',
  'third-party': 'Scale',
  'own-damage': 'CarFront',
  commercial: 'Truck',
};
const WHY_ICONS: IconName[] = ['Layers', 'Headset', 'Map', 'RefreshCw', 'MessagesSquare'];
const BENEFIT_ICONS: IconName[] = ['Wallet', 'Gavel', 'Siren', 'ShieldCheck', 'Smile'];
const STEP_ICONS: IconName[] = ['CarFront', 'Phone', 'Search', 'BadgeCheck'];

export function CategoryArt({ id, alt }: { id: string; alt: string }) {
  const fallback = id === 'two-wheeler' ? <ScooterArt title={alt} /> : id === 'private-car' ? <CarArt title={alt} /> : <TruckArt title={alt} />;
  return <Photo name={id as PhotoName} alt={alt} sizes="(min-width: 900px) 33vw, 100vw" fallback={fallback} />;
}

export function Home() {
  const { t, link, asset } = useSite();
  const h = t.home;

  return (
    <>
      {/* B. HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">{h.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              {h.hero.title}
            </h1>
            <p className="hero__text">{h.hero.text}</p>
            <div className="btn-row">
              <a className="btn btn--primary btn--lg" href={link('services')}>
                <span>{h.hero.primary}</span>
                <Icon name="ArrowRight" size={18} />
              </a>
              <a className="btn btn--light-outline btn--lg" href={link('contact')}>
                <span>{h.hero.secondary}</span>
              </a>
            </div>
            <ul className="hero__badges">
              {h.hero.badges.map((b) => (
                <li key={b}>
                  <Icon name="CircleCheck" size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__media">
            <Photo name="hero" alt={h.hero.imageAlt} eager sizes="(min-width: 1024px) 560px, 100vw" className="hero__photo" fallback={<HeroArt label={h.hero.imageAlt} />} />
          </div>
        </div>
      </section>

      {/* C. VEHICLE CATEGORIES */}
      <Section labelledBy="cat-title">
        <SectionHeader id="cat-title" eyebrow={h.categories.eyebrow} title={h.categories.title} text={h.categories.text} />
        <div className="grid grid--3">
          {h.categories.items.map((c) => (
            <a key={c.id} href={link('vehicle', c.id)} className="card card--category" data-reveal>
              <div className="card__media">
                <CategoryArt id={c.id} alt={c.imageAlt} />
              </div>
              <div className="card__body">
                <h3 className="card__title">{c.title}</h3>
                <p className="card__text">{c.text}</p>
                <ul className="tag-list">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <span className="text-link">
                  <span>{t.common.exploreMore}</span>
                  <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* D. SERVICES PREVIEW */}
      <Section tone="grey" labelledBy="svc-title">
        <SectionHeader id="svc-title" eyebrow={h.servicesPreview.eyebrow} title={h.servicesPreview.title} text={h.servicesPreview.text} />
        <div className="grid grid--3">
          {t.services.items.map((s) => (
            <a key={s.id} href={link('services', s.id)} className="card card--service" data-reveal>
              <IconBadge name={SERVICE_ICONS[s.id] ?? 'Shield'} />
              <h3 className="card__title">{s.title}</h3>
              <p className="card__text">{s.short}</p>
              <span className="text-link">
                <span>{t.common.learnMore}</span>
                <Icon name="ArrowRight" size={16} />
              </span>
            </a>
          ))}
        </div>
        <div className="center mt-xl" data-reveal>
          <a className="btn btn--navy" href={link('services')}>
            <span>{h.servicesPreview.viewAll}</span>
            <Icon name="ArrowRight" size={18} />
          </a>
        </div>
      </Section>

      {/* E. WHY CHOOSE */}
      <Section labelledBy="why-title" className="why">
        <div className="split">
          <div className="split__lead">
            <SectionHeader id="why-title" eyebrow={h.why.eyebrow} title={h.why.title} text={h.why.text} align="left" />
            <div data-reveal>
              <ContactButtons />
            </div>
          </div>
          <ul className="feature-list">
            {h.why.items.map((w, i) => (
              <li key={w.title} className="feature" data-reveal>
                <IconBadge name={WHY_ICONS[i]} tone="navy" />
                <div>
                  <h3 className="feature__title">{w.title}</h3>
                  <p className="feature__text">{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* F. BENEFITS */}
      <Section tone="navy" labelledBy="ben-title" className="benefits">
        <header className="section-head section-head--center" data-reveal>
          <p className="eyebrow eyebrow--light">{h.benefits.eyebrow}</p>
          <h2 id="ben-title" className="section-title">
            {h.benefits.title}
          </h2>
          <p className="section-text">{h.benefits.text}</p>
        </header>
        <div className="grid grid--5">
          {h.benefits.items.map((b, i) => (
            <div key={b.title} className="benefit" data-reveal>
              <span className="benefit__icon">
                <Icon name={BENEFIT_ICONS[i]} size={24} />
              </span>
              <h3 className="benefit__title">{b.title}</h3>
              <p className="benefit__text">{b.text}</p>
            </div>
          ))}
        </div>
        <p className="fine-print fine-print--light center">{h.benefits.note}</p>
      </Section>

      {/* G. INSURANCE PARTNERS (names / logos only) */}
      <Section labelledBy="partners-title" className="partners">
        <SectionHeader id="partners-title" eyebrow={h.partners.eyebrow} title={h.partners.title} />
        <ul className="logo-grid" data-reveal>
          {partners.map((p) => (
            <li key={p.id} className="logo-card">
              {p.logo ? (
                <img src={asset(p.logo)} alt={p.name} width={160} height={64} loading="lazy" decoding="async" />
              ) : (
                <span className="logo-card__name">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
        <p className="fine-print center">{h.partners.note}</p>
      </Section>

      {/* H. HOW IT WORKS */}
      <Section tone="grey" labelledBy="how-title">
        <SectionHeader id="how-title" eyebrow={h.how.eyebrow} title={h.how.title} text={h.how.text} />
        <ol className="steps">
          {h.how.steps.map((s, i) => (
            <li key={s.title} className="step" data-reveal>
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="step__icon">
                <Icon name={STEP_ICONS[i]} size={22} />
              </span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* I. MAHARASHTRA COVERAGE */}
      <Section labelledBy="cov-title" className="coverage">
        <div className="split split--center">
          <div>
            <SectionHeader id="cov-title" eyebrow={h.coverage.eyebrow} title={h.coverage.title} text={h.coverage.text} align="left" />
            <ul className="city-list" data-reveal>
              {cities.map((c) => (
                <li key={c}>
                  <Icon name="MapPin" size={16} />
                  <span>{h.coverage.cities[c]}</span>
                </li>
              ))}
              <li className="city-list__more">
                <Icon name="Navigation" size={16} />
                <span>{h.coverage.more}</span>
              </li>
            </ul>
            <p className="fine-print">{h.coverage.note}</p>
          </div>
          <div className="coverage__visual" data-reveal aria-hidden="true">
            <div className="coverage__ring coverage__ring--1" />
            <div className="coverage__ring coverage__ring--2" />
            <div className="coverage__ring coverage__ring--3" />
            <div className="coverage__center">
              <Icon name="Map" size={40} />
              <span>{h.stats.items.coverage.value}</span>
            </div>
            {cities.map((c, i) => (
              <span key={c} className={`coverage__pin coverage__pin--${i + 1}`}>
                {h.coverage.cities[c]}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* J. STATISTICS */}
      <section className="stats" aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title" className="sr-only">
            {h.stats.title}
          </h2>
          <ul className="stats__grid">
            {stats
              .filter((s) => s.enabled)
              .map((s) => {
                const label = h.stats.items[s.id as keyof typeof h.stats.items];
                if (!label) return null;
                const num = s.value === 'partners' ? partners.length : s.value;
                const textValue = 'value' in label ? (label as { value: string }).value : null;
                return (
                  <li key={s.id} className="stat" data-reveal>
                    {textValue ? (
                      <span className="stat__value stat__value--text">{textValue}</span>
                    ) : (
                      <span className="stat__value" data-count={num} data-suffix={s.suffix ?? ''}>
                        {num}
                        {s.suffix ?? ''}
                      </span>
                    )}
                    <span className="stat__label">{label.label}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      {/* K. GET IN TOUCH */}
      <Section labelledBy="git-title" className="get-in-touch">
        <div className="contact-card" data-reveal>
          <div className="contact-card__copy">
            <p className="eyebrow">{h.contact.eyebrow}</p>
            <h2 id="git-title" className="section-title">
              {h.contact.title}
            </h2>
            <p className="section-text">{h.contact.text}</p>
          </div>
          <div className="contact-card__actions">
            <CallButton className="btn--lg" />
            <WhatsAppButton className="btn--lg" />
            <TextLink to="contact">{t.common.nav.contact}</TextLink>
          </div>
        </div>
      </Section>
    </>
  );
}
