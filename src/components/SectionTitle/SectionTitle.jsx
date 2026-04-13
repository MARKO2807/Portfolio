import './SectionTitle.css'

export default function SectionTitle({ eyebrow, title, subtitle, titleId }) {
  return (
    <header className="section-title">
      {eyebrow ? <p className="section-title-eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId} className="section-title-heading">
        {title}
      </h2>
      {subtitle ? <p className="section-title-sub">{subtitle}</p> : null}
    </header>
  )
}
