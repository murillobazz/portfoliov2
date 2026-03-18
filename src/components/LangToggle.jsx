export default function LangToggle({ lang, onToggle }) {
  return (
    <button className="lang-toggle" onClick={onToggle} aria-label="Toggle language">
      {lang === 'en' ? 'pt' : 'en'}
    </button>
  );
}