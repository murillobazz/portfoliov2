import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PageHeader } from './components/PageHeader';
import { PortfolioPage } from './components/PortfolioPage';
import { LanguageContext } from './context/LanguageContext';
import { useDarkMode } from './hooks/useDarkMode';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const [dark, setDark] = useDarkMode();
  const [lang, setLang] = useLanguage();

  return (
    <LanguageContext.Provider value={[lang, setLang]}>
    <div className="page">
      <PageHeader />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer
        dark={dark}
        onDarkToggle={() => setDark(d => !d)}
        lang={lang}
        onLangToggle={() => setLang(l => l === 'en' ? 'pt' : 'en')}
      />
    </div>
    </LanguageContext.Provider>
  );
}

export default App;

