import { useSite } from '../lib/context';
import { Notice, PageHero, Section } from '../components/ui';

export function Legal({ kind }: { kind: 'terms' | 'disclaimer' }) {
  const { t } = useSite();
  const doc = t[kind];
  return (
    <>
      <PageHero {...doc.hero} current={t.common.nav[kind]} />
      <Section labelledBy="legal-body">
        <div className="legal">
          <Notice icon="TriangleAlert">{t.common.draftNotice}</Notice>
          <h2 id="legal-body" className="sr-only">{doc.hero.title}</h2>
          {doc.sections.map((s) => (
            <section key={s.title} className="legal__section">
              <h3>{s.title}</h3>
              {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
