import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Logo from '../Logo/Logo.jsx'
import { contactFooterInfo, navItems, socialLinks } from '../../data/siteConfig.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Footer.css'

const social = [
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Logo />
          <nav className="site-footer-nav" aria-label="Footer">
            <ul className="site-footer-nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button type="button" className="site-footer-nav-link" onClick={() => scrollToSection(item.id)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-social">
          {social.map(({ key, href, label, Icon }) => (
            <a key={key} className="site-footer-social-link" href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="site-footer-copy">Developed by Marko Bare</p>

        <div className="site-footer-contact">
          <a className="site-footer-contact-link" href={`mailto:${contactFooterInfo.email}`}>
            {contactFooterInfo.email}
          </a>
          <a className="site-footer-contact-link" href={`tel:${contactFooterInfo.phone.replace(/\s/g, '')}`}>
            {contactFooterInfo.phone}
          </a>
        </div>
      </div>
    </footer>
  )
}
