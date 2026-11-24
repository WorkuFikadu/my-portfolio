import React from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGES } from '../utils/translations';
import { useLanguage } from '../context/languageStore';

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, cycleLang, langMeta } = useLanguage();

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycleLang}
        className="nav-lang-cycle-btn"
        title={`Language: ${langMeta.label} (Click to switch EN / OM / AM / AR)`}
        aria-label={`Switch portfolio language (current: ${langMeta.label})`}
      >
        <Languages size={14} />
        <span>{langMeta.short}</span>
      </button>
    );
  }

  return (
    <div className="lang-switcher-group" role="group" aria-label="Select portfolio language">
      <Languages size={14} className="lang-group-icon" />
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLang(item.code)}
          className={`lang-pill-btn ${lang === item.code ? 'active' : ''}`}
          title={item.label}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}
