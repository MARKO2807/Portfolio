import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './About.css'

/** Renders a paragraph made of plain strings and `{ strong }` chunks. */
function RichParagraph({ parts }) {
  return (
    <p>
      {parts.map((part, i) => (typeof part === 'string' ? part : <strong key={i}>{part.strong}</strong>))}
    </p>
  )
}

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="about page-section" aria-labelledby="about-title">
      <div className="about-inner">
        <SectionTitle eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} titleId="about-title" />
        <div className="about-layout">
          <div className="about-visual">
            <div className="about-arch" aria-hidden="true" />
            <div className="about-photo-frame">
              <picture>
                <source srcSet="/images/marko-bare.webp" type="image/webp" />
                <img
                  className="about-photo"
                  src="/images/marko-bare.png"
                  width={400}
                  height={400}
                  alt={a.portraitAlt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
          <div className="about-content">
            <div className="about-panel">
              {a.paragraphs.map((parts, i) => (
                <RichParagraph key={i} parts={parts} />
              ))}
            </div>
          </div>
        </div>

        <div className="about-spotlights" aria-labelledby="about-spotlights-title">
          <div className="about-spotlights-head">
            <p className="about-spotlights-eyebrow">{a.approachEyebrow}</p>
            <h3 id="about-spotlights-title" className="about-spotlights-title">
              {a.approachTitle}
            </h3>
          </div>
          <ul className="about-spotlight-grid">
            {a.cards.map((card, index) => (
              <li key={card.key} className="about-spotlight">
                <span className="about-spotlight-glow" aria-hidden="true" />
                <span className="about-spotlight-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="about-spotlight-title">{card.title}</h4>
                <p className="about-spotlight-blurb">{card.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
