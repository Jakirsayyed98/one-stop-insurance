/**
 * ============================================================
 *  ONE STOP INSURANCE — BUSINESS CONFIGURATION
 * ============================================================
 *  This is the ONLY file you need to edit to add your real
 *  business details. Every value written as a placeholder
 *  (containing "X" digits, "example", or left empty) is
 *  detected automatically: the website shows a neutral
 *  "details coming soon" message instead of fake data, and
 *  `npm run build` prints a list of what is still missing.
 *
 *  See PLACEHOLDERS.md for a step-by-step checklist.
 * ============================================================
 */

export const business = {
  name: 'One Stop Insurance',
  shortName: 'OSI',

  /** PLACEHOLDER — main business phone in international format, e.g. "+919876543210" */
  phone: '+918828564497',

  /** PLACEHOLDER — WhatsApp number in international format WITHOUT "+" or spaces, e.g. "919876543210" */
  whatsapp: '918828564497',

  /** PLACEHOLDER — business email, e.g. "info@yourdomain.com" */
  email: 'onestopinsurance03@gmail.com',

  /**
   * PLACEHOLDER — office address. Leave lines empty until confirmed.
   * Example shape (do NOT use as real data): ['Office No. ...', 'Street ...', 'City, Maharashtra 4XXXXX']
   */
  addressLines: ['Near MS Bakery, Tagore Nagar Group No. 4', 'Vikhroli East', 'Mumbai-400083, Maharashtra, India'] as string[],

  /**
   * PLACEHOLDER — operating hours per language. Leave empty until confirmed.
   * Example: { en: 'Mon–Sat, 10:00 AM – 7:00 PM', hi: 'सोम–शनि, सुबह 10:00 – शाम 7:00', mr: 'सोम–शनि, सकाळी 10:00 – सायं. 7:00' }
   */
  hours: { en: '', hi: '', mr: '' },

  /**
   * PLACEHOLDER — Google Maps embed URL for your office.
   * In Google Maps: Share → Embed a map → copy only the `src="..."` value.
   */
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d235.60492283316003!2d72.92941064637093!3d19.121757065356782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDA3JzE4LjkiTiA3MsKwNTUnNDYuNCJF!5e0!3m2!1sen!2sin!4v1795330380000!5m2!1sen!2sin',

  /** PLACEHOLDER — Google Maps "directions" link, e.g. https://www.google.com/maps/dir/?api=1&destination=... */
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=19.121757065356782,72.92941064637093',

  /**
   * Regulatory details (e.g. IRDAI registration of the intermediary you work with).
   * Leave EMPTY unless the details are independently confirmed. Never invent numbers.
   */
  regulatoryNote: { en: '', hi: '', mr: '' },
};

/**
 * Insurance companies shown on the homepage (names + logos only).
 * Listing a name does not imply a formal partnership — the site shows a disclaimer.
 *
 * To show a real logo: obtain permission / use the insurer's official media kit,
 * save the file as /public/partners/<id>.svg (or .png/.webp), and set `logo` below.
 * Without a logo, a clean name card is displayed.
 * To remove an insurer, delete its line. To add one, copy a line.
 */
export const partners: { id: string; name: string; logo?: string }[] = [
  { id: 'icici-lombard', name: 'ICICI Lombard' },
  { id: 'hdfc-ergo', name: 'HDFC ERGO' },
  { id: 'bajaj-general', name: 'Bajaj General' },
  { id: 'tata-aig', name: 'Tata AIG' },
  { id: 'sbi-general', name: 'SBI General' },
  { id: 'reliance-general', name: 'Reliance General' },
  { id: 'universal-insurance', name: 'Universal Insurance' },
  { id: 'kiwi-insurance', name: 'Kiwi Insurance' },
];

/** Cities highlighted in the "Serving Across Maharashtra" section. */
export const cities = ['mumbai', 'pune', 'thane', 'nashik', 'nagpur', 'sambhajinagar', 'kolhapur'] as const;

/**
 * Homepage statistics. Only verifiable facts are enabled by default.
 * `value: 'partners'` is calculated from the partner list above.
 * Business-dependent numbers (e.g. customers served) are switched OFF —
 * enable them only with real, verifiable figures.
 */
export const stats: { id: string; value: number | 'partners'; suffix?: string; enabled: boolean }[] = [
  { id: 'insurers', value: 'partners', suffix: '+', enabled: true },
  { id: 'categories', value: 3, enabled: true },
  { id: 'coverage', value: 0, enabled: true }, // shown as text: "Maharashtra-wide"
  { id: 'assistance', value: 0, enabled: true }, // shown as text: "Call & WhatsApp"
  // { id: 'customers', value: 0, suffix: '+', enabled: false }, // add only with a real, verifiable number
];

/** True if a config value is still a placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /X{4,}|example/i.test(value);
}
