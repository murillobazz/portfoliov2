import { useLanguageContext } from '../context/LanguageContext';
import t from '../utils/translations';

export function ContactPage() {
  const [lang] = useLanguageContext();
  const tx = t[lang];

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
          <a
            className="contact-card contact-card--email"
            style={{ flex: 277 }}
            href="mailto:murillobazilio@gmail.com"
          >
            <span className="contact-card-label">em<br />ail<br />me<br />:)</span>
          </a>
        </div>
      </div>

      <p className="contact-tagline">
        product-minded developer, creative tech enthusiast
      </p>
    </div>
  );
}
