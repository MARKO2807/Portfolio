import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const frame = useRef(0)
  const dotEl = useRef(null)
  const ringEl = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return undefined

    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const loop = () => {
      const t = target.current
      const kd = 0.32
      const kr = 0.14
      dotPos.current.x += (t.x - dotPos.current.x) * kd
      dotPos.current.y += (t.y - dotPos.current.y) * kd
      ringPos.current.x += (t.x - ringPos.current.x) * kr
      ringPos.current.y += (t.y - ringPos.current.y) * kr

      const dx = dotPos.current.x
      const dy = dotPos.current.y
      const rx = ringPos.current.x
      const ry = ringPos.current.y

      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(loop)
    }

    frame.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div className="cursor-root" aria-hidden="true">
      <div ref={ringEl} className="cursor-ring" />
      <div ref={dotEl} className="cursor-dot" />
    </div>
  )
}
