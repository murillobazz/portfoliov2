import { useState } from 'react';
import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

export function ContactPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('murillobazilio@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="contact">

      <div className="contact-grid">
        {/* Row 1 */}
        <div className="contact-row">
          <a
            className="contact-card"
            style={{ flex: 337 }}
            href="https://www.linkedin.com/in/murillobazilio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-card-label">linkedin</span>
          </a>
          <a
            className="contact-card"
            style={{ flex: 412 }}
            href="https://github.com/murillobazz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-card-label">github</span>
          </a>
        </div>

        {/* Row 2 */}
        <div className="contact-row">
          <a
            className="contact-card"
            style={{ flex: 472 }}
            href={tx.cvLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-card-label">resum&eacute;</span>
          </a>
          <button
            className="contact-card contact-card--email"
            style={{ flex: 277 }}
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
          <span className="contact-card-label">
            {(copied ? tx.emailCopiedCard : tx.emailMeCard).map((chunk, i, arr) => (
                <span key={i}>{chunk}{i < arr.length - 1 && <br />}</span>
              ))}
          </span>
          </button>
        </div>
      </div>

      <p className="contact-tagline">
        {tx.taglinePrefix}<em>{tx.taglineEm}</em>
      </p>
    </div>
  );
}
