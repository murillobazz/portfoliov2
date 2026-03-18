import { useEffect, useState } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    localStorage.setItem('lang', lang);
  }, [lang]);

  return [lang, setLang];
}