import { useEffect, useState } from 'react';

export const SCHEMES = ['base', 'wine', 'midnight', 'chalk', 'forest'];

export function useColorScheme() {
  const [scheme, setScheme] = useState(() => {
    const saved = localStorage.getItem('color-scheme');
    return SCHEMES.includes(saved) ? saved : 'base';
  });

  useEffect(() => {
    if (scheme === 'base') {
      document.documentElement.removeAttribute('data-scheme');
    } else {
      document.documentElement.setAttribute('data-scheme', scheme);
    }
    localStorage.setItem('color-scheme', scheme);
  }, [scheme]);

  const cycle = () => {
    setScheme(s => {
      const idx = SCHEMES.indexOf(s);
      return SCHEMES[(idx + 1) % SCHEMES.length];
    });
  };

  return [scheme, cycle];
}
