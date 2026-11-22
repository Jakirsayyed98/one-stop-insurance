import { useSite } from '../lib/context';
import { Icon, type IconName } from '../components/Icon';
import { CallButton, CheckList, CtaBand, IconBadge, Notice, PageHero, Section, WhatsAppButton } from '../components/ui';

export const SERVICE_ICONS: Record<string, IconName> = {
  'new-vehicle': 'Sparkles',
  renewal: 'RefreshCw',
  comprehensive: 'ShieldCheck',
  'third-party': 'Scale',
  'own-damage': 'CarFront',
  commercial: 'Truck',
};

export function Services() {
  const { t } = useSite();
  const s = t.services;
  return (
    <>
      <PageHero {...s.hero} current={t.common.nav.services} />

      <nav className="jump-nav" aria-label={t.vehicle.jump}>
        <div className="container">
          <ul className="jump-nav__chips">
            {s.items.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>{i.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Section labelledBy="services-list-title">
        <h2 id="services-list-title" className="sr-only">{t.common.nav.services}</h2>
        <div className="service-list">
          {s.items.map((item, idx) => (
            <article key={item.id} id={item.id} className="service" data-reveal aria-labelledby={`${item.id}-h`}>
              <div className="service__head">
                <IconBadge name={SERVICE_ICONS[item.id]} tone={idx % 2 ? 'navy' : 'orange'} />
                <div>
                  <h3 id={`${item.id}-h`} className="service__title">{item.title}</h3>
                  <p className="service__short">{item.short}</p>
                </div>
              </div>
              <p className="service__desc">{item.description}</p>
              <div className="service__cols">
                <div>
                  <h4 className="service__label">{s.labels.benefits}</h4>
                  <CheckList items={item.benefits} />
                </div>
                <div>
                  <h4 className="service__label">{s.labels.suitable}</h4>
                  <ul className="tag-list tag-list--lg">
                    {item.suitable.map((v) => (
                      <li key={v}>
                        <Icon name="Check" size={14} />
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="service__cta">
                <span className="service__cta-label">{s.labels.cta}</span>
                <div className="btn-row">
                  <CallButton variant="outline" className="btn--sm" />
                  <WhatsAppButton className="btn--sm" />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-xl">
          <Notice>{t.common.policyNote}</Notice>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
