import { useSite } from '../lib/context';
import { Icon } from '../components/Icon';
import { Accordion, ContactButtons, PageHero, Section } from '../components/ui';

export function Faqs() {
  const { t } = useSite();
  const f = t.faqs;
  return (
    <>
      <PageHero {...f.hero} current={t.common.nav.faqs} />
      <Section labelledBy="faq-cats">
        <h2 id="faq-cats" className="sr-only">{f.categoriesLabel}</h2>
        <div className="faq-layout">
          <nav className="faq-nav" aria-label={f.categoriesLabel}>
            <ul>
              {f.categories.map((c) => (
                <li key={c.id}>
                  <a href={`#faq-${c.id}`}>
                    <span>{c.title}</span>
                    <span className="faq-nav__count">{c.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="faq-groups">
            {f.categories.map((c) => (
              <section key={c.id} id={`faq-${c.id}`} className="faq-group" aria-labelledby={`faq-${c.id}-title`}>
                <h2 id={`faq-${c.id}-title`} className="faq-group__title">
                  <Icon name="CircleHelp" size={22} /> {c.title}
                </h2>
                <Accordion items={c.items} idPrefix={`faq-${c.id}`} />
              </section>
            ))}
            <div className="contact-card contact-card--compact">
              <div className="contact-card__copy">
                <h2 className="section-title section-title--sm">{f.still.title}</h2>
                <p className="section-text">{f.still.text}</p>
              </div>
              <ContactButtons />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
