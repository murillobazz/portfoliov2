import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

function withMoneriLink(text) {
  const parts = text.split('moneri');
  return parts.map((part, i) =>
    i < parts.length - 1 ? (
      <span key={i}>{part}<a href="https://moneri.com.br" target="_blank" rel="noopener noreferrer">moneri</a></span>
    ) : part
  );
}

function renderBio(lines) {
  const arr = Array.isArray(lines) ? lines : [lines];
  return arr.map((line, i) => (
    <p key={i} className="about-bio" style={{margin : 0, padding: '0 0 12px 0'}}>{withMoneriLink(line)}</p>
  ));
}

export function AboutPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

  return (
    <div className="about">

      {/* ── Lead bio ── */}
      <div className="about-bio">
        <span className="about-col-label">{tx.aboutLabel}</span>
        {renderBio(tx.about)}
      </div>

      {/* ── Work + Study columns ── */}
      <div className="about-columns">
        <section className="about-col about-col--work">
          <span className="about-col-label">{tx.workLabel}</span>
          <p className="about-col-main">{withMoneriLink(tx.workMain)}</p>
          <ul className="about-col-list">
            {tx.workItems.map((item, i) => <span key={i}>{item}</span>)}
          </ul>
        </section>

        <section className="about-col about-col--study">
          <span className="about-col-label">{tx.studyLabel}</span>
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
