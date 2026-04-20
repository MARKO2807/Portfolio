import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import ContactForm from '../ContactForm/ContactForm.jsx'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact page-section" aria-labelledby="contact-title">
      <div className="contact-inner">
        <SectionTitle
          eyebrow="Let’s talk"
          title="Contact me"
          subtitle="I’m in a full-time role, but I’m always happy to hear from you — questions, ideas, or a quick hello."
          titleId="contact-title"
        />
        <div className="contact-layout">
          <p className="contact-intro">
            If something here resonated with you, drop a message. I read every message and reply as soon as I
            can.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
