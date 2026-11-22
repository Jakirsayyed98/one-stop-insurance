import { useSite } from '../lib/context';
import { Icon, type IconName } from '../components/Icon';
import { CtaBand, IconBadge, PageHero, Section, SectionHeader } from '../components/ui';

const VALUE_ICONS: IconName[] = ['Eye', 'HeartHandshake', 'Lightbulb', 'Clock', 'ShieldCheck'];

export function About() {
  const { t } = useSite();
  const a = t.about;
  return (
    <>
      <PageHero {...a.hero} current={t.common.nav.about} />

      <Section labelledBy="about-intro">
        <div className="prose-split">
          <div data-reveal>
            <h2 id="about-intro" className="section-title">{a.intro.title}</h2>
          </div>
          <div className="prose" data-reveal>
            {a.intro.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </Section>

      <Section tone="grey" labelledBy="mv-title">
        <h2 id="mv-title" className="sr-only">{a.mission.title} / {a.vision.title}</h2>
        <div className="grid grid--2">
          <article className="card card--feature card--accent" data-reveal>
            <IconBadge name="Target" />
            <h3 className="card__title">{a.mission.title}</h3>
            <p className="card__text">{a.mission.text}</p>
          </article>
          <article className="card card--feature card--accent-navy" data-reveal>
            <IconBadge name="Compass" tone="navy" />
            <h3 className="card__title">{a.vision.title}</h3>
            <p className="card__text">{a.vision.text}</p>
          </article>
        </div>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeader id="values-title" title={a.values.title} />
        <div className="grid grid--3 grid--values">
          {a.values.items.map((v, i) => (
            <article key={v.title} className="card card--value" data-reveal>
              <IconBadge name={VALUE_ICONS[i]} tone={i % 2 ? 'navy' : 'orange'} />
              <h3 className="card__title">{v.title}</h3>
              <p className="card__text">{v.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="grey" labelledBy="approach-title">
        <div className="split split--center">
          <div data-reveal>
            <h2 id="approach-title" className="section-title">{a.approach.title}</h2>
            <p className="section-text">{a.approach.text}</p>
          </div>
          <ol className="numbered" data-reveal>
            {a.approach.points.map((p, i) => (
              <li key={p}>
                <span className="numbered__n" aria-hidden="true">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="commit-title">
        <div className="highlight" data-reveal>
          <span className="highlight__icon"><Icon name="MapPin" size={28} /></span>
          <div>
            <h2 id="commit-title" className="highlight__title">{a.commitment.title}</h2>
            <p>{a.commitment.text}</p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
