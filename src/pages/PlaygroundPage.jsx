import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { RichText } from '../components/RichText';
import { GapField } from '../components/GapField';
import { BreakMySite } from '../components/BreakMySite';

export function PlaygroundPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="playground">
      <p className="about-bio">{tx.playgroundIntro}</p>

      {/* ── Mind the gap ── */}
      <section className="pg-section">
        <span className="about-col-label">{tx.gapLabel}</span>
        <p className="pg-text"><RichText text={tx.gapIntro} /></p>
        <GapField
          labels={{
            design: tx.gapDesign,
            code: tx.gapCode,
            crossings: tx.gapCrossings,
            aria: tx.gapAria,
          }}
        />
      </section>

      {/* ── Break my site ── */}
      <section className="pg-section">
        <span className="about-col-label">{tx.breakLabel}</span>
        <p className="pg-text"><RichText text={tx.breakIntro} /></p>
        <BreakMySite tx={tx} lang={lang} />
      </section>

      <p className="pg-footnote">{tx.playgroundPong}</p>
    </div>
  );
}
