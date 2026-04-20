import { useEffect, useState } from 'react'
import { Lenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { clearLenisInstance, setLenisInstance } from '../../utils/lenisInstance.js'

const easeOutExpo = (t) => Math.min(1, 1.001 - 2 ** (-10 * t))

const lenisOptions = {
  duration: 1.85,
  easing: easeOutExpo,
  lerp: 0.055,
  smoothWheel: true,
  wheelMultiplier: 0.78,
  touchMultiplier: 0.88,
  syncTouch: false,
  infinite: false,
  autoRaf: true,
  anchors: { duration: 1.8, easing: easeOutExpo },
  stopInertiaOnNavigate: true,
}

function LenisInstanceBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) setLenisInstance(lenis)
    return () => {
      clearLenisInstance()
    }
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!enabled) {
    return children
  }

  return (
    <Lenis root options={lenisOptions}>
      <LenisInstanceBridge />
      {children}
    </Lenis>
  )
}
