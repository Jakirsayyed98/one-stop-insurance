import { business, isPlaceholder } from '../config/site';

/** tel: link — uses the configured number (or the documented placeholder format). */
export function telHref(): string {
  return `tel:${business.phone.replace(/[^+\dX]/g, '')}`;
}

/** WhatsApp click-to-chat link with an encoded, pre-filled message. */
export function whatsappHref(message: string): string {
  const number = business.whatsapp.replace(/[^\dX]/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function mailHref(): string {
  return `mailto:${business.email}`;
}

/** Human-friendly phone display, e.g. +91 98765 43210 */
export function displayPhone(raw: string): string {
  const d = raw.replace(/[^\d+X]/g, '');
  const m = d.match(/^\+?91([\dX]{5})([\dX]{5})$/);
  return m ? `+91 ${m[1]} ${m[2]}` : raw;
}

export const contactReady = {
  phone: () => !isPlaceholder(business.phone),
  whatsapp: () => !isPlaceholder(business.whatsapp),
  email: () => !isPlaceholder(business.email),
  address: () => business.addressLines.filter(Boolean).length > 0,
  map: () => !isPlaceholder(business.mapEmbedUrl),
  directions: () => !isPlaceholder(business.directionsUrl),
};
