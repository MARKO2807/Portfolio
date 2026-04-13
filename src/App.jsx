import { lazy, Suspense, useEffect, useState } from 'react'
import Cursor from './components/Cursor/Cursor.jsx'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import RevealOnScroll from './components/RevealOnScroll/RevealOnScroll.jsx'
import './App.css'

const Skills = lazy(() => import('./components/Skills/Skills.jsx'))
const About = lazy(() => import('./components/About/About.jsx'))
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio.jsx'))
const Contact = lazy(() => import('./components/Contact/Contact.jsx'))
const Footer = lazy(() => import('./components/Footer/Footer.jsx'))

function SectionFallback() {
  return <div className="app-section-fallback" aria-hidden="true" />
}

export default function App() {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const threshold = () => Math.max(320, window.innerHeight * 0.7)

    const onScroll = () => {
      setPastHero(window.scrollY > threshold())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="app">
      <Cursor />
      <Header pastHero={pastHero} />
      <main id="main-content" className="app-main" tabIndex={-1}>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <RevealOnScroll stagger={0}>
            <Skills />
          </RevealOnScroll>
          <RevealOnScroll stagger={1}>
            <About />
          </RevealOnScroll>
          <RevealOnScroll stagger={2}>
            <Portfolio />
          </RevealOnScroll>
          <RevealOnScroll stagger={3}>
            <Contact />
          </RevealOnScroll>
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <RevealOnScroll stagger={1}>
          <Footer />
        </RevealOnScroll>
      </Suspense>
    </div>
  )
}
