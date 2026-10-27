import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { LANGS } from '../../i18n/translations.js'
import './LanguageToggle.css'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={`lang-toggle ${className}`.trim()} role="group" aria-label={t.lang.label}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-toggle-btn${code === lang ? ' lang-toggle-btn--active' : ''}`}
          aria-pressed={code === lang}
          lang={code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
