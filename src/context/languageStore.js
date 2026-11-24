import { createContext, useContext } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../utils/translations';

export const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  cycleLang: () => {},
  langMeta: LANGUAGES[0],
  t: TRANSLATIONS.en
});

export function useLanguage() {
  return useContext(LanguageContext);
}
