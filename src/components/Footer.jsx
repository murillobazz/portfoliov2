import LangToggle from './LangToggle';
import { SchemeToggle } from './SchemeToggle';
import t from '../utils/translations';

export function Footer({ scheme, onSchemeToggle, lang, onLangToggle }) {
  return (
    <footer className="site-footer">
      <span className="site-footer-text">
        murillo bazilio
        <span className="site-footer-rule" aria-hidden="true" />
        {t[lang].footerNote}
      </span>
      <div className="site-footer-toggles">
        <SchemeToggle scheme={scheme} onToggle={onSchemeToggle} />
        <LangToggle lang={lang} onToggle={onLangToggle} />
      </div>
    </footer>
  );
}
