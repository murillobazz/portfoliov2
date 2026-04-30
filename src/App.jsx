import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { PageHeader } from './components/PageHeader';
import { LanguageContext } from './context/LanguageContext';
import { useColorScheme } from './hooks/useColorScheme';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const [scheme, cycleScheme] = useColorScheme();
  const [lang, setLang] = useLanguage();

  return (
    <LanguageContext.Provider value={[lang, setLang]}>
    <div className="page">
      <PageHeader />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer
        scheme={scheme}
        onSchemeToggle={cycleScheme}
        lang={lang}
        onLangToggle={() => setLang(l => l === 'en' ? 'pt' : 'en')}
      />
    </div>
    </LanguageContext.Provider>
  );
}

export default App;

