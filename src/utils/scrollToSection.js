export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const wide = window.matchMedia('(min-width: 900px)').matches
  const offset = wide ? 16 : 12
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
