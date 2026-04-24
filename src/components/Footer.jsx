import LangToggle from './LangToggle';
import { ThemeToggle } from './ThemeToggle';

export function Footer({ dark, onDarkToggle, lang, onLangToggle }) {
  return (
    <footer className="site-footer">
      <span className="site-footer-text">
        murillo bazilio
        <span className="site-footer-rule" aria-hidden="true" />
        dev &amp; design &amp; &hellip;
      </span>
      <div className="site-footer-toggles">
        <ThemeToggle dark={dark} onToggle={onDarkToggle} />
        <LangToggle lang={lang} onToggle={onLangToggle} />
      </div>
    </footer>
  );
}
