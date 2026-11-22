/**
 * Clean, brand-coloured vehicle illustrations (original artwork, inline SVG).
 * Used on category cards and as the hero fallback until real photography
 * is added (see README → "Replacing images").
 */
const NAVY = '#102B50';
const NAVY2 = '#1D3F6E';
const ORANGE = '#F28C28';
const GLASS = '#CFE0F3';
const TYRE = '#1B2230';
const HUB = '#C9D2DE';

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={TYRE} />
      <circle cx={cx} cy={cy} r={r * 0.55} fill={HUB} />
      <circle cx={cx} cy={cy} r={r * 0.2} fill={NAVY} />
    </g>
  );
}

export function CarArt({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 260 130" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="art">
      <ellipse cx="130" cy="114" rx="112" ry="7" fill="#102B50" opacity=".10" />
      <path
        d="M22 84c0-11 7-19 18-20l34-5 26-24c4-4 9-6 15-6h56c6 0 11 2 15 6l24 24 21 4c10 2 16 9 16 19v9c0 4-3 7-7 7H29c-4 0-7-3-7-7z"
        fill={NAVY}
      />
      <path d="M84 58l22-21c2-2 5-3 8-3h28v24z" fill={GLASS} />
      <path d="M150 34h22c3 0 6 1 8 3l21 21h-51z" fill={GLASS} />
      <rect x="144" y="34" width="5" height="25" fill={NAVY} />
      <path d="M24 82h214" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" />
      <rect x="226" y="70" width="12" height="6" rx="3" fill={ORANGE} />
      <rect x="22" y="72" width="9" height="6" rx="3" fill="#FFD6AE" />
      <rect x="118" y="66" width="14" height="3" rx="1.5" fill={NAVY2} />
      <rect x="166" y="66" width="14" height="3" rx="1.5" fill={NAVY2} />
      <Wheel cx={70} cy={98} r={17} />
      <Wheel cx={198} cy={98} r={17} />
    </svg>
  );
}

export function ScooterArt({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 260 150" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="art">
      <ellipse cx="130" cy="136" rx="100" ry="6" fill="#102B50" opacity=".10" />
      {/* rear body */}
      <path d="M40 104c0-22 18-40 40-40h48c8 0 12 6 12 12v16c0 10-8 18-18 18H48c-5 0-8-2-8-6z" fill={NAVY} />
      {/* seat */}
      <path d="M58 60c0-6 5-10 11-10h50c6 0 9 6 6 10l-3 4H58z" fill={TYRE} />
      {/* floorboard */}
      <path d="M118 104h52l6-8h-52z" fill={NAVY2} />
      {/* front shield */}
      <path d="M168 104l20-62c2-6 6-9 12-9h4l-14 71z" fill={NAVY} />
      <path d="M176 100l16-52" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" />
      {/* handlebar */}
      <path d="M196 34l-8-12" stroke={TYRE} strokeWidth="5" strokeLinecap="round" />
      <path d="M178 20h22" stroke={TYRE} strokeWidth="6" strokeLinecap="round" />
      <circle cx="205" cy="40" r="5" fill="#FFD6AE" />
      {/* side stripe */}
      <path d="M52 92h72" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" />
      {/* fork */}
      <path d="M196 70l12 44" stroke={HUB} strokeWidth="6" strokeLinecap="round" />
      <Wheel cx={70} cy={116} r={20} />
      <Wheel cx={208} cy={116} r={20} />
    </svg>
  );
}

export function TruckArt({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 280 150" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="art">
      <ellipse cx="140" cy="134" rx="124" ry="6" fill="#102B50" opacity=".10" />
      {/* cargo box */}
      <rect x="18" y="22" width="164" height="88" rx="6" fill="#E9EEF5" stroke={NAVY} strokeWidth="4" />
      <path d="M18 92h164" stroke={ORANGE} strokeWidth="6" />
      <path d="M62 26v66M106 26v66M150 26v66" stroke="#C9D2DE" strokeWidth="2" />
      {/* cab */}
      <path d="M186 48h38c5 0 9 2 12 6l22 28c2 3 3 6 3 9v19c0 4-3 7-7 7h-68z" fill={NAVY} />
      <path d="M196 56h26c3 0 5 1 7 3l17 22h-50z" fill={GLASS} />
      <rect x="248" y="96" width="12" height="6" rx="3" fill="#FFD6AE" />
      <rect x="14" y="108" width="246" height="8" rx="3" fill={TYRE} />
      <Wheel cx={60} cy={118} r={16} />
      <Wheel cx={96} cy={118} r={16} />
      <Wheel cx={222} cy={118} r={16} />
    </svg>
  );
}

export function BusArt({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 280 150" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="art">
      <ellipse cx="140" cy="134" rx="124" ry="6" fill="#102B50" opacity=".10" />
      <rect x="16" y="28" width="248" height="88" rx="14" fill={ORANGE} />
      <rect x="16" y="84" width="248" height="10" fill={NAVY} />
      {[30, 76, 122, 168].map((x) => (
        <rect key={x} x={x} y="40" width="38" height="30" rx="4" fill={GLASS} />
      ))}
      <rect x="216" y="40" width="36" height="50" rx="4" fill={GLASS} />
      <Wheel cx={66} cy={116} r={16} />
      <Wheel cx={214} cy={116} r={16} />
    </svg>
  );
}

/**
 * Hero fallback: a composed vehicle line-up on a branded panel.
 * Replace with real photography by adding photos (see README).
 */
export function HeroArt({ label }: { label: string }) {
  return (
    <div className="hero-art" role="img" aria-label={label}>
      <div className="hero-art__glow" />
      <div className="hero-art__road" />
      <div className="hero-art__truck"><TruckArt /></div>
      <div className="hero-art__car"><CarArt /></div>
      <div className="hero-art__scooter"><ScooterArt /></div>
    </div>
  );
}
