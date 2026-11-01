import { useCallback, useEffect, useState } from 'react';
import { contrast, toHex6 } from '../utils/contrast';

const COLOR_TOKENS = ['--bg', '--card-bg', '--text', '--text-h'];
const FONT_TOKENS = ['--display', '--sans'];
// Tokens derived from the ones above, so hover states and borders follow along
const DERIVED_TOKENS = ['--card-bg-hover', '--border'];
const ALL_TOKENS = [...COLOR_TOKENS, ...FONT_TOKENS, ...DERIVED_TOKENS];

const FONTS = [
  { name: 'gasoek one', value: "'Gasoek One', sans-serif" },
  { name: 'geist', value: "'Geist', sans-serif" },
  { name: 'eb garamond', value: "'EB Garamond', serif" },
  { name: 'dm sans', value: "'DM Sans', sans-serif" },
  { name: 'mono', value: 'ui-monospace, Consolas, monospace' },
  { name: 'comic sans', value: "'Comic Sans MS', 'Comic Neue', cursive" },
];

// [foreground, background, label key]
const PAIRS = [
  ['--text', '--bg', 'pairTextBg'],
  ['--text', '--card-bg', 'pairTextCard'],
  ['--text-h', '--bg', 'pairHeadBg'],
  ['--text-h', '--card-bg', 'pairHeadCard'],
];

const AA = 4.5;

// Lime, hot pink, yellow, orange and comic sans: fails every single pair on purpose
const PASSION = {
  '--bg': '#ccff00',
  '--card-bg': '#ff33cc',
  '--text': '#ffff00',
  '--text-h': '#ff6600',
  '--display': "'Comic Sans MS', 'Comic Neue', cursive",
  '--sans': "'Comic Sans MS', 'Comic Neue', cursive",
};

// First family of a font stack, normalized: "'Gasoek One', sans-serif" → "gasoek one"
function firstFamily(stack) {
  return stack.split(',')[0].replace(/['"]/g, '').trim().toLowerCase();
}

function readTokens() {
  const styles = getComputedStyle(document.documentElement);
  const values = {};
  COLOR_TOKENS.forEach(tok => { values[tok] = toHex6(styles.getPropertyValue(tok)); });
  FONT_TOKENS.forEach(tok => {
    const current = firstFamily(styles.getPropertyValue(tok));
    const match = FONTS.find(f => firstFamily(f.value) === current);
    values[tok] = match ? match.value : FONTS[1].value;
  });
  return values;
}

function clearOverrides() {
  ALL_TOKENS.forEach(tok => document.documentElement.style.removeProperty(tok));
  document.documentElement.removeAttribute('data-passion');
}

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
}

function formatRatio(ratio, lang) {
  const n = ratio.toFixed(2);
  return `${lang === 'pt' ? n.replace('.', ',') : n}:1`;
}

// Every new fine gets its own ticket number, like a real one
let lastTicket = 100 + Math.floor(Math.random() * 900);

// Pairs that keep failing keep their ticket; new failures get a new one
function judge(values, prevTickets) {
  const tickets = {};
  PAIRS.forEach(([fg, bg, key]) => {
    const pass = contrast(values[fg], values[bg]) >= AA;
    tickets[key] = pass ? null : (prevTickets[key] ?? ++lastTicket);
  });
  return tickets;
}

export function BreakMySite({ tx, lang }) {
  const [board, setBoard] = useState(() => {
    const initial = readTokens();
    return { values: initial, tickets: judge(initial, {}) };
  });
  const [dirty, setDirty] = useState(false);
  const [passion, setPassion] = useState(false);
  const { values, tickets } = board;

  const apply = (next) => {
    setBoard({ values: next, tickets: judge(next, tickets) });
    setDirty(true);
  };

  const fix = useCallback(() => {
    clearOverrides();
    const initial = readTokens();
    setBoard({ values: initial, tickets: judge(initial, {}) });
    setDirty(false);
    setPassion(false);
  }, []);

  // Passion mode also gets a WordArt shadow on the page title (see App.css)
  useEffect(() => {
    if (passion) document.documentElement.setAttribute('data-passion', '');
    else document.documentElement.removeAttribute('data-passion');
  }, [passion]);

  // Push overrides to the root element so the whole site follows
  useEffect(() => {
    if (!dirty) return;
    const root = document.documentElement.style;
    Object.entries(values).forEach(([tok, v]) => root.setProperty(tok, v));
    root.setProperty('--card-bg-hover', `color-mix(in srgb, ${values['--card-bg']} 88%, ${values['--text-h']})`);
    root.setProperty('--border', values['--text']);
  }, [values, dirty]);

  // Switching color scheme mid-chaos starts over from the new scheme
  useEffect(() => {
    const observer = new MutationObserver(fix);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-scheme'] });
    return () => observer.disconnect();
  }, [fix]);

  // Leaving the playground always puts the site back together
  useEffect(() => clearOverrides, []);

  const set = (tok, v) => apply({ ...values, [tok]: v });

  const chaos = () => {
    const pick = () => FONTS[Math.floor(Math.random() * FONTS.length)].value;
    setPassion(false);
    apply({
      '--bg': randomHex(),
      '--card-bg': randomHex(),
      '--text': randomHex(),
      '--text-h': randomHex(),
      '--display': pick(),
      '--sans': pick(),
    });
  };

  const designIsMyPassion = () => {
    setPassion(true);
    apply(PASSION);
  };

  const results = PAIRS.map(([fg, bg, key]) => {
    const ratio = contrast(values[fg], values[bg]);
    return { fg, bg, key, ratio, pass: ratio >= AA, ticket: tickets[key] };
  });
  const fines = results.filter(r => !r.pass).length;

  let verdict = tx.policeClean;
  if (fines === 1) verdict = tx.policeOne;
  if (fines > 1) verdict = tx.policeMany.replace('{n}', fines);

  return (
    <div className="pg-break">
      {/* Worn-ink texture for the fine stamps: noise punches holes in the stamp's alpha */}
      <svg className="pg-defs" aria-hidden="true" focusable="false">
        <filter id="pg-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.6"
            result="holes"
          />
          <feComposite in="SourceGraphic" in2="holes" operator="in" />
        </filter>
      </svg>

      <div className="pg-controls">
        <span className="pg-group-label">{tx.breakColors}</span>
        {COLOR_TOKENS.map(tok => (
          <label key={tok} className="pg-token">
            <input
              type="color"
              value={values[tok]}
              onChange={e => set(tok, e.target.value)}
            />
            <code className="pg-token-name">{tok}</code>
            <span className="pg-token-value">{values[tok]}</span>
          </label>
        ))}

        <span className="pg-group-label">{tx.breakFonts}</span>
        {FONT_TOKENS.map(tok => (
          <label key={tok} className="pg-token">
            <code className="pg-token-name">{tok}</code>
            <select
              className="pg-select"
              value={values[tok]}
              onChange={e => set(tok, e.target.value)}
            >
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </label>
        ))}

        <div className="pg-actions">
          <button type="button" className="pg-button" onClick={chaos}>{tx.breakChaos}</button>
          <button type="button" className="pg-button pg-button--passion" onClick={designIsMyPassion}>design is my passion</button>
          {/* The escape hatch ignores the tokens on purpose, so it stays findable mid-chaos */}
          <button type="button" className="pg-button pg-button--fix" onClick={fix} disabled={!dirty}>{tx.breakFix}</button>
        </div>
      </div>

      <div className="pg-police" aria-live="polite">
        <span className="pg-group-label">{tx.policeLabel}</span>
        <ul className="pg-pairs">
          {results.map(r => (
            <li key={r.key} className={`pg-pair${r.pass ? '' : ' pg-pair--fail'}`}>
              <span
                className="pg-swatch"
                style={{ color: values[r.fg], background: values[r.bg] }}
                aria-hidden="true"
              >
                Aa
              </span>
              <span className="pg-pair-label">{tx[r.key]}</span>
              <span className="pg-ratio">{formatRatio(r.ratio, lang)}</span>
              {r.pass ? (
                <span key="ok" className="pg-stamp">ok</span>
              ) : (
                // Keyed by ticket so a new fine stamps again
                <span key={r.ticket} className="pg-stamp pg-stamp--fine">
                  {tx.policeFine}
                  <span className="pg-stamp-no">{tx.policeNo} {String(r.ticket).padStart(4, '0')}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="pg-verdict">{verdict}</p>
      </div>
    </div>
  );
}
