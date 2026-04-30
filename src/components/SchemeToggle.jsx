import { useState } from 'react';

const HINT_KEY = 'scheme-toggle-used';

const ICONS = {
  // base — paint bucket (fill with base solarized palette)
  base: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c0 1.1.9 2 2 2h.5a2 2 0 0 0 1.8-1.1L19 4 14 0 3.3 16.4A2 2 0 0 0 3 17.5V21z"/>
      <line x1="14" y1="1" x2="19" y2="6"/>
      <path d="M20 16s1 1 1 2-1 2-1 2" strokeLinecap="round"/>
    </svg>
  ),
  // wine — goblet / warm red
  wine: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l-1 8a5 5 0 0 1-6 0L8 2z"/>
      <line x1="12" y1="15" x2="12" y2="20"/>
      <line x1="8" y1="20" x2="16" y2="20"/>
    </svg>
  ),
  // midnight — moon / dark & golden
  midnight: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  // chalk — circle half-filled (contrast)
  chalk: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>
    </svg>
  ),
  // forest — leaf
  forest: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5.5 6.5-3 9 2 1 4 1 5 0 .5 2-1 6-7 6z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
    </svg>
  ),
};

export function SchemeToggle({ scheme = 'base', onToggle }) {
  const [used, setUsed] = useState(() => !!localStorage.getItem(HINT_KEY));

  const handleClick = () => {
    if (!used) {
      localStorage.setItem(HINT_KEY, '1');
      setUsed(true);
    }
    onToggle();
  };

  return (
    <button
      className={`theme-toggle${!used ? ' scheme-toggle--hint' : ''}`}
      onClick={handleClick}
      aria-label="Change color scheme"
    >
      {ICONS[scheme] ?? ICONS.base}
    </button>
  );
}
