import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Glass from './ui/Glass'
import Magnetic from './ui/Magnetic'
import Icon from './ui/Icons'
import { navLinks, profile } from '../data/portfolio'
import { scrollToId } from '../lib/scroll'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const fill = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}% 100%, 100% 100%`)
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <motion.div className="footer__big" style={{ backgroundSize: fill, x }} aria-hidden="true">
          Let's talk.
        </motion.div>

        <Glass className="footer__bar" spotlight={false}>
          <span>
            © {new Date().getFullYear()} {profile.name}. Made with React.
          </span>
          <nav className="footer__links" aria-label="Footer">
            {navLinks.slice(1, 5).map((l) => (
              <button key={l.id} onClick={() => scrollToId(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>
          <Magnetic strength={0.5}>
            <Glass as="button" className="icon-btn" onClick={() => scrollToId('home')} aria-label="Back to top" liquid>
              <Icon name="arrowUp" size={18} />
            </Glass>
          </Magnetic>
        </Glass>
      </div>
    </footer>
  )
}
