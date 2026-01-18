import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Glass from './ui/Glass'
import Magnetic from './ui/Magnetic'
import Icon from './ui/Icons'
import useActiveSection from '../hooks/useActiveSection'
import { navLinks, profile } from '../data/portfolio'
import { getLenis, scrollToId } from '../lib/scroll'

const ids = navLinks.map((l) => l.id)
const ease = [0.22, 1, 0.36, 1]

export default function Navbar({ ready }) {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // lock scrolling while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id) => {
    setOpen(false)
    // let the menu start closing before scrolling
    setTimeout(() => scrollToId(id), open ? 250 : 0)
  }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={ready ? { y: 0 } : { y: -100 }}
        transition={{ duration: 1, ease, delay: 0.5 }}
      >
        <Glass as="nav" className="nav__bar" liquid spotlight={false} aria-label="Primary">
          <button className="nav__logo" onClick={() => go('home')} aria-label="Back to top">
            <span className="nav__logo-mark">{profile.initials}</span>
            {profile.name}
          </button>

          <ul className="nav__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                  onClick={() => go(link.id)}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav__pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <Magnetic className="nav__cta">
            <button className="btn btn--primary btn--sm" onClick={() => go('contact')}>
              Let’s talk
            </button>
          </Magnetic>

          <button
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </Glass>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 44px)' }}
            animate={{ clipPath: 'circle(150% at 92% 44px)' }}
            exit={{ clipPath: 'circle(0% at 92% 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="mobile-menu__links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                >
                  <button className="mobile-menu__link" onClick={() => go(link.id)}>
                    <small>0{i + 1}</small>
                    <span className={active === link.id ? 'grad-text' : ''}>{link.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mobile-menu__foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="icon-btn lg" aria-label={s.label}>
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
