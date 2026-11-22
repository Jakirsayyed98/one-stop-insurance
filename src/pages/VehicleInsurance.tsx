import { useSite } from '../lib/context';
import { Icon, type IconName } from '../components/Icon';
import { CheckList, ContactButtons, CtaBand, Notice, PageHero, Section } from '../components/ui';
import { CategoryArt } from './Home';

const SEG_ICONS: IconName[] = ['Truck', 'Bus', 'CarFront', 'ClipboardList'];
const SECTION_ICONS: Record<string, IconName> = { 'two-wheeler': 'Bike', 'private-car': 'Car', commercial: 'Truck' };

export function VehicleInsurance() {
  const { t } = useSite();
  const v = t.vehicle;
  return (
    <>
      <PageHero {...v.hero} current={t.common.nav.vehicle} />

      <nav className="jump-nav" aria-label={v.jump}>
        <div className="container">
          <span className="jump-nav__label">{v.jump}:</span>
          <ul>
            {v.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <Icon name={SECTION_ICONS[s.id]} size={18} />
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {v.sections.map((s, idx) => (
        <Section key={s.id} id={s.id} tone={idx % 2 ? 'grey' : 'white'} labelledBy={`${s.id}-title`} className="vehicle-section">
          <div className="vehicle-intro">
            <div data-reveal>
              <p className="eyebrow">
                <Icon name={SECTION_ICONS[s.id]} size={16} /> {s.lead}
              </p>
              <h2 id={`${s.id}-title`} className="section-title">{s.title}</h2>
              <h3 className="sub-title">{v.labels.what}</h3>
              <p className="section-text">{s.what}</p>
            </div>
            <div className="vehicle-intro__media" data-reveal>
              <CategoryArt id={s.id} alt={t.home.categories.items[idx].imageAlt} />
            </div>
          </div>

          <div className="grid grid--2 mt-xl">
            <div className="panel" data-reveal>
              <h3 className="panel__title">
                <Icon name="Users" size={20} /> {v.labels.who}
              </h3>
              <CheckList items={s.who} tone="navy" />
            </div>
            <div className="panel" data-reveal>
              <h3 className="panel__title">
                <Icon name="BadgeCheck" size={20} /> {v.labels.benefits}
              </h3>
              <CheckList items={s.benefits} />
            </div>
          </div>

          <h3 className="sub-title mt-xl" data-reveal>{v.labels.coverage}</h3>
          <div className={`grid ${s.coverage.length > 3 ? 'grid--4' : 'grid--3'}`}>
            {s.coverage.map((c) => (
              <div key={c.title} className="mini-card" data-reveal>
                <h4 className="mini-card__title">{c.title}</h4>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          {s.id === 'commercial' && (
            <>
              <h3 className="sub-title mt-xl" data-reveal>{v.commercialSegments.title}</h3>
              <div className="grid grid--4">
                {v.commercialSegments.items.map((c, i) => (
                  <div key={c.title} className="mini-card mini-card--icon" data-reveal>
                    <Icon name={SEG_ICONS[i]} size={24} />
                    <h4 className="mini-card__title">{c.title}</h4>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-lg" data-reveal>
                <Notice icon="TriangleAlert">
                  <strong>{v.commercialImportance.title}. </strong>
                  {v.commercialImportance.text}
                </Notice>
              </div>
            </>
          )}

          <div className="inline-cta" data-reveal>
            <p className="inline-cta__text">{v.labels.cta}</p>
            <ContactButtons />
          </div>
        </Section>
      ))}

      <div className="container mt-lg mb-lg">
        <Notice>{t.common.policyNote}</Notice>
      </div>
      <CtaBand />
    </>
  );
}
