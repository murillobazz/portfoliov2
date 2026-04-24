import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

export function AboutPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="about">

      {/* ── Lead bio ── */}
      <p className="about-bio">{tx.about}</p>

      {/* ── Work + Study columns ── */}
      <div className="about-columns">
        <section className="about-col about-col--work">
          <span className="about-col-label">work</span>
          <p className="about-col-main">{tx.workMain}</p>
          <ul className="about-col-list">
            {tx.workItems.map((item, i) => <span key={i}>{item}</span>)}
          </ul>
        </section>

        <section className="about-col about-col--study">
          <span className="about-col-label">study</span>
          {tx.studyItems.map((item, i) => (
            <p key={i} className="about-col-main">{item}</p>
          ))}
        </section>
      </div>

      {/* ── What's up ── */}
      <section className="about-whatsup">
        <span className="about-col-label">{tx.whatsupLabel}</span>
        <ol className="about-whatsup-list">
          {tx.whatsupLines.map((line, i) => (
            <li key={i} className="about-whatsup-item">
              <span className="about-whatsup-text">{line}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Quote ── */}
      <blockquote className="about-quote">
        <p className="about-quote-text">{tx.quoteText}</p>
        <cite className="about-quote-cite">&mdash; {tx.quoteAuthor}</cite>
      </blockquote>
    </div>
  );
}
