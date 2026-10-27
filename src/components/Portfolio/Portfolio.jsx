import { SiGithub } from 'react-icons/si'
import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import { socialLinks } from '../../data/siteConfig.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './Portfolio.css'

export default function Portfolio() {
  const { t } = useLanguage()
  const p = t.portfolio

  return (
    <section id="portfolio" className="portfolio page-section" aria-labelledby="portfolio-title">
      <div className="portfolio-inner">
        <SectionTitle eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} titleId="portfolio-title" />

        <div className="portfolio-main">
          <a className="portfolio-github" href={socialLinks.github} target="_blank" rel="noreferrer noopener">
            <span className="portfolio-github-icon" aria-hidden="true">
              <SiGithub />
            </span>
            <span className="portfolio-github-text">
              <span className="portfolio-github-label">{p.cta}</span>
              <span className="portfolio-github-sub">{p.ctaSub}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
