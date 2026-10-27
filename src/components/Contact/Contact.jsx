import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import ContactForm from '../ContactForm/ContactForm.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section id="contact" className="contact page-section" aria-labelledby="contact-title">
      <div className="contact-inner">
        <SectionTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} titleId="contact-title" />
        <p className="contact-intro">{c.intro}</p>
        <ContactForm />
      </div>
    </section>
  )
}
