import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import Logo from '../Logo/Logo.jsx'
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx'
import { cvUrl, dockNavIds, heroLocationHighlight, heroNameLines, socialLinks } from '../../data/siteConfig.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Hero.css'

const social = [
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
]

const HERO_EXTRA_SCROLL_PX = 10

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
  const [showHeroExtra, setShowHeroExtra] = useState(false)
  const [heroExtraInnerVisible, setHeroExtraInnerVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowHeroExtra(true)
      return undefined
    }

    const reveal = () => {
      if (window.scrollY > HERO_EXTRA_SCROLL_PX) {
        setShowHeroExtra(true)
        return true
      }
      return false
    }

    if (reveal()) return undefined

    const onScroll = () => {
      if (reveal()) {
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!showHeroExtra) {
      setHeroExtraInnerVisible(false)
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHeroExtraInnerVisible(true)
      return undefined
    }

    let innerRaf = 0
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setHeroExtraInnerVisible(true))
    })

    return () => {
      cancelAnimationFrame(outerRaf)
      if (innerRaf) cancelAnimationFrame(innerRaf)
    }
  }, [showHeroExtra])

  const openCv = () => {
    if (cvUrl && /^https?:\/\//i.test(cvUrl)) {
      window.open(cvUrl, '_blank', 'noopener,noreferrer')
    } else {
      scrollToSection('contact')
    }
  }

  const [line1, line2] = heroNameLines.length >= 2 ? heroNameLines : ['MARKO', 'BARE']

  return (
    <section id="home" className="hero page-section" aria-label={h.intro}>
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-gridlines" aria-hidden="true" />

      <div className="hero-cinematic">
        <button type="button" className="hero-brand" onClick={() => scrollToSection('home')} aria-label={h.home}>
          <Logo />
        </button>

        <LanguageToggle className="hero-lang" />

        <nav className="hero-dock" aria-label={h.shortcuts}>
          <ul className="hero-dock-list">
            {dockNavIds.map((id) => (
              <li key={id}>
                <button type="button" className="hero-dock-link" onClick={() => scrollToSection(id)}>
                  {t.dock[id]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hero-roleblock">
          <p className="hero-role-loc">
            {h.locationPrefix} <span className="hero-role-loc-highlight">{heroLocationHighlight}</span>
          </p>
        </div>

        <ul className="hero-dock-social" aria-label={h.social}>
          {social.map(({ key, href, label, Icon }) => (
            <li key={key}>
              <a className="hero-dock-social-link" href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hero-center">
          <div className="hero-halo" aria-hidden="true">
            <span className="hero-halo-ring hero-halo-ring--outer" />
            <span className="hero-halo-ring hero-halo-ring--inner" />
          </div>
          <div className="hero-center-inner">
            <h1 className="hero-nameblock">
              <span className="hero-name-line hero-name-line--soft">{line1}</span>{' '}
              <span className="hero-name-line hero-name-line--neon">{line2}</span>
            </h1>
            <p className="hero-tagline">
              <span className="hero-tagline-bracket hero-tagline-bracket--left" aria-hidden="true" />
              <span className="hero-tagline-text">{h.role}</span>
              <span className="hero-tagline-bracket hero-tagline-bracket--right" aria-hidden="true" />
            </p>
            <span className="hero-halo-scan" aria-hidden="true" />
          </div>
        </div>

        <button type="button" className="hero-scrollhint" onClick={() => scrollToSection('services')} aria-label={h.scrollHint}>
          <span className="hero-scrollhint-line" />
          <FiChevronDown className="hero-scrollhint-icon" aria-hidden="true" />
        </button>
      </div>

      {showHeroExtra ? (
        <div className="hero-extra">
          <div className={`hero-extra-inner${heroExtraInnerVisible ? ' hero-extra-inner--visible' : ''}`}>
            <div className="hero-extra-actions">
              <button type="button" className="hero-chip hero-chip--fill" onClick={() => scrollToSection('contact')}>
                {h.contactMe}
              </button>
              <button type="button" className="hero-chip hero-chip--ghost" onClick={openCv}>
                {h.downloadCv}
              </button>
            </div>
            <ul className="hero-stats" aria-label={h.highlights}>
              {h.stats.map((s) => (
                <li key={s.value} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </li>
              ))}
            </ul>
            <p className="hero-lede">{h.lede}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
