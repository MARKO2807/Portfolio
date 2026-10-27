import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Logo from '../Logo/Logo.jsx'
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import { navIds } from '../../data/siteConfig.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Header.css'

export default function Header({ pastHero }) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('site-nav-open', menuOpen)
    return () => document.body.classList.remove('site-nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (pastHero) setMenuOpen(false)
  }, [pastHero])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const go = (id) => {
    scrollToSection(id)
    closeMenu()
  }

  return (
    <>
      <header className={`site-header ${pastHero ? 'site-header--docked' : 'site-header--ghost'}`}>
        <div className="site-header-inner">
          <button type="button" className="site-header-logo-btn" onClick={() => go('home')} aria-label={t.header.goHome}>
            <Logo />
          </button>
  
          <nav className="site-header-nav" aria-label={t.header.primary}>
            <ul className="site-header-list">
              {navIds.map((id) => (
                <li key={id}>
                  <button type="button" className="site-header-link" onClick={() => scrollToSection(id)}>
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
  
          <div className="site-header-actions">
            <ThemeToggle />
            <LanguageToggle />
            <button type="button" className="site-header-hire" onClick={() => go('contact')}>
              {t.header.contactMe}
            </button>
            <button
              type="button"
              className="site-header-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            >
              {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sibling of <header>: its backdrop-filter would otherwise trap this fixed panel inside the header box */}
      <div
        id="site-mobile-nav"
        className={`site-header-mobile ${menuOpen ? 'site-header-mobile--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <ul className="site-header-mobile-list">
          {navIds.map((id) => (
            <li key={id}>
              <button type="button" className="site-header-mobile-link" onClick={() => go(id)}>
                {t.nav[id]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
