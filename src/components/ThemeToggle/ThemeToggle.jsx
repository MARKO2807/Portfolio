import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './ThemeToggle.css'

const STORAGE_KEY = 'theme'
const THEME_COLORS = { dark: '#050005', light: '#fbf6f9' }

/** Initial theme is applied by the inline script in index.html (no flash); this keeps it in sync. */
function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function ThemeToggle({ className = '' }) {
  const { t } = useLanguage()
  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    // Several toggles exist (header + hero); keep them all in sync
    const observer = new MutationObserver(() => setTheme(currentTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next])
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={isLight ? t.theme.toDark : t.theme.toLight}
      title={isLight ? t.theme.toDark : t.theme.toLight}
    >
      {isLight ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
    </button>
  )
}
