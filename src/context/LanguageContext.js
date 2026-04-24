import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);

export function useLanguageContext() {
  return useContext(LanguageContext);
}
