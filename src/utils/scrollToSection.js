import { getLenisInstance } from './lenisInstance.js'

const easeOutExpo = (t) => Math.min(1, 1.001 - 2 ** (-10 * t))

export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return

  const wide = window.matchMedia('(min-width: 900px)').matches
  const offset = wide ? 16 : 12
  const lenis = getLenisInstance()

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -offset,
      duration: 1.78,
      easing: easeOutExpo,
    })
    return
  }

  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
  window.scrollTo({ top, behavior: 'smooth' })
}
