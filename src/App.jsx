import './App.css';
import LangToggle from './components/LangToggle';
import { MonogramLogo } from './components/MonogramLogo';
import { Row } from './components/Row';
import { ThemeToggle } from './components/ThemeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { useLanguage } from './hooks/useLanguage';
import t from './utils/translations';

function App() {
  const [dark, setDark] = useDarkMode();
  const [lang, setLang] = useLanguage();
  const tx = t[lang];

  return (
    <div className="page">
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <LangToggle lang={lang} onToggle={() => setLang(l => l === 'en' ? 'pt' : 'en')} />
      <header className="site-header">
        <MonogramLogo />
        <h1 className="site-name">murillobazz</h1>
        <p className="site-tagline">
          {tx.taglinePrefix}<em>{tx.taglineEm}</em>
        </p>
      </header>

      <main className="card">
        <Row label={tx.aboutLabel} delay={80}>
          <p>{tx.about}</p>
        </Row>

        <Row label={tx.workLabel} delay={150}>
          <p>{tx.workMain}</p>
          <ul>
            {tx.workItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Row>

        <Row label={tx.projectsLabel} delay={210}>
          <p>
            <a href="#" className="text-link">behired</a>
            {' '}{tx.projectsMain}
          </p>
          <ul>
            {tx.projectsItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Row>

        <Row label={tx.studyLabel} delay={270}>
          {tx.studyItems.map((item, i) => <p key={i}>{item}</p>)}
        </Row>

        <Row label={tx.whatsupLabel} delay={330}>
          <p>
            {tx.whatsupLines.map((line, i) => (
              <span key={i}>{line}{i < tx.whatsupLines.length - 1 && <br />}</span>
            ))}
          </p>
        </Row>

        <Row label={tx.quoteLabel} delay={390}>
          <p>{tx.quoteText} &mdash; <em>{tx.quoteAuthor}</em></p>
        </Row>
      </main>

      <footer className="site-footer">
        <nav className="socials">
          <a href={tx.cvLink}>cv</a>
          <a href="https://github.com/murillobazz">github</a>
          <a href="https://www.linkedin.com/in/murillobazilio/">linkedin</a>
          <a href="mailto:murillobazilio@gmail.com">{tx.emailMe}</a>
        </nav>
        <p className="footer-name">murillobazz</p>
        <p className="footer-note">{tx.footerNote}</p>
      </footer>
    </div>
  )
}

export default App
