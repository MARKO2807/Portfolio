import { SiGithub } from 'react-icons/si'
import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import { socialLinks } from '../../data/siteConfig.js'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio page-section" aria-labelledby="portfolio-title">
      <div className="portfolio-inner">
        <SectionTitle
          eyebrow="Work"
          title="Portfolio"
          subtitle="Projects and experiments live on GitHub — visit the profile below for repos, snippets, and ongoing work."
          titleId="portfolio-title"
        />

        <div className="portfolio-main">
          <a className="portfolio-github" href={socialLinks.github} target="_blank" rel="noreferrer noopener">
            <span className="portfolio-github-icon" aria-hidden="true">
              <SiGithub />
            </span>
            <span className="portfolio-github-text">
              <span className="portfolio-github-label">Visit my GitHub</span>
              <span className="portfolio-github-sub">More repos, experiments, and code.</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
