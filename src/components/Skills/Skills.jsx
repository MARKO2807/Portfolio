import { SiAnthropic, SiCss, SiHtml5, SiJavascript, SiReact, SiWordpress } from 'react-icons/si'
import { RiCursorLine } from 'react-icons/ri'
import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import SkillCard from '../SkillCard/SkillCard.jsx'
import { extraTools, skills } from '../../data/siteConfig.js'
import './Skills.css'

const coreIcons = {
  html: SiHtml5,
  css: SiCss,
  js: SiJavascript,
}

const stackIcons = {
  react: SiReact,
  wp: SiWordpress,
  claude: SiAnthropic,
  cursor: RiCursorLine,
}

export default function Skills() {
  return (
    <section className="skills page-section" aria-labelledby="services-title" id="services">
      <div className="skills-inner">
        <SectionTitle
          eyebrow="What I do"
          title="Skillset"
          subtitle="Foundation stack in one row, then the tools and frameworks I reach for every day."
          titleId="services-title"
        />

        <div className="skills-rows">
          <div className="skills-row">
            <div className="skills-row-track skills-row-track--3">
              {skills.map((s) => (
                <SkillCard key={s.key} icon={coreIcons[s.key]} title={s.title} description={s.description} />
              ))}
            </div>
          </div>

          <div className="skills-row">
            <div className="skills-row-track skills-row-track--4">
              {extraTools.map((s) => (
                <SkillCard key={s.key} icon={stackIcons[s.key]} title={s.title} description={s.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
