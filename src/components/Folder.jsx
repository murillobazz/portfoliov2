// The folder from the work page, with an optional symbol for each case on its front
const FOLDER_PATH =
  'M248.32 3.3705C251.032 3.3705 253.231 5.79828 253.231 8.79311V194.577C253.231 197.572 251.032 200 248.32 200L4.91154 177.75C2.19897 177.75 2.63695e-08 175.322 0 172.328L6.13774e-05 8.79311C6.3065e-05 5.79828 2.19903 3.3705 4.9116 3.3705L135.504 11.741C137.997 9.74975 159.469 1.09171e-08 162.182 0L248.32 3.3705Z';

const SYMBOLS = {
  // design system: a 2×2 grid of components, one of them a circle
  components: (
    <g>
      <rect x="82" y="58" width="40" height="40" rx="6" />
      <rect x="132" y="58" width="40" height="40" rx="6" />
      <rect x="82" y="108" width="40" height="40" rx="6" />
      <circle cx="152" cy="128" r="20" />
    </g>
  ),
  // enjoy rio: the happy face from the emotion wheel
  emotion: (
    <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
      <circle cx="127" cy="103" r="46" />
      <path d="M105 92c3-6 11-6 14 0M135 92c3-6 11-6 14 0" />
      <path d="M106 115c10 14 32 14 42 0" />
    </g>
  ),
  // brand page: the creator's coupon
  coupon: (
    <g>
      <path d="M72 70h110a8 8 0 0 1 8 8v12a14 14 0 0 0 0 28v12a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-12a14 14 0 0 0 0-28V78a8 8 0 0 1 8-8z" />
      <g fill="none" stroke="var(--text)" strokeWidth="7" strokeLinecap="round">
        <path d="M110 126l34-44" />
        <circle cx="111" cy="88" r="7" />
        <circle cx="143" cy="121" r="7" />
      </g>
    </g>
  ),
};

export function Folder({ symbol, className = '' }) {
  return (
    <svg
      className={`folder ${className}`}
      viewBox="0 0 254 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={FOLDER_PATH} fill="currentColor" />
      {symbol && <g className="folder-symbol">{SYMBOLS[symbol]}</g>}
    </svg>
  );
}
