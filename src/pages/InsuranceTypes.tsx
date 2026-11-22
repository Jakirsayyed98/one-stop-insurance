import { useSite } from '../lib/context';
import { Icon, type IconName } from '../components/Icon';
import { CheckList, CtaBand, Notice, PageHero, Section } from '../components/ui';

const TYPE_ICONS: Record<string, IconName> = { 'third-party': 'Scale', comprehensive: 'ShieldCheck', 'own-damage': 'CarFront' };

export function InsuranceTypes() {
  const { t } = useSite();
  const ty = t.types;
  return (
    <>
      <PageHero {...ty.hero} current={t.common.nav.types} />

      <nav className="jump-nav" aria-label={t.vehicle.jump}>
        <div className="container">
          <ul className="jump-nav__chips">
            {ty.items.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>{i.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {ty.items.map((item, idx) => (
        <Section key={item.id} id={item.id} tone={idx % 2 ? 'grey' : 'white'} labelledBy={`${item.id}-title`}>
          <div className="type-head" data-reveal>
            <span className="type-head__icon"><Icon name={TYPE_ICONS[item.id]} size={30} /></span>
            <div>
              <span className="pill">{item.tag}</span>
              <h2 id={`${item.id}-title`} className="section-title">{item.title}</h2>
            </div>
          </div>
          <p className="lead-text" data-reveal>{item.summary}</p>

          <div className="grid grid--3 mt-lg">
            <div className="panel" data-reveal>
              <h3 className="panel__title"><Icon name="ShieldCheck" size={20} /> {ty.labels.covers}</h3>
              <CheckList items={item.covers} tone="navy" />
            </div>
            <div className="panel" data-reveal>
              <h3 className="panel__title"><Icon name="BadgeCheck" size={20} /> {ty.labels.benefits}</h3>
              <CheckList items={item.benefits} />
            </div>
            <div className="panel panel--muted" data-reveal>
              <h3 className="panel__title"><Icon name="TriangleAlert" size={20} /> {ty.labels.limitations}</h3>
              <CheckList items={item.limitations} tone="muted" />
            </div>
          </div>

          <div className="example" data-reveal>
            <span className="example__label"><Icon name="Lightbulb" size={18} /> {ty.labels.example}</span>
            <p>{item.example}</p>
          </div>
        </Section>
      ))}

      <div className="container mt-lg mb-lg">
        <Notice icon="ShieldAlert">
          <strong>{ty.note.title}. </strong>
          {ty.note.text}
        </Notice>
      </div>
      <CtaBand />
    </>
  );
}
