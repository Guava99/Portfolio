import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import GlassFilters from './components/GlassFilters'
import Background from './components/Background'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { getLenis, setLenis } from './lib/scroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const finishLoading = useCallback(() => setLoading(false), [])

  // smooth scroll
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    setLenis(lenis)

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
    if (loading) {
      window.scrollTo(0, 0)
      getLenis()?.stop()
    } else {
      getLenis()?.start()
    }
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <GlassFilters />
      <Background />
      <Cursor />

      <AnimatePresence>{loading && <Loader onDone={finishLoading} />}</AnimatePresence>

      <ScrollProgress />
      <Navbar ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
