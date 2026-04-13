import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Logo from '../Logo/Logo.jsx'
import { navItems } from '../../data/siteConfig.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Header.css'

export default function Header({ pastHero }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('site-nav-open', menuOpen)
    return () => document.body.classList.remove('site-nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (pastHero) setMenuOpen(false)
  }, [pastHero])

  const closeMenu = () => setMenuOpen(false)

  const go = (id) => {
    scrollToSection(id)
    closeMenu()
  }

  const hire = () => {
    scrollToSection('contact')
    closeMenu()
  }

  return (
    <header className={`site-header ${pastHero ? 'site-header--docked' : 'site-header--ghost'}`}>
      <div className="site-header-inner">
        <button type="button" className="site-header-logo-btn" onClick={() => go('home')} aria-label="Go to home">
          <Logo />
        </button>

        <nav className="site-header-nav" aria-label="Primary">
          <ul className="site-header-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button type="button" className="site-header-link" onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header-actions">
          <button type="button" className="site-header-hire" onClick={hire}>
            Contact Me
          </button>
          <button
            type="button"
            className="site-header-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="site-mobile-nav"
        className={`site-header-mobile ${menuOpen ? 'site-header-mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="site-header-mobile-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button type="button" className="site-header-mobile-link" onClick={() => go(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
