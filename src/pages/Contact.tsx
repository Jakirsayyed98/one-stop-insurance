import { useSite } from '../lib/context';
import { business } from '../config/site';
import { contactReady, displayPhone, mailHref, telHref, whatsappHref } from '../lib/contact';
import { Icon, type IconName } from '../components/Icon';
import { CallButton, Notice, PageHero, Section, WhatsAppButton, WhatsAppGlyph } from '../components/ui';
import type { ReactNode } from 'react';

function InfoRow({ icon, label, children }: { icon: IconName | 'wa'; label: string; children: ReactNode }) {
  return (
    <li className="info-row">
      <span className="info-row__icon">{icon === 'wa' ? <WhatsAppGlyph size={20} /> : <Icon name={icon} size={20} />}</span>
      <div>
        <span className="info-row__label">{label}</span>
        <div className="info-row__value">{children}</div>
      </div>
    </li>
  );
}

export function Contact() {
  const { t, lang } = useSite();
  const c = t.contact;
  const L = c.labels;
  const pending = <span className="pending">{L.pending}</span>;
  return (
    <>
      <PageHero {...c.hero} current={t.common.nav.contact} />
      <Section labelledBy="contact-channels">
        <div className="contact-grid">
          <div className="contact-panel" data-reveal>
            <h2 id="contact-channels" className="section-title section-title--sm">{c.channels.title}</h2>
            <p className="section-text">{c.channels.text}</p>
            <div className="contact-big">
              <CallButton className="btn--lg btn--block" />
              <WhatsAppButton className="btn--lg btn--block" />
            </div>
            <ul className="info-list">
              <InfoRow icon="Phone" label={L.phone}>
                {contactReady.phone() ? <a href={telHref()}>{displayPhone(business.phone)}</a> : pending}
              </InfoRow>
              <InfoRow icon="wa" label={L.whatsapp}>
                {contactReady.whatsapp() ? (
                  <a href={whatsappHref(t.common.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                    {displayPhone('+' + business.whatsapp)}
                  </a>
                ) : (
                  pending
                )}
              </InfoRow>
              <InfoRow icon="Mail" label={L.email}>
                {contactReady.email() ? <a href={mailHref()}>{business.email}</a> : pending}
              </InfoRow>
              <InfoRow icon="MapPin" label={L.address}>
                {contactReady.address() ? (
                  <address>
                    {business.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                ) : (
                  pending
                )}
              </InfoRow>
              <InfoRow icon="Clock" label={L.hours}>
                {business.hours[lang] ? business.hours[lang] : pending}
              </InfoRow>
            </ul>
          </div>

          <div className="map-panel" data-reveal>
            <h2 className="sr-only">{L.map}</h2>
            {contactReady.map() ? (
              <iframe
                className="map-frame"
                src={business.mapEmbedUrl}
                title={L.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-placeholder">
                <Icon name="Map" size={44} />
                <p>{L.mapPending}</p>
              </div>
            )}
            <div className="map-panel__footer">
              <div>
                <strong>{c.serviceArea.title}</strong>
                <p>{c.serviceArea.text}</p>
              </div>
              {contactReady.directions() ? (
                <a className="btn btn--navy" href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="Navigation" size={18} />
                  <span>{L.directions}</span>
                </a>
              ) : (
                <span className="btn btn--disabled" aria-disabled="true" title={L.pending}>
                  <Icon name="Navigation" size={18} />
                  <span>{L.directions}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-xl">
          <Notice icon="ShieldAlert">{c.note}</Notice>
        </div>
      </Section>
    </>
  );
}
