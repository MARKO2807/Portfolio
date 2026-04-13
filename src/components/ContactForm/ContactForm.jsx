import './ContactForm.css'

export default function ContactForm() {
  return (
    <div className="contact-form-wrap">
      <form
        className="contact-form"
        name="contact"
        method="POST"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="contact-form-honey">
          <label>
            Don&apos;t fill this out if you&apos;re human:
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="contact-form-row">
          <label className="contact-form-field">
            <span className="contact-form-label">First name</span>
            <input className="contact-form-input" type="text" name="firstName" required autoComplete="given-name" />
          </label>
          <label className="contact-form-field">
            <span className="contact-form-label">Last name</span>
            <input className="contact-form-input" type="text" name="lastName" required autoComplete="family-name" />
          </label>
        </div>
        <div className="contact-form-row">
          <label className="contact-form-field">
            <span className="contact-form-label">Email</span>
            <input className="contact-form-input" type="email" name="email" required autoComplete="email" />
          </label>
          <label className="contact-form-field">
            <span className="contact-form-label">Phone</span>
            <input className="contact-form-input" type="tel" name="phone" autoComplete="tel" />
          </label>
        </div>
        <label className="contact-form-field">
          <span className="contact-form-label">Subject</span>
          <input className="contact-form-input" type="text" name="subject" autoComplete="off" />
        </label>
        <label className="contact-form-field">
          <span className="contact-form-label">Message</span>
          <textarea className="contact-form-textarea" name="message" rows={5} required />
        </label>
        <div className="contact-form-actions">
          <button className="contact-form-submit" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
