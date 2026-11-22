/**
 * ENGLISH CONTENT — the reference dictionary.
 * hi.ts and mr.ts must have exactly the same shape (TypeScript enforces this).
 * Edit text here; keep keys unchanged.
 */
export const en = {
  meta: {
    siteName: 'One Stop Insurance',
    home: {
      title: 'Vehicle Insurance Services Across Maharashtra | One Stop Insurance',
      description:
        'One Stop Insurance helps customers across Maharashtra explore bike, car and commercial vehicle insurance options, with assistance for new policies and renewals over call and WhatsApp.',
    },
    about: {
      title: 'About Us | One Stop Insurance',
      description:
        'Learn about One Stop Insurance — our mission, vision, values and customer-first approach to vehicle insurance assistance across Maharashtra.',
    },
    vehicle: {
      title: 'Vehicle Insurance – Bike, Car & Commercial | One Stop Insurance',
      description:
        'Understand two-wheeler, private car and commercial vehicle insurance in Maharashtra: what each covers, who needs it and the coverage types available.',
    },
    services: {
      title: 'Our Services – New Policy, Renewal & Coverage | One Stop Insurance',
      description:
        'Assistance with new vehicle insurance, renewals, comprehensive, third-party, own damage and commercial vehicle insurance across Maharashtra.',
    },
    types: {
      title: 'Insurance Types – Third-Party, Comprehensive & Own Damage | One Stop Insurance',
      description:
        'A clear guide to third-party, comprehensive and own damage vehicle insurance — coverage, benefits, limitations and examples.',
    },
    renewal: {
      title: 'Vehicle Insurance Renewal in Maharashtra | One Stop Insurance',
      description:
        'Why timely vehicle insurance renewal matters, what happens when a policy expires, and how One Stop Insurance can assist with your renewal.',
    },
    faqs: {
      title: 'Vehicle Insurance FAQs – IDV, NCB, Renewal & More | One Stop Insurance',
      description:
        'Answers to common questions on vehicle insurance, third-party and comprehensive cover, IDV, NCB, zero depreciation, deductibles and expired policies.',
    },
    contact: {
      title: 'Contact Us | One Stop Insurance',
      description: 'Call or WhatsApp One Stop Insurance for vehicle insurance assistance anywhere in Maharashtra.',
    },
    terms: {
      title: 'Terms & Conditions | One Stop Insurance',
      description: 'Terms and conditions for using the One Stop Insurance website.',
    },
    disclaimer: {
      title: 'Disclaimer | One Stop Insurance',
      description: 'Important information about the scope and limitations of the content on the One Stop Insurance website.',
    },
    notFound: {
      title: 'Page Not Found | One Stop Insurance',
      description: 'The page you are looking for could not be found.',
    },
  },

  common: {
    skipToContent: 'Skip to main content',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    mainNav: 'Main navigation',
    nav: {
      home: 'Home',
      about: 'About Us',
      vehicle: 'Vehicle Insurance',
      services: 'Our Services',
      types: 'Insurance Types',
      renewal: 'Insurance Renewal',
      faqs: 'FAQs',
      contact: 'Contact Us',
      terms: 'Terms & Conditions',
      disclaimer: 'Disclaimer',
    },
    bottomNav: { label: 'Quick navigation', home: 'Home', services: 'Services', contact: 'Contact', whatsapp: 'WhatsApp' },
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    chatOnWhatsApp: 'Chat on WhatsApp',
    callAria: 'Call One Stop Insurance',
    whatsappAria: 'Chat with One Stop Insurance on WhatsApp (opens in a new tab)',
    backToTop: 'Back to top',
    exploreMore: 'Explore More',
    learnMore: 'Learn more',
    contactUs: 'Contact Us',
    breadcrumbHome: 'Home',
    loading: 'Loading',
    whatsappMessage: "Hello, I'm interested in vehicle insurance. Please help me with the available options.",
    ctaBand: {
      title: 'Need help choosing the right vehicle insurance?',
      text: 'Talk to One Stop Insurance on call or WhatsApp. We will help you understand the options available for your vehicle.',
    },
    policyNote:
      'Coverage, exclusions, deductibles, insured declared value (IDV) and premiums depend on the insurer and the policy you choose. Always read the policy wording before buying.',
    draftNotice:
      'Draft for review: this content is provided as a draft and should be reviewed by the business and a qualified legal professional before publication.',
    lastUpdated: 'Last updated',
    footer: {
      about:
        'One Stop Insurance offers vehicle insurance assistance to customers across Maharashtra — helping you explore options for two-wheelers, private cars and commercial vehicles, for new policies and renewals.',
      quickLinks: 'Quick Links',
      services: 'Insurance Services',
      contact: 'Contact',
      legal: 'Legal',
      privacyTitle: 'Privacy notice',
      privacyText:
        'This website does not use contact forms or user accounts and does not collect personal information directly. If you contact us by phone or WhatsApp, the details you share are used only to respond to your enquiry. WhatsApp and Google Maps are third-party services governed by their own privacy policies.',
      rights: 'All Rights Reserved.',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      hours: 'Hours',
      pending: 'To be updated soon',
    },
  },

  home: {
    hero: {
      eyebrow: 'Two-wheeler · Private car · Commercial vehicle',
      title: 'Vehicle Insurance Services Across Maharashtra',
      text: 'One Stop Insurance helps you explore vehicle insurance options from multiple insurers and get personal assistance with new policies and renewals — over a quick call or WhatsApp.',
      primary: 'Explore Insurance Services',
      secondary: 'Contact Us',
      badges: ['New policies & renewals', 'Multiple insurers', 'Across Maharashtra'],
      imageAlt: 'Private car, scooter and commercial truck representing vehicle insurance categories',
    },
    categories: {
      eyebrow: 'Vehicle categories',
      title: 'Insurance Solutions for Every Vehicle',
      text: 'Whether you ride to work, drive your family or run a commercial fleet, we help you understand the cover available for your vehicle.',
      items: [
        {
          id: 'two-wheeler',
          title: 'Two-Wheeler Insurance',
          text: 'Cover for everyday riders, from daily commutes to weekend rides.',
          points: ['Bikes', 'Scooters', 'Other eligible two-wheelers'],
          imageAlt: 'Illustration of a scooter',
        },
        {
          id: 'private-car',
          title: 'Private Car Insurance',
          text: 'Protection for the car you and your family depend on.',
          points: ['Private cars', 'Personal-use vehicles'],
          imageAlt: 'Illustration of a private car',
        },
        {
          id: 'commercial',
          title: 'Commercial Vehicle Insurance',
          text: 'Cover designed for vehicles that earn a living.',
          points: ['Goods-carrying vehicles', 'Passenger-carrying vehicles', 'Commercial cars', 'Taxis and other eligible commercial vehicles'],
          imageAlt: 'Illustration of a goods-carrying truck',
        },
      ],
    },
    servicesPreview: {
      eyebrow: 'What we help with',
      title: 'Our Services',
      text: 'From buying a policy for a new vehicle to renewing an existing one, we guide you through the options.',
      viewAll: 'View All Services',
    },
    why: {
      eyebrow: 'Why One Stop Insurance',
      title: 'Why Choose One Stop Insurance?',
      text: 'We keep vehicle insurance simple, transparent and easy to discuss — so you can make an informed choice.',
      items: [
        { title: 'Multiple insurance options', text: 'Explore policies from several insurance companies in one place instead of approaching each one separately.' },
        { title: 'Assistance with vehicle insurance', text: 'Get help understanding cover types, add-ons and policy terms in plain language.' },
        { title: 'Support across Maharashtra', text: 'Assistance for customers in cities, towns and rural areas across the state.' },
        { title: 'New policies and renewals', text: 'Guidance whether you are insuring a new vehicle or renewing an existing policy.' },
        { title: 'Convenient WhatsApp & phone', text: 'Reach us the way you prefer — a quick call or a WhatsApp message.' },
      ],
    },
    benefits: {
      eyebrow: 'Why insure',
      title: 'Benefits of Vehicle Insurance',
      text: 'The right policy helps protect you, your vehicle and others on the road.',
      items: [
        { title: 'Financial protection', text: 'Helps reduce the financial impact of covered losses such as accidental damage or theft, as per policy terms.' },
        { title: 'Legal compliance', text: 'Third-party insurance is mandatory for vehicles used on public roads in India under the Motor Vehicles Act, 1988.' },
        { title: 'Accident-related protection', text: 'Covers third-party liabilities and, with suitable cover, damage to your own vehicle and personal accident benefits.' },
        { title: 'Protection against specified risks', text: 'Comprehensive and own damage policies can cover risks such as fire, theft and natural calamities listed in the policy.' },
        { title: 'Peace of mind', text: 'Drive and ride with confidence, knowing you have planned for the unexpected.' },
      ],
      note: 'Actual coverage depends on the policy, insurer, add-ons and terms and conditions.',
    },
    partners: {
      eyebrow: 'Insurance companies',
      title: 'Insurance Companies We Help You Explore',
      note: 'Insurer names and logos belong to their respective owners and are shown for information only. Their display does not imply a formal partnership, endorsement or authorisation.',
    },
    how: {
      eyebrow: 'Simple process',
      title: 'How It Works',
      text: 'Getting assistance with your vehicle insurance takes just four simple steps.',
      steps: [
        { title: 'Choose Your Vehicle Category', text: 'Two-wheeler, private car or commercial vehicle.' },
        { title: 'Contact One Stop Insurance', text: 'Call us or send a WhatsApp message with your requirement.' },
        { title: 'Explore Available Insurance Options', text: 'Understand the cover types, add-ons and options available.' },
        { title: 'Proceed With Your Selected Policy', text: 'Complete your policy through the relevant insurer.' },
      ],
    },
    coverage: {
      eyebrow: 'Service area',
      title: 'Serving Across Maharashtra',
      text: 'Our vehicle insurance assistance is intended for customers across Maharashtra, including:',
      note: 'Assistance is provided over phone and WhatsApp. Customers from any city, town or village in Maharashtra are welcome to contact us.',
      cities: {
        mumbai: 'Mumbai',
        pune: 'Pune',
        thane: 'Thane',
        nashik: 'Nashik',
        nagpur: 'Nagpur',
        sambhajinagar: 'Chhatrapati Sambhajinagar',
        kolhapur: 'Kolhapur',
      },
      more: 'and across Maharashtra',
    },
    stats: {
      eyebrow: 'At a glance',
      title: 'One Stop Insurance in Numbers',
      items: {
        insurers: { label: 'Listed insurance companies' },
        categories: { label: 'Vehicle insurance categories' },
        coverage: { value: 'Maharashtra', label: 'State-wide service coverage' },
        assistance: { value: 'Call & WhatsApp', label: 'Customer assistance channels' },
        customers: { label: 'Customers assisted' },
      },
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Talk to Us About Your Vehicle Insurance',
      text: 'Have a question about a new policy or a renewal? Call us or send a WhatsApp message and we will help you with the available options.',
    },
  },

  about: {
    hero: {
      eyebrow: 'About Us',
      title: 'Vehicle insurance assistance you can talk to',
      text: 'One Stop Insurance helps vehicle owners across Maharashtra understand their insurance options and get support with new policies and renewals.',
    },
    intro: {
      title: 'Who we are',
      paragraphs: [
        'One Stop Insurance (OSI) is a vehicle insurance services business serving customers across Maharashtra. We focus on one thing — helping people insure their two-wheelers, private cars and commercial vehicles with clarity and confidence.',
        'Insurance documents can be complicated. Terms like IDV, NCB, own damage and zero depreciation are not always easy to understand. We explain them in simple language, help you compare the options available from different insurers, and stay reachable over phone and WhatsApp when you need support.',
      ],
    },
    mission: {
      title: 'Our mission',
      text: 'To make vehicle insurance easy to understand and easy to access for every vehicle owner in Maharashtra, through honest guidance and responsive support.',
    },
    vision: {
      title: 'Our vision',
      text: 'To be a trusted, one-stop point of contact for vehicle insurance assistance across Maharashtra — known for clarity, convenience and care.',
    },
    values: {
      title: 'Our core values',
      items: [
        { title: 'Transparency', text: 'We explain what a policy covers and what it does not, without exaggeration or hidden conditions.' },
        { title: 'Customer first', text: 'Your vehicle, your usage and your budget guide the conversation — not a sales target.' },
        { title: 'Clarity', text: 'We use plain language and practical examples so you can make an informed decision.' },
        { title: 'Responsiveness', text: 'We aim to respond promptly over call and WhatsApp, especially when your renewal is due.' },
        { title: 'Integrity', text: 'We never promise guaranteed claim settlements or the lowest premium. Policy decisions rest with the insurer.' },
      ],
    },
    approach: {
      title: 'Our customer-first approach',
      text: 'Every vehicle owner has different needs. A daily commuter, a family car owner and a fleet operator each need different kinds of protection. We take time to understand your requirement before discussing options.',
      points: [
        'We listen to your requirement — vehicle type, usage and current policy status.',
        'We explain the cover types and add-ons that may be relevant to you.',
        'We help you explore options available from different insurers.',
        'You decide, and proceed with the selected policy through the relevant insurer.',
      ],
    },
    commitment: {
      title: 'Our commitment to Maharashtra',
      text: 'From Mumbai and Pune to Nagpur, Nashik, Kolhapur and Chhatrapati Sambhajinagar — and the towns and villages in between — our assistance is available to vehicle owners across Maharashtra over phone and WhatsApp, in English, Hindi and Marathi.',
    },
  },

  vehicle: {
    hero: {
      eyebrow: 'Vehicle Insurance',
      title: 'Vehicle insurance for two-wheelers, cars and commercial vehicles',
      text: 'Understand the cover available for your vehicle, who needs it and the benefits it offers — then talk to us for assistance.',
    },
    jump: 'Jump to',
    labels: {
      what: 'What it is',
      who: 'Who needs it',
      coverage: 'Types of coverage available',
      benefits: 'Important benefits',
      cta: 'Get assistance for this vehicle',
    },
    sections: [
      {
        id: 'two-wheeler',
        title: 'Two-Wheeler Insurance',
        lead: 'For bikes, scooters and other eligible two-wheelers.',
        what: 'Two-wheeler insurance is a motor insurance policy for bikes, scooters and other eligible two-wheelers. It covers your legal liability towards third parties and, depending on the policy, damage to or loss of your own two-wheeler.',
        who: [
          'Every owner of a two-wheeler used on public roads in India — third-party cover is mandatory by law.',
          'Daily commuters, students and professionals who rely on their bike or scooter.',
          'Owners of new two-wheelers looking for wider protection than third-party cover alone.',
        ],
        coverage: [
          { title: 'Third-party liability', text: 'Covers legal liability for injury, death or property damage caused to others.' },
          { title: 'Comprehensive', text: 'Third-party liability plus own damage cover for your two-wheeler, subject to policy terms.' },
          { title: 'Standalone own damage', text: 'Own damage cover for two-wheelers that already have a valid third-party policy.' },
        ],
        benefits: [
          'Meets the legal requirement to ride on public roads.',
          'Helps with repair costs for covered accidental damage (with own damage cover).',
          'Cover against theft and specified natural and man-made calamities, as per policy.',
          'Optional add-ons such as zero depreciation, depending on the insurer.',
        ],
      },
      {
        id: 'private-car',
        title: 'Private Car Insurance',
        lead: 'For private cars and personal-use vehicles.',
        what: 'Private car insurance is a motor insurance policy for cars used for personal purposes. It provides third-party liability cover and, with comprehensive or own damage cover, protection for your own car against specified risks.',
        who: [
          'Every owner of a private car used on public roads in India — third-party cover is mandatory.',
          'Families and individuals using their car for personal travel.',
          'Owners of new cars and owners renewing an existing car policy.',
        ],
        coverage: [
          { title: 'Third-party liability', text: 'Covers legal liability towards others for bodily injury, death or property damage.' },
          { title: 'Comprehensive', text: 'Combines third-party liability with own damage cover for your car, subject to policy terms.' },
          { title: 'Standalone own damage', text: 'Own damage cover for cars that already hold a valid third-party policy.' },
          { title: 'Optional add-ons', text: 'Depending on the insurer: zero depreciation, roadside assistance, engine protection, return to invoice and more.' },
        ],
        benefits: [
          'Legal compliance for driving on public roads.',
          'Financial support for covered repair costs after accidents.',
          'Protection against theft, fire and natural calamities, as listed in the policy.',
          'No Claim Bonus (NCB) on the own damage premium for claim-free years, as per insurer rules.',
        ],
      },
      {
        id: 'commercial',
        title: 'Commercial Vehicle Insurance',
        lead: 'For vehicles used for business, transport and hire.',
        what: 'Commercial vehicle insurance covers vehicles used for business purposes — carrying goods, carrying passengers for hire or reward, and other commercial uses. Policies are designed around the vehicle type, its usage and its carrying capacity.',
        who: [
          'Transporters, logistics businesses and individual truck or tempo owners.',
          'Taxi, cab and auto-rickshaw owners and operators.',
          'School and staff bus operators and other passenger-carrying vehicle owners.',
          'Businesses that use cars or other vehicles for commercial purposes.',
        ],
        coverage: [
          { title: 'Third-party liability', text: 'Mandatory cover for liability towards third parties, which may include passengers as applicable under the policy.' },
          { title: 'Comprehensive / package', text: 'Third-party liability plus own damage cover for the commercial vehicle, subject to policy terms.' },
          { title: 'Optional covers', text: 'Depending on the insurer: personal accident for paid driver, cover for cleaners or conductors, and other add-ons.' },
        ],
        benefits: [
          'Keeps your business vehicle legally compliant on the road.',
          'Helps protect your income-earning asset from covered losses.',
          'Cover options suited to goods-carrying and passenger-carrying use.',
          'Support for single vehicles as well as multiple vehicles.',
        ],
      },
    ],
    commercialSegments: {
      title: 'Commercial vehicles we can assist with',
      items: [
        { title: 'Goods-carrying vehicles', text: 'Trucks, tempos, pick-ups, mini trucks and other vehicles used to transport goods.' },
        { title: 'Passenger-carrying vehicles', text: 'Buses, school vans, auto-rickshaws and other vehicles carrying passengers for hire or reward.' },
        { title: 'Commercial cars and taxis', text: 'Cabs, taxis and cars registered or used for commercial purposes.' },
        { title: 'Other eligible commercial vehicles', text: 'Other vehicles used for business, subject to insurer eligibility.' },
      ],
    },
    commercialImportance: {
      title: 'Why appropriate commercial cover matters',
      text: 'A commercial vehicle insured under the wrong category — for example, a car used as a taxi but insured as a private car — may face claim rejection. The vehicle type, permit, usage and seating or carrying capacity should be correctly declared so that the policy matches how the vehicle is actually used.',
    },
  },

  services: {
    hero: {
      eyebrow: 'Our Services',
      title: 'Vehicle insurance services, explained simply',
      text: 'We assist with new policies, renewals and every major type of vehicle cover — so you can choose with confidence.',
    },
    labels: {
      benefits: 'Benefits',
      suitable: 'Suitable for',
      cta: 'Ask about this service',
    },
    items: [
      {
        id: 'new-vehicle',
        title: 'New Vehicle Insurance',
        short: 'Insurance for a newly purchased two-wheeler, car or commercial vehicle.',
        description:
          'Bought a new vehicle? It must be insured before it goes on the road. We help you understand the cover required for new vehicles — including long-term third-party cover where applicable — and explore the own damage and add-on options available from different insurers.',
        benefits: [
          'Understand mandatory and optional cover for new vehicles.',
          'Explore options from multiple insurers.',
          'Guidance on add-ons such as zero depreciation and roadside assistance.',
        ],
        suitable: ['New two-wheelers', 'New private cars', 'New commercial vehicles'],
      },
      {
        id: 'renewal',
        title: 'Vehicle Insurance Renewal',
        short: 'Timely renewal support so your vehicle stays protected and legal.',
        description:
          'Renewing on time keeps your cover continuous and helps preserve your No Claim Bonus. We help you review your current policy, understand changes in IDV and premium, and explore renewal options — including switching insurer if you wish.',
        benefits: [
          'Avoid a gap in cover and the risks of riding or driving uninsured.',
          'Help preserving eligible No Claim Bonus.',
          'Review your cover and add-ons before renewing.',
        ],
        suitable: ['Two-wheelers', 'Private cars', 'Commercial vehicles'],
      },
      {
        id: 'comprehensive',
        title: 'Comprehensive Insurance',
        short: 'Third-party liability plus own damage cover in one policy.',
        description:
          'A comprehensive policy combines mandatory third-party liability cover with own damage cover for your vehicle against specified risks such as accidents, theft, fire and natural calamities — subject to the policy terms, exclusions and deductibles.',
        benefits: [
          'Wider protection than third-party cover alone.',
          'Covers damage to your own vehicle as per policy terms.',
          'Can be enhanced with optional add-ons.',
        ],
        suitable: ['Two-wheelers', 'Private cars', 'Commercial vehicles'],
      },
      {
        id: 'third-party',
        title: 'Third-Party Insurance',
        short: 'The mandatory minimum cover for vehicles on Indian roads.',
        description:
          'Third-party insurance covers your legal liability for death, bodily injury or property damage caused to a third party by your vehicle. It is mandatory under the Motor Vehicles Act, 1988. It does not cover damage to your own vehicle.',
        benefits: [
          'Meets the legal requirement for using a vehicle on public roads.',
          'Covers legal liability towards third parties as per policy.',
          'Premiums for third-party cover are regulated.',
        ],
        suitable: ['All vehicles used on public roads'],
      },
      {
        id: 'own-damage',
        title: 'Own Damage Insurance',
        short: 'Cover for your own vehicle when you already have third-party cover.',
        description:
          'Standalone own damage insurance covers damage to or loss of your own vehicle due to specified risks. It is available for vehicles that already have a valid third-party policy — for example, when a new vehicle has a long-term third-party policy.',
        benefits: [
          'Protects your own vehicle without duplicating third-party cover.',
          'Flexibility to choose a different insurer for own damage cover.',
          'Add-ons can be included as offered by the insurer.',
        ],
        suitable: ['Two-wheelers and private cars with a valid third-party policy'],
      },
      {
        id: 'commercial',
        title: 'Commercial Vehicle Insurance',
        short: 'Cover for goods-carrying, passenger-carrying and other commercial vehicles.',
        description:
          'We assist owners and operators of commercial vehicles in understanding the cover that matches their vehicle type and usage — from trucks and tempos to taxis, buses and auto-rickshaws — and exploring options from different insurers.',
        benefits: [
          'Cover aligned with vehicle category and usage.',
          'Options for third-party and comprehensive cover.',
          'Assistance for single vehicles and fleets.',
        ],
        suitable: ['Goods-carrying vehicles', 'Passenger-carrying vehicles', 'Commercial cars and taxis'],
      },
    ],
  },

  types: {
    hero: {
      eyebrow: 'Insurance Types',
      title: 'Third-party, comprehensive and own damage — explained',
      text: 'Understand what each type of vehicle insurance covers, its benefits and its limitations, so you can choose what suits you.',
    },
    labels: {
      covers: 'What it covers',
      benefits: 'Benefits',
      limitations: 'Limitations',
      example: 'Example',
    },
    items: [
      {
        id: 'third-party',
        title: 'Third-Party Insurance',
        tag: 'Mandatory by law',
        summary:
          'Third-party insurance covers your legal liability towards other people (third parties) if your vehicle causes them death, bodily injury or damage to their property. Under the Motor Vehicles Act, 1988, every vehicle used in a public place in India must have at least third-party cover. Using a vehicle without it is an offence that can attract penalties.',
        covers: [
          'Legal liability for death or bodily injury to a third party.',
          'Legal liability for damage to third-party property, up to the limit specified in the policy.',
          'Compulsory personal accident cover for the owner-driver, where applicable and not already held.',
        ],
        benefits: [
          'Fulfils the legal requirement to use your vehicle on public roads.',
          'Protects you from large third-party liability costs, as per policy.',
          'Most affordable form of motor insurance; premiums are regulated.',
        ],
        limitations: [
          'Does not cover damage to or theft of your own vehicle.',
          'Does not cover your own repair costs after an accident.',
          'Standard exclusions apply, such as driving without a valid licence or under the influence.',
        ],
        example:
          'Your car accidentally hits a parked scooter. The third-party policy may cover the scooter owner’s damage as per policy terms — but your own car’s repairs will not be covered.',
      },
      {
        id: 'comprehensive',
        title: 'Comprehensive Insurance',
        tag: 'Wider protection',
        summary:
          'A comprehensive policy combines third-party liability cover with own damage cover for your vehicle in a single policy. It offers broader protection against specified risks, subject to the policy terms, exclusions, deductibles and the insured declared value (IDV).',
        covers: [
          'Everything included in third-party liability cover.',
          'Damage to your own vehicle from accidents, fire, explosion and specified risks.',
          'Theft of the vehicle, and damage from specified natural and man-made calamities.',
          'Optional add-ons such as zero depreciation, roadside assistance and engine protection, as offered.',
        ],
        benefits: [
          'Covers both third-party liability and your own vehicle.',
          'Can be customised with add-ons.',
          'Eligible for No Claim Bonus on the own damage premium for claim-free years.',
        ],
        limitations: [
          'Higher premium than third-party-only cover.',
          'Normal wear and tear, mechanical or electrical breakdown and consequential losses are generally excluded.',
          'Depreciation on parts and deductibles apply unless covered by an add-on.',
          'Claims are settled up to the IDV and as per policy terms.',
        ],
        example:
          'Your car is damaged in a flood. If floods are a covered peril under your comprehensive policy, the insurer may pay for eligible repairs after deductibles and depreciation, as per policy terms.',
      },
      {
        id: 'own-damage',
        title: 'Own Damage Insurance',
        tag: 'Works with third-party cover',
        summary:
          'Standalone own damage (OD) insurance covers damage to or loss of your own vehicle only. It does not include third-party liability, so it can be bought only when your vehicle already has a valid third-party policy — commonly the long-term third-party cover purchased with a new car or two-wheeler.',
        covers: [
          'Damage to your own vehicle from accidents and specified risks.',
          'Theft of the vehicle.',
          'Damage from fire and specified natural and man-made calamities.',
          'Add-ons as offered by the insurer.',
        ],
        benefits: [
          'Lets you protect your vehicle without paying again for third-party cover.',
          'You may choose a different insurer for OD than for third-party cover.',
          'Eligible for No Claim Bonus for claim-free years, as per insurer rules.',
        ],
        limitations: [
          'Cannot be bought on its own without a valid third-party policy.',
          'Does not cover any third-party liability.',
          'Standard exclusions, deductibles and depreciation apply as per the policy.',
        ],
        example:
          'You bought a new scooter with a five-year third-party policy and a one-year own damage cover. When the first year ends, you can renew own damage cover as a standalone OD policy while the third-party cover continues.',
      },
    ],
    note: {
      title: 'Always check your policy terms',
      text: 'Exclusions, deductibles, insured declared value (IDV), add-ons and the extent of coverage depend on the insurer and the specific policy you select. The information on this page is general and does not replace the policy wording.',
    },
  },

  renewal: {
    hero: {
      eyebrow: 'Insurance Renewal',
      title: 'Renew your vehicle insurance on time',
      text: 'Keep your cover continuous, stay legally compliant and protect your eligible No Claim Bonus. We can help with your renewal over call or WhatsApp.',
    },
    what: {
      title: 'What does insurance renewal mean?',
      text: 'Most motor insurance policies run for a fixed period, usually one year. Renewal means buying cover for the next period before the current policy expires — either with the same insurer or a different one. At renewal you can review your IDV, cover type and add-ons.',
    },
    why: {
      title: 'Why timely renewal matters',
      items: [
        { title: 'Stay legal', text: 'Using a vehicle on public roads without valid third-party insurance is an offence under the Motor Vehicles Act.' },
        { title: 'Continuous protection', text: 'Renewing on time avoids any gap during which an accident or theft would not be covered.' },
        { title: 'Protect your NCB', text: 'Insurers generally allow the No Claim Bonus to be carried forward only if renewal happens within the permitted period after expiry.' },
        { title: 'Simpler process', text: 'Timely renewals usually avoid the vehicle inspection that insurers may require after a break in cover.' },
      ],
    },
    expired: {
      title: 'What happens when a policy expires?',
      text: 'Once your policy expires, your vehicle is no longer insured. Depending on the length of the break and the insurer’s rules:',
      items: [
        'Any accident, damage or theft after expiry is not covered.',
        'Using the vehicle on public roads without third-party cover can attract penalties.',
        'The insurer may require a vehicle inspection before issuing a new comprehensive or own damage policy.',
        'Your accumulated No Claim Bonus may lapse if the policy is not renewed within the period allowed — generally 90 days from expiry.',
      ],
    },
    benefits: {
      title: 'Benefits of renewing on time',
      items: [
        'Uninterrupted cover for you and your vehicle.',
        'Opportunity to review and update your IDV and add-ons.',
        'Retain your eligible No Claim Bonus discount.',
        'Time to explore options from different insurers without pressure.',
      ],
    },
    process: {
      title: 'General renewal process',
      steps: [
        { title: 'Check your policy expiry date', text: 'Find it on your current policy document or insurer communication.' },
        { title: 'Keep your details ready', text: 'Previous policy, registration certificate (RC) and details of any claims made.' },
        { title: 'Contact One Stop Insurance', text: 'Share your requirement on call or WhatsApp.' },
        { title: 'Review your options', text: 'Compare cover, IDV and add-ons available from different insurers.' },
        { title: 'Complete renewal with the insurer', text: 'Proceed with the selected policy through the relevant insurer and keep a copy of the policy document.' },
      ],
    },
    documents: {
      title: 'What to keep ready',
      items: ['Previous policy copy or policy number', 'Vehicle registration certificate (RC)', 'Details of claims made in the current policy year, if any', 'Owner’s contact details'],
    },
    help: {
      title: 'Renewal due soon? We can help.',
      text: 'Send us your vehicle and policy details on WhatsApp, or call us. We will help you understand your renewal options.',
    },
  },

  faqs: {
    hero: {
      eyebrow: 'FAQs',
      title: 'Frequently asked questions',
      text: 'Clear answers to common questions about vehicle insurance, cover types and renewals.',
    },
    categoriesLabel: 'FAQ categories',
    categories: [
      {
        id: 'general',
        title: 'General Insurance',
        items: [
          { q: 'Is vehicle insurance mandatory in India?', a: 'Yes. Under the Motor Vehicles Act, 1988, every motor vehicle used in a public place must have at least third-party insurance. Comprehensive or own damage cover is optional but provides protection for your own vehicle.' },
          { q: 'What is the difference between third-party and comprehensive insurance?', a: 'Third-party insurance covers only your legal liability towards others. Comprehensive insurance includes third-party cover plus own damage cover for your vehicle against specified risks, subject to policy terms.' },
          { q: 'What is own damage (OD) insurance?', a: 'Own damage insurance covers damage to or loss of your own vehicle due to accidents, theft, fire and other specified risks. As a standalone policy, it can be bought only if your vehicle already has a valid third-party policy.' },
          { q: 'What is IDV?', a: 'Insured Declared Value (IDV) is the maximum amount the insurer will pay if your vehicle is stolen or declared a total loss. It is broadly based on the manufacturer’s listed selling price minus depreciation for the vehicle’s age. IDV directly affects your premium.' },
          { q: 'What is NCB (No Claim Bonus)?', a: 'NCB is a discount on the own damage premium given for each claim-free policy year. Insurers typically offer it on a scale that rises with consecutive claim-free years, commonly from 20% up to 50%. NCB belongs to the owner, not the vehicle, and can usually be transferred to a new vehicle.' },
          { q: 'What is zero depreciation cover?', a: 'Zero depreciation (also called nil depreciation or bumper-to-bumper) is an optional add-on. Without it, depreciation is deducted on replaced parts during a claim. With it, the insurer does not deduct depreciation on eligible parts, subject to the add-on’s terms and claim limits.' },
          { q: 'What is a deductible?', a: 'A deductible is the part of an own damage claim that you pay yourself. A compulsory deductible is set by the policy; a voluntary deductible is an amount you choose to bear in exchange for a lower premium. Deductibles vary by insurer and vehicle.' },
          { q: 'Does One Stop Insurance issue insurance policies?', a: 'One Stop Insurance provides vehicle insurance assistance and information. Policies are issued by the relevant insurance company, and all coverage, premiums and claim decisions are made by the insurer as per the policy terms.' },
        ],
      },
      {
        id: 'two-wheeler',
        title: 'Two-Wheeler Insurance',
        items: [
          { q: 'Do I need insurance for my scooter or bike?', a: 'Yes. At least third-party insurance is mandatory for every two-wheeler used on public roads. Comprehensive cover is recommended if you want protection for your own vehicle.' },
          { q: 'What cover is required for a new two-wheeler?', a: 'New two-wheelers are currently required to have long-term third-party cover (five years). Own damage cover can be taken for one year and renewed separately, or as part of a long-term package, depending on the insurer.' },
          { q: 'Is zero depreciation available for two-wheelers?', a: 'Many insurers offer zero depreciation as an add-on for two-wheelers, usually subject to the age of the vehicle and other conditions. Availability and terms differ between insurers.' },
          { q: 'Will my NCB transfer if I sell my bike and buy another?', a: 'Generally yes. NCB belongs to the owner, so you can usually transfer it to your new vehicle of the same class by obtaining proof of NCB from your previous insurer, as per insurer rules.' },
        ],
      },
      {
        id: 'private-car',
        title: 'Private Car Insurance',
        items: [
          { q: 'What cover is required for a new car?', a: 'New private cars are currently required to have long-term third-party cover (three years). Own damage cover can be bought for one year and renewed annually, or as offered by the insurer.' },
          { q: 'Which add-ons are commonly available for cars?', a: 'Common add-ons include zero depreciation, roadside assistance, engine protection, return to invoice, consumables cover and key replacement. Availability, price and terms vary by insurer.' },
          { q: 'Will making a small claim affect my NCB?', a: 'Usually yes. Making an own damage claim generally resets your NCB to zero at the next renewal. For small damages, some owners prefer to pay themselves to retain NCB. Some insurers offer an NCB protection add-on.' },
          { q: 'Can I switch my car insurance to a different insurer?', a: 'Yes. You can choose a different insurer at renewal. Your eligible NCB can usually be carried over with proof from your previous insurer.' },
        ],
      },
      {
        id: 'commercial',
        title: 'Commercial Vehicle Insurance',
        items: [
          { q: 'Can I insure my taxi under a private car policy?', a: 'No. A vehicle used commercially, such as a taxi, should be insured under the appropriate commercial vehicle policy. Incorrect declaration of usage can lead to claim rejection.' },
          { q: 'What types of commercial vehicles can be insured?', a: 'Goods-carrying vehicles (trucks, tempos, pick-ups), passenger-carrying vehicles (buses, auto-rickshaws, taxis, school vans) and other eligible commercial vehicles, subject to insurer eligibility.' },
          { q: 'Does commercial vehicle insurance cover passengers?', a: 'For passenger-carrying vehicles, third-party liability generally extends to passengers as per the policy and applicable law. Personal accident covers for the paid driver, conductor or cleaner may be available as additional covers.' },
          { q: 'What details are needed for commercial vehicle insurance?', a: 'Typically the RC, permit details, vehicle usage, carrying or seating capacity and previous policy details. The insurer may ask for more information depending on the vehicle.' },
        ],
      },
      {
        id: 'renewal',
        title: 'Insurance Renewal',
        items: [
          { q: 'When should I renew my vehicle insurance?', a: 'Before the expiry date of your current policy. Renewing a few days in advance gives time to review your options and avoids any gap in cover.' },
          { q: 'What happens if my policy has already expired?', a: 'Your vehicle is uninsured from the day after expiry. You should avoid using it on public roads until renewed. The insurer may require a vehicle inspection before issuing comprehensive or own damage cover.' },
          { q: 'Will I lose my NCB if my policy expires?', a: 'If the policy is not renewed within the period allowed by the insurer — generally 90 days from expiry — the accumulated NCB usually lapses.' },
          { q: 'Can I change my IDV or add-ons at renewal?', a: 'Yes. Renewal is a good time to review your IDV within the range allowed by the insurer and to add or remove add-ons based on your needs.' },
          { q: 'How can One Stop Insurance help with renewal?', a: 'Share your current policy and vehicle details with us on WhatsApp or call us. We will help you understand your renewal options from different insurers.' },
        ],
      },
    ],
    still: {
      title: 'Still have a question?',
      text: 'Call or WhatsApp us and we will be happy to help.',
    },
  },

  contact: {
    hero: {
      eyebrow: 'Contact Us',
      title: 'We are here to help',
      text: 'Call or WhatsApp One Stop Insurance for assistance with vehicle insurance — new policies, renewals and coverage questions.',
    },
    labels: {
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Office address',
      hours: 'Operating hours',
      map: 'Location map',
      directions: 'Get Directions',
      call: 'Call Now',
      chat: 'Chat on WhatsApp',
      emailUs: 'Send an Email',
      pending: 'Details will be updated soon',
      mapPending: 'Office location map will appear here once the address is confirmed.',
    },
    channels: {
      title: 'Ways to reach us',
      text: 'The quickest way to reach us is by phone or WhatsApp. Share your vehicle type and whether you need a new policy or a renewal.',
    },
    serviceArea: {
      title: 'Service area',
      text: 'We assist customers across Maharashtra over phone and WhatsApp.',
    },
    note: 'Please do not share sensitive personal information such as bank or card details over WhatsApp or phone.',
  },

  terms: {
    hero: { eyebrow: 'Legal', title: 'Terms & Conditions', text: 'Please read these terms carefully before using this website.' },
    sections: [
      { title: '1. About this website', paragraphs: ['This website is operated by One Stop Insurance ("we", "us", "our"). It provides general information about vehicle insurance and about the assistance we offer. By accessing or using this website, you agree to these terms. If you do not agree, please do not use the website.'] },
      { title: '2. Informational purpose only', paragraphs: ['All content on this website is provided for general information only. It does not constitute insurance, legal, financial or professional advice, and it is not an offer, solicitation or recommendation to buy any specific insurance product.', 'No insurance policy can be purchased, issued or renewed through this website.'] },
      { title: '3. Insurance policies and insurers', paragraphs: ['Insurance policies are issued by insurance companies. Premiums, coverage, exclusions, deductibles, insured declared value (IDV), add-ons and claim decisions are determined solely by the relevant insurer under the policy terms and applicable law.', 'Customers should read the policy wording, prospectus and terms carefully before purchasing any policy.'] },
      { title: '4. Accuracy of information', paragraphs: ['We make reasonable efforts to keep the information on this website accurate and up to date. However, insurance rules, regulations and products change from time to time, and we do not warrant that all content is complete, current or error-free. Please confirm important details with the insurer before making a decision.'] },
      { title: '5. No guarantees', paragraphs: ['We do not guarantee the availability of any policy, the lowest premium, the approval of any proposal or the settlement of any claim.'] },
      { title: '6. Third-party names, logos and links', paragraphs: ['Names and logos of insurance companies are trademarks of their respective owners and are displayed for identification and information only. Their display does not imply any partnership, endorsement, sponsorship or authorisation unless expressly stated.', 'This website may link to third-party services such as WhatsApp and Google Maps. We are not responsible for the content, availability or privacy practices of third-party services.'] },
      { title: '7. Communication', paragraphs: ['When you contact us by phone or WhatsApp, you agree that we may respond to your enquiry using the same channel. Please do not share sensitive financial information such as bank account, card or OTP details.'] },
      { title: '8. Intellectual property', paragraphs: ['The website design, text and the One Stop Insurance wordmark are the property of One Stop Insurance unless otherwise stated. You may not copy, reproduce or distribute the content for commercial purposes without prior written permission.'] },
      { title: '9. Limitation of liability', paragraphs: ['To the extent permitted by law, One Stop Insurance shall not be liable for any loss or damage arising from the use of, or reliance on, the information on this website, or from the unavailability of the website.'] },
      { title: '10. Changes to these terms', paragraphs: ['We may update these terms from time to time. The updated version will be posted on this page. Continued use of the website after changes means you accept the updated terms.'] },
      { title: '11. Governing law', paragraphs: ['These terms are governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts in Maharashtra.'] },
      { title: '12. Contact', paragraphs: ['For questions about these terms, please contact us using the details on the Contact Us page.'] },
    ],
  },

  disclaimer: {
    hero: { eyebrow: 'Legal', title: 'Disclaimer', text: 'Important information about the content of this website.' },
    sections: [
      { title: 'General information', paragraphs: ['The information on this website is provided by One Stop Insurance for general informational purposes only. It is not insurance, legal, tax or financial advice and should not be relied upon as such.'] },
      { title: 'Not an insurer', paragraphs: ['One Stop Insurance is not an insurance company and does not issue insurance policies. Policies are issued by the respective insurance companies. Nothing on this website should be read as a claim that One Stop Insurance is an insurer, policy issuer or a licensed intermediary unless such details are expressly published with verifiable registration information.'] },
      { title: 'Coverage depends on the policy', paragraphs: ['Descriptions of insurance types, benefits, add-ons, IDV, NCB, deductibles and exclusions on this website are general in nature. Actual coverage, premiums and terms depend entirely on the insurer and the specific policy selected. Always read the policy wording before buying.'] },
      { title: 'No guarantees', paragraphs: ['We do not guarantee the lowest premium, approval of any proposal, or settlement of any claim. All underwriting and claim decisions are made by the insurer.'] },
      { title: 'Insurer names and logos', paragraphs: ['Insurance company names and logos are the property of their respective owners and are shown for information only. Their display does not imply a formal partnership, endorsement or authorisation.'] },
      { title: 'Laws and regulations', paragraphs: ['References to laws, rules and regulatory requirements reflect our general understanding at the time of writing and may change. Please verify current requirements with the insurer or the relevant authority.'] },
      { title: 'External services', paragraphs: ['Links to WhatsApp, Google Maps or other third-party services are provided for convenience. We are not responsible for their content, availability or privacy practices.'] },
      { title: 'Limitation of liability', paragraphs: ['One Stop Insurance shall not be liable for any loss or damage arising from reliance on the information on this website. By using this website, you accept this disclaimer.'] },
    ],
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: 'Sorry, the page you are looking for does not exist or may have been moved.',
    home: 'Return Home',
  },
};

export type Dictionary = typeof en;
