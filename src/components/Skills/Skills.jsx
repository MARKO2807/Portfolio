import { SiAnthropic, SiCss, SiHtml5, SiJavascript, SiReact, SiWordpress } from 'react-icons/si'
import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import SkillCard from '../SkillCard/SkillCard.jsx'
import CursorBrandIcon from '../icons/CursorBrandIcon.jsx'
import { extraTools, skills } from '../../data/siteConfig.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
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
  cursor: CursorBrandIcon,
}

export default function Skills() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <section className="skills page-section" aria-labelledby="services-title" id="services">
      <div className="skills-inner">
        <SectionTitle eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} titleId="services-title" />

        <div className="skills-rows">
          <div className="skills-row">
            <div className="skills-row-track skills-row-track--3">
              {skills.map((item) => (
                <SkillCard key={item.key} icon={coreIcons[item.key]} title={item.title} description={s.items[item.key]} />
              ))}
            </div>
          </div>

          <div className="skills-row">
            <div className="skills-row-track skills-row-track--4">
              {extraTools.map((item) => (
                <SkillCard key={item.key} icon={stackIcons[item.key]} title={item.title} description={s.items[item.key]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
