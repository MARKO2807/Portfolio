import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import './About.css'

const portraitSrc = '/images/marko-bare.png'

const aboutApproachCards = [
  {
    key: 'a11y',
    title: 'Accessibility-first',
    blurb:
      'Semantic structure, keyboard paths, and contrast so interfaces work for everyone.',
  },
  {
    key: 'craft',
    title: 'Craft in the details',
    blurb:
      'Micro-interactions, spacing, and performance tuning that people feel more than they name.',
  },
  {
    key: 'ship',
    title: 'Iterate and ship',
    blurb: 'Small releases, tight feedback loops, and pragmatic tools over chasing every new trend.',
  },
]

export default function About() {
  return (
    <section id="about" className="about page-section" aria-labelledby="about-title">
      <div className="about-inner">
        <SectionTitle
          eyebrow="Profile"
          title="About me"
          subtitle="A little background, what I care about, and how I like to work."
          titleId="about-title"
        />
        <div className="about-layout">
          <div className="about-visual">
            <div className="about-arch" aria-hidden="true" />
            <div className="about-photo-frame">
              <img
                className="about-photo"
                src={portraitSrc}
                width={420}
                height={520}
                sizes="(max-width: 899px) min(100vw, 280px), 300px"
                alt="Marko Bare — portrait"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
          </div>
          <div className="about-content">
            <div className="about-panel">
              <p>
                Hey, I&apos;m <strong>Marko Bare</strong> — a kinesiologist turned web developer. I believe technology
                should feel intuitive and accessible, so I build interfaces that look sharp and feel seamless. Coding is
                the sweet spot between creativity and problem-solving: I enjoy finding clever ways to blend design with
                functionality.
              </p>
              <p>
                I like turning complex ideas into clean, user-friendly layouts that still perform well. Whether it is
                refining micro-interactions, tightening accessibility, or optimizing how a page loads, I am always
                hunting for small upgrades that make the whole experience better.
              </p>
              <p>
               Outside of work, I play chess, stay active with fitness, and explore new tools including AI-assisted workflows with 
               Cursor and Claude, which keeps me thinking strategically and adapting quickly. 
               I am currently employed full time, and I still enjoy meeting other builders, exchanging ideas, and staying curious 
               about what is next on the web.
              </p>
            </div>
          </div>
        </div>

        <div className="about-spotlights" aria-labelledby="about-spotlights-title">
          <div className="about-spotlights-head">
            <p className="about-spotlights-eyebrow">Approach</p>
            <h3 id="about-spotlights-title" className="about-spotlights-title">
              How I like to build
            </h3>
          </div>
          <ul className="about-spotlight-grid">
            {aboutApproachCards.map((card, index) => (
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
