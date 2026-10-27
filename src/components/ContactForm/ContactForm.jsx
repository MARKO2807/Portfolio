import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './ContactForm.css'

const PROMPT = 'PS C:\\Users\\guest>'

/** Field order doubles as the Enter-to-advance order. Names must match the static Netlify form in index.html. */
const FIELDS = [
  { name: 'firstName', type: 'text', required: true, autoComplete: 'given-name' },
  { name: 'lastName', type: 'text', required: true, autoComplete: 'family-name' },
  { name: 'email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', type: 'tel', required: false, autoComplete: 'tel' },
  { name: 'subject', type: 'text', required: false, autoComplete: 'off' },
  { name: 'message', type: 'textarea', required: true },
]

function TerminalWindow({ title, controls, children, onBodyClick }) {
  return (
    <div className="term">
      <div className="term-titlebar">
        <div className="term-tab">
          <span className="term-tab-icon" aria-hidden="true">
            &gt;_
          </span>
          <span className="term-tab-title">{title}</span>
          <span className="term-tab-close" aria-hidden="true">
            ×
          </span>
        </div>
        <span className="term-newtab" aria-hidden="true">
          +
        </span>
        <div className="term-controls" aria-hidden="true">
          <span className="term-control" title={controls.min}>
            <svg viewBox="0 0 10 10"><path d="M0 5h10" /></svg>
          </span>
          <span className="term-control" title={controls.max}>
            <svg viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" /></svg>
          </span>
          <span className="term-control term-control--close" title={controls.close}>
            <svg viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10" /></svg>
          </span>
        </div>
      </div>
      {/* Clicking empty terminal space focuses the next field, like a real shell */}
      <div className="term-body" onClick={onBodyClick}>
        {children}
      </div>
    </div>
  )
}

function PromptLine({ children }) {
  return (
    <p className="term-line">
      <span className="term-ps">{PROMPT}</span> {children}
    </p>
  )
}

export default function ContactForm() {
  const { t } = useLanguage()
  const f = t.form
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
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

  function focusField(index) {
    const name = FIELDS[index]?.name
    if (name) formRef.current?.elements.namedItem(name)?.focus()
  }

  function handleKeyDown(event, index) {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return
    const isTextarea = FIELDS[index].type === 'textarea'

    if (isTextarea) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault()
        formRef.current?.requestSubmit()
      }
      return
    }

    event.preventDefault()
    if (event.currentTarget.checkValidity()) focusField(index + 1)
    else event.currentTarget.reportValidity()
  }

  function handleBodyClick(event) {
    if (event.target !== event.currentTarget && !event.target.classList.contains('term-line')) return
    const form = formRef.current
    if (!form) return
    const firstEmpty = FIELDS.findIndex(({ name }) => !form.elements.namedItem(name)?.value)
    focusField(firstEmpty === -1 ? FIELDS.length - 1 : firstEmpty)
  }

  if (status === 'success') {
    return (
      <TerminalWindow title={f.windowTitle} controls={f.windowControls}>
        <PromptLine>
          <span className="term-cmd">{f.command}</span>
        </PromptLine>
        {f.successLines.map((line) => (
          <p key={line} className="term-line term-muted">
            {line}
          </p>
        ))}
        <div ref={successRef} className="term-success" role="status" aria-live="polite" tabIndex={-1}>
          <p className="term-line term-ok">✔ {f.successTitle}</p>
          <p className="term-line term-muted">{f.successText}</p>
        </div>
        <PromptLine>
          <button type="button" className="term-btn" onClick={() => setStatus('idle')}>
            {f.again}
          </button>
        </PromptLine>
      </TerminalWindow>
    )
  }

  const submitting = status === 'submitting'

  return (
    <TerminalWindow title={f.windowTitle} controls={f.windowControls} onBodyClick={handleBodyClick}>
      <p className="term-line term-muted">Windows PowerShell</p>
      <p className="term-line term-muted term-gap">Copyright (C) Marko Bare.</p>
      <PromptLine>
        <span className="term-cmd">{f.command}</span>
      </PromptLine>
      <p className="term-line term-comment term-gap"># {f.banner}</p>

      <form
        ref={formRef}
        className="term-form"
        name="contact"
        method="POST"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="term-honey">
          <label>
            {f.honeypot}
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        {FIELDS.map((field, index) => {
          const isTextarea = field.type === 'textarea'
          const Control = isTextarea ? 'textarea' : 'input'
          return (
            <label key={field.name} className={`term-field${isTextarea ? ' term-field--multi' : ''}`}>
              <span className="term-label">
                <span className="term-q" aria-hidden="true">
                  ?
                </span>{' '}
                {f[field.name]}{' '}
                <span className="term-hint">
                  ({field.required ? f.required : f.optional}
                  {isTextarea ? <span className="term-hint-keys">, {f.messageHint}</span> : null})
                </span>
                <span className="term-colon" aria-hidden="true">
                  :
                </span>
              </span>
              <Control
                className="term-input"
                name={field.name}
                required={field.required}
                autoComplete={field.autoComplete}
                spellCheck={isTextarea}
                {...(isTextarea ? { rows: 3 } : { type: field.type })}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={submitting}
              />
            </label>
          )
        })}

        {status === 'error' ? (
          <p className="term-line term-err" role="alert">
            {f.error}
          </p>
        ) : null}

        <PromptLine>
          <button className="term-btn term-btn--primary" type="submit" disabled={submitting}>
            {submitting ? f.submitting : `${f.submit} ⏎`}
          </button>
          {submitting ? <span className="term-spinner" aria-hidden="true" /> : null}
        </PromptLine>
      </form>
    </TerminalWindow>
  )
}
