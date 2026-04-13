import { useEffect, useRef, useState } from 'react'
import './RevealOnScroll.css'

export default function RevealOnScroll({ children, className = '', as: Tag = 'div', stagger = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const s = Math.max(0, Math.min(8, stagger))

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          ob.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -2% 0px' },
    )

    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()} data-stagger={String(s)}>
      {children}
    </Tag>
  )
}
