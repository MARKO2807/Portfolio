import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import Logo from '../Logo/Logo.jsx'
import {
  cvUrl,
  dockNavItems,
  heroLocation,
  heroNameLines,
  heroRoleLine,
  heroStats,
  socialLinks,
} from '../../data/siteConfig.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Hero.css'

const social = [
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
]

export default function Hero() {
  const openCv = () => {
    if (cvUrl && /^https?:\/\//i.test(cvUrl)) {
      window.open(cvUrl, '_blank', 'noopener,noreferrer')
    } else {
      scrollToSection('contact')
    }
  }

  const [line1, line2] = heroNameLines.length >= 2 ? heroNameLines : ['MARKO', 'BARE']

  return (
    <section id="home" className="hero page-section" aria-label="Introduction">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-gridlines" aria-hidden="true" />

      <div className="hero-cinematic">
        <button type="button" className="hero-brand" onClick={() => scrollToSection('home')} aria-label="Home">
        
          <Logo />
        </button>

        <nav className="hero-dock" aria-label="Section shortcuts">
          <ul className="hero-dock-list">
            {dockNavItems.map((item) => (
              <li key={item.id}>
                <button type="button" className="hero-dock-link" onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hero-roleblock">
          <p className="hero-role-loc">
            {heroLocation.prefix}{' '}
            <span className="hero-role-loc-highlight">{heroLocation.highlight}</span>
          </p>
        </div>

        <ul className="hero-dock-social" aria-label="Social profiles">
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
            <div className="hero-nameblock" aria-labelledby="hero-line1">
              <p id="hero-line1" className="hero-name-line hero-name-line--soft">
                {line1}
              </p>
              <p className="hero-name-line hero-name-line--neon">{line2}</p>
            </div>
            <p className="hero-tagline">
              <span className="hero-tagline-bracket hero-tagline-bracket--left" aria-hidden="true" />
              <span className="hero-tagline-text">{heroRoleLine}</span>
              <span className="hero-tagline-bracket hero-tagline-bracket--right" aria-hidden="true" />
            </p>
            <span className="hero-halo-scan" aria-hidden="true" />
          </div>
        </div>

        <button type="button" className="hero-scrollhint" onClick={() => scrollToSection('services')} aria-label="Scroll to content">
          <span className="hero-scrollhint-line" />
          <FiChevronDown className="hero-scrollhint-icon" aria-hidden="true" />
        </button>
      </div>

      <div className="hero-extra">
        <div className="hero-extra-inner">
          <div className="hero-extra-actions">
            <button type="button" className="hero-chip hero-chip--fill" onClick={() => scrollToSection('contact')}>
              Contact Me
            </button>
            <button type="button" className="hero-chip hero-chip--ghost" onClick={openCv}>
              Download CV
            </button>
          </div>
          <ul className="hero-stats" aria-label="Highlights">
            {heroStats.map((s) => (
              <li key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="hero-lede">
            I develop modern websites and bring creative ideas to life online. The essence of web development is
            creating responsive, accessible, and visually captivating web applications. I focus on writing clean,
            efficient code and utilizing modern technologies to deliver flawless user experiences.
          </p>
        </div>
      </div>
    </section>
  )
}
