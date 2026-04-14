import { useEffect, useRef, useState } from 'react'
import './ContactForm.css'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.focus()
    }
  }, [status])

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')

    try {
      const body = new URLSearchParams(new FormData(form)).toString()
      const res = await fetch(form.action || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error('Submit failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-wrap">
        <div
          ref={successRef}
          className="contact-form-success"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <span className="contact-form-success-glow" aria-hidden="true" />
          <p className="contact-form-success-eyebrow">Delivered</p>
          <h3 className="contact-form-success-title">Thanks — your message is in.</h3>
          <p className="contact-form-success-text">
            I read every note and will get back when I can. If your inbox is picky, check spam for a reply.
          </p>
          <button type="button" className="contact-form-success-cta" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form-wrap">
      <form
        className="contact-form"
        name="contact"
        method="POST"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="contact-form-honey">
          <label>
            Don&apos;t fill this out if you&apos;re human:
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        {status === 'error' ? (
          <p className="contact-form-error" role="alert">
            Something went wrong. Please try again in a moment, or email me directly.
          </p>
        ) : null}
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
          <button className="contact-form-submit" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}
