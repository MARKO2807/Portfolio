import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import Logo from '../Logo/Logo.jsx'
import { contactFooterInfo, navIds, socialLinks } from '../../data/siteConfig.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './Footer.css'

const social = [
  { key: 'linkedin', href: socialLinks.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'github', href: socialLinks.github, label: 'GitHub', Icon: FaGithub },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Logo />
          <nav className="site-footer-nav" aria-label={t.footer.nav}>
            <ul className="site-footer-nav-list">
              {navIds.map((id) => (
                <li key={id}>
                  <button type="button" className="site-footer-nav-link" onClick={() => scrollToSection(id)}>
                    {t.nav[id]}
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

        <p className="site-footer-copy">{t.footer.credit}</p>

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
