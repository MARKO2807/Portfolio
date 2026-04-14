import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Logo.css'

const LOGO_TEXT = 'MarkoBare'

export default function Logo({ as = 'div', className = '' }) {
  const Tag = as
  const [displayed, setDisplayed] = useState(LOGO_TEXT)
  const reduceMotionRef = useRef(false)
  const timeoutsRef = useRef([])

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mq.matches
    if (!mq.matches) {
      setDisplayed('')
    }
  }, [])

  useEffect(() => {
    if (reduceMotionRef.current) return

    let cancelled = false

    const clearAll = () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }

    const after = (ms, fn) => {
      const id = window.setTimeout(() => {
        if (cancelled) return
        fn()
      }, ms)
      timeoutsRef.current.push(id)
    }

    const runLoop = () => {
      let i = 0
      const typeNext = () => {
        if (cancelled) return
        if (i < LOGO_TEXT.length) {
          i += 1
          setDisplayed(LOGO_TEXT.slice(0, i))
          after(100, typeNext)
        } else {
          after(2000, deleteStart)
        }
      }

      const deleteStart = () => {
        let j = LOGO_TEXT.length
        const deleteNext = () => {
          if (cancelled) return
          if (j > 0) {
            j -= 1
            setDisplayed(LOGO_TEXT.slice(0, j))
            after(70, deleteNext)
          } else {
            after(800, runLoop)
          }
        }
        deleteNext()
      }

      typeNext()
    }

    runLoop()

    return () => {
      cancelled = true
      clearAll()
    }
  }, [])

  return (
    <Tag
      className={`logo ${className}`.trim()}
      style={{ '--logo-ch': String(LOGO_TEXT.length) }}
    >
      <span className="logo-bracket" aria-hidden="true">
        &lt;
      </span>
      <span className="logo-core">
        <span className="logo-core-inner">
          <span className="logo-core-text">{displayed}</span>
          <span className="logo-caret" aria-hidden="true" />
        </span>
      </span>
      <span className="logo-bracket logo-bracket--close" aria-hidden="true">
        <span className="logo-bracket-char">/</span>
        <span className="logo-bracket-char">&gt;</span>
      </span>
    </Tag>
  )
}
