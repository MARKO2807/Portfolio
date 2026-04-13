import './SkillCard.css'

export default function SkillCard({ icon: Icon, title, description }) {
  return (
    <article className="skill-card">
      <div className="skill-card-icon" aria-hidden="true">
        <Icon />
      </div>
      <div className="skill-card-body">
        <h3 className="skill-card-title">{title}</h3>
        <p className="skill-card-desc">{description}</p>
      </div>
    </article>
  )
}
