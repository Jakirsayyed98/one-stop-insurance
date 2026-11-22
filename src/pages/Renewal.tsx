import { useSite } from '../lib/context';
import { Icon, type IconName } from '../components/Icon';
import { CallButton, CheckList, IconBadge, Notice, PageHero, Section, WhatsAppButton } from '../components/ui';

const WHY_ICONS: IconName[] = ['Gavel', 'ShieldCheck', 'BadgeIndianRupee', 'CalendarClock'];

function RenewalCta() {
  const { t } = useSite();
  const r = t.renewal;
  return (
    <div className="renewal-cta" data-reveal>
      <div>
        <h2 className="renewal-cta__title">{r.help.title}</h2>
        <p>{r.help.text}</p>
      </div>
      <div className="btn-row">
        <WhatsAppButton className="btn--lg" />
        <CallButton variant="light" className="btn--lg" />
      </div>
    </div>
  );
}

export function Renewal() {
  const { t } = useSite();
  const r = t.renewal;
  return (
    <>
      <PageHero {...r.hero} current={t.common.nav.renewal} />

      <div className="container renewal-top">
        <RenewalCta />
      </div>

      <Section labelledBy="ren-what">
        <div className="prose-split">
          <h2 id="ren-what" className="section-title" data-reveal>{r.what.title}</h2>
          <p className="lead-text" data-reveal>{r.what.text}</p>
        </div>
      </Section>

      <Section tone="grey" labelledBy="ren-why">
        <h2 id="ren-why" className="section-title center" data-reveal>{r.why.title}</h2>
        <div className="grid grid--4 mt-lg">
          {r.why.items.map((w, i) => (
            <article key={w.title} className="card card--value" data-reveal>
              <IconBadge name={WHY_ICONS[i]} tone={i % 2 ? 'navy' : 'orange'} />
              <h3 className="card__title">{w.title}</h3>
              <p className="card__text">{w.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="ren-exp">
        <div className="grid grid--2 grid--top">
          <div className="panel panel--warn" data-reveal>
            <h2 id="ren-exp" className="panel__title panel__title--lg"><Icon name="TriangleAlert" size={22} /> {r.expired.title}</h2>
            <p>{r.expired.text}</p>
            <CheckList items={r.expired.items} tone="muted" />
          </div>
          <div className="panel" data-reveal>
            <h2 className="panel__title panel__title--lg"><Icon name="CircleCheck" size={22} /> {r.benefits.title}</h2>
            <CheckList items={r.benefits.items} />
          </div>
        </div>
      </Section>

      <Section tone="grey" labelledBy="ren-proc">
        <h2 id="ren-proc" className="section-title center" data-reveal>{r.process.title}</h2>
        <ol className="timeline mt-lg">
          {r.process.steps.map((s, i) => (
            <li key={s.title} className="timeline__item" data-reveal>
              <span className="timeline__num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="timeline__title">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="panel mt-xl" data-reveal>
          <h3 className="panel__title"><Icon name="ClipboardList" size={20} /> {r.documents.title}</h3>
          <CheckList items={r.documents.items} tone="navy" />
        </div>
      </Section>

      <div className="container mb-xl">
        <Notice>{t.common.policyNote}</Notice>
        <div className="mt-lg"><RenewalCta /></div>
      </div>
    </>
  );
}
