import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';
import { RichText } from '../components/RichText';

export function AboutPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="about">

      {/* ── Lead bio ── */}
      <div className="about-bio">
        <span className="about-col-label">{tx.aboutLabel}</span>
        <p className="about-facts"><RichText text={tx.aboutFacts} /></p>
        {tx.about.map((line, i) => <p key={i}><RichText text={line} /></p>)}
      </div>

      {/* ── Work + Study columns ── */}
      <div className="about-columns">
        <section className="about-col about-col--work">
          <span className="about-col-label">{tx.workLabel}</span>
          <p className="about-col-main"><RichText text={tx.workMain} /></p>
          <ul className="about-col-list">
            {tx.workItems.map((item, i) => <li key={i}><RichText text={item} /></li>)}
          </ul>
        </section>

        <section className="about-col about-col--study">
          <span className="about-col-label">{tx.studyLabel}</span>
          {tx.studyItems.map((item, i) => (
            <p key={i} className="about-col-main"><RichText text={item} /></p>
          ))}
        </section>
      </div>

      {/* ── What's up ── */}
      <section className="about-whatsup">
        <span className="about-col-label">{tx.whatsupLabel}</span>
        <ol className="about-whatsup-list">
          {tx.whatsupLines.map((line, i) => (
            <li key={i} className="about-whatsup-item">
              <span className="about-whatsup-text"><RichText text={line} /></span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Quote ── */}
      <section className="about-whatsup">
        <span className="about-col-label">{tx.quoteLabel}</span>
        <blockquote className="about-quote">
          <p className="about-quote-text">{tx.quoteText}</p>
          <cite className="about-quote-cite">&mdash; {tx.quoteAuthor}</cite>
        </blockquote>
      </section>
    </div>
  );
}
