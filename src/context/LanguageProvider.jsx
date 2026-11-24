import React, { useState, useEffect, useMemo } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../utils/translations';
import { LanguageContext } from './languageStore';

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('wf_portfolio_lang');
      return LANGUAGES.some((l) => l.code === saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('wf_portfolio_lang', lang);
    } catch {
      // Ignore storage failures in restricted browsing modes
    }
  }, [lang]);

  const value = useMemo(() => {
    const langMeta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const cycleLang = () => {
      const idx = LANGUAGES.findIndex((l) => l.code === lang);
      const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
      setLang(next.code);
    };
    return { lang, setLang, cycleLang, langMeta, t };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
