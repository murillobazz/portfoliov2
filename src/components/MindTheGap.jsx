import { useState } from 'react';

const HINT_KEY = 'gap-hint-used';

// "minding the gap": hover (or tap) and the words slide apart like subway doors,
// revealing what lives in the gap. Until the first interaction, the doors twitch
// and two notes pop up one after the other, like the door chime, as a hint.
export function MindTheGap({ text, reveal }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(() => !!localStorage.getItem(HINT_KEY));

  const markUsed = () => {
    if (used) return;
    localStorage.setItem(HINT_KEY, '1');
    setUsed(true);
  };

  // "minding the" is the left door, the last word is the right one
  const lastSpace = text.lastIndexOf(' ');
  const left = text.slice(0, lastSpace);
  const right = text.slice(lastSpace + 1);

  return (
    <button
      type="button"
      className={`gap${open ? ' gap--open' : ''}${used ? '' : ' gap--hint'}`}
      aria-label={`${text}: ${reveal}`}
      aria-pressed={open}
      onMouseEnter={markUsed}
      onFocus={markUsed}
      onClick={() => { markUsed(); setOpen(o => !o); }}
    >
      <span className="gap-door gap-door--left" aria-hidden="true">{left}</span>
      <span className="gap-notes" aria-hidden="true">
        <span className="gap-note gap-note--1">♪</span>
        <span className="gap-note gap-note--2">♪</span>
      </span>
      <span className="gap-reveal" aria-hidden="true">
        <span className="gap-reveal-clip">
          <span className="gap-reveal-text">{reveal}</span>
        </span>
      </span>
      <span className="gap-door gap-door--right" aria-hidden="true">{right}</span>
    </button>
  );
}
