import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Glass from '../ui/Glass'
import Magnetic from '../ui/Magnetic'
import SplitText from '../ui/SplitText'
import Icon from '../ui/Icons'
import { profile } from '../../data/portfolio'
import { scrollToId } from '../../lib/scroll'

const ease = [0.22, 1, 0.36, 1]

// Each line is a list of [tokenClass, text] pairs.
const code = [
  [['tok-c', '// learning by building']],
  [['tok-k', 'const '], ['', 'developer'], ['tok-p', ' = '], ['tok-p', '{']],
  [['', '  name: '], ['tok-s', `'${profile.name}'`], ['', ',']],
  [['', '  college: '], ['tok-s', `'${profile.collegeShort}'`], ['', ',']],
  [['', '  stack: '], ['tok-p', '['], ['tok-s', "'React'"], ['', ', '], ['tok-s', "'Node'"], ['', ', '], ['tok-s', "'MongoDB'"], ['tok-p', ']'], ['', ',']],
  [['', '  graduating: '], ['tok-k', '2027'], ['', ',']],
  [['', '  openToInternships: '], ['tok-k', 'true'], ['', ',']],
  [['tok-p', '}']],
  [['', '']],
  [['tok-f', 'hire'], ['tok-p', '('], ['', 'developer'], ['tok-p', ')'], ['', '.'], ['tok-f', 'then'], ['tok-p', '('], ['', 'buildTogether'], ['tok-p', ')']],
]

const lineLengths = code.map((line) => line.reduce((n, [, t]) => n + t.length, 0))
const totalChars = lineLengths.reduce((a, b) => a + b, 0)

function TypedCode({ play }) {
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!play) return
    let n = 0
    const id = setInterval(() => {
      n += 2
      setTyped(Math.min(n, totalChars))
      if (n >= totalChars) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [play])

  let remaining = typed
  let caretPlaced = false

  return code.map((line, li) => {
    const lineBudget = Math.max(0, Math.min(remaining, lineLengths[li]))
    const lineDone = remaining >= lineLengths[li]
    remaining -= lineLengths[li]
    let budget = lineBudget
    const showCaret = !caretPlaced && (!lineDone || li === code.length - 1)
    if (showCaret) caretPlaced = true

    return (
      <div className="code-card__line" key={li}>
        <span className="code-card__ln">{li + 1}</span>
        <span>
          {line.map(([cls, text], ti) => {
            const part = text.slice(0, Math.max(0, budget))
            budget -= text.length
            return part ? (
              <span className={cls} key={ti}>
                {part}
              </span>
            ) : null
          })}
          {showCaret && <span className="caret" />}
        </span>
      </div>
    )
  })
}

function RoleRotator({ play }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [play])

  return (
    <span className="rotator">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          className="grad-text"
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const chips = [
  { cls: 'float-chip--1', label: 'React', color: '#22d3ee', delay: 0 },
  { cls: 'float-chip--2', label: 'Node + Express', color: '#34d399', delay: 1.2 },
  { cls: 'float-chip--3', label: 'MongoDB · SQL', color: '#f472b6', delay: 2.1 },
]

export default function Hero({ ready }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const shapesY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // liquid lens following the cursor
  const lx = useMotionValue(-400)
  const ly = useMotionValue(-400)
  const lensX = useSpring(lx, { stiffness: 60, damping: 18, mass: 1 })
  const lensY = useSpring(ly, { stiffness: 60, damping: 18, mass: 1 })

  const onMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect()
    lx.set(e.clientX - r.left)
    ly.set(e.clientY - r.top)
  }

  const show = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, ease, delay },
  })

  return (
    <section id="home" className="hero" ref={sectionRef} onMouseMove={onMove}>
      {/* colourful shapes for the glass to refract */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', y: shapesY }} aria-hidden="true">
        <motion.div
          className="hero__shape hero__sphere"
          animate={{ y: [0, -24, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__shape hero__ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="hero__shape hero__pill"
          animate={{ y: [0, 20, 0], rotate: [-12, -4, -12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <Glass
        className="hero__lens"
        live
        spotlight={false}
        style={{ x: lensX, y: lensY }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease, delay: 1 }}
        aria-hidden="true"
      />

      <div className="container hero__grid">
        <motion.div className="hero__content" style={{ y: textY, opacity: fade }}>
          <Glass as="div" className="status" spotlight={false} {...show(0.1)}>
            <span className="status__dot" />
            {profile.statusText}
          </Glass>

          <motion.p className="hero__hello mono" {...show(0.2)}>
            {'<hello world />'} I’m
          </motion.p>

          <h1 className="hero__title">
            <SplitText text={profile.name} play={ready} delay={0.25} stagger={0.12} />
          </h1>

          <motion.div className="hero__role" {...show(0.55)}>
            <span className="hero__role-prefix">I’m a</span>
            <RoleRotator play={ready} />
          </motion.div>

          <motion.p className="hero__tagline" {...show(0.7)}>
            {profile.tagline}
          </motion.p>

          <div className="hero__actions">
            <Magnetic>
              <motion.button className="btn btn--primary" onClick={() => scrollToId('projects')} {...show(0.85)}>
                View my work
                <span className="btn__icon">
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </motion.button>
            </Magnetic>
            <Magnetic>
              <Glass as="button" className="btn" liquid onClick={() => scrollToId('contact')} {...show(0.95)}>
                Hire me
                <span className="btn__icon">
                  <Icon name="mail" size={18} />
                </span>
              </Glass>
            </Magnetic>
            {/* appears once profile.resumeUrl points at a real file */}
            {profile.resumeUrl && profile.resumeUrl !== '#' && (
              <Magnetic>
                <Glass as="a" href={profile.resumeUrl} download className="btn" liquid {...show(1)}>
                  Download CV
                  <span className="btn__icon">
                    <Icon name="download" size={18} />
                  </span>
                </Glass>
              </Magnetic>
            )}
          </div>

          <motion.div className="hero__socials" {...show(1.05)}>
            <span className="hero__socials-line" />
            {profile.socials.map((s) => (
              <Magnetic key={s.label} strength={0.5}>
                <Glass as="a" href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="icon-btn" aria-label={s.label} spotlight={false}>
                  <Icon name={s.icon} size={18} />
                </Glass>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" style={{ y: visualY }}>
          <Glass
            className="code-card"
            liquid
            tilt={10}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.3, ease, delay: 0.6 }}
          >
            <div className="code-card__bar">
              <i />
              <i />
              <i />
              <span className="code-card__file">developer.js</span>
            </div>
            <div className="code-card__body">
              <TypedCode play={ready} />
            </div>
          </Glass>

          {chips.map((c) => (
            <Glass
              key={c.label}
              className={`float-chip ${c.cls}`}
              spotlight={false}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1, y: [0, -14, 0] } : {}}
              transition={{
                opacity: { duration: 0.6, delay: 1.4 + c.delay * 0.2 },
                scale: { duration: 0.6, delay: 1.4 + c.delay * 0.2, ease },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: c.delay },
              }}
            >
              <span className="float-chip__dot" style={{ background: c.color, boxShadow: `0 0 12px ${c.color}` }} />
              {c.label}
            </Glass>
          ))}
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Scroll to about section"
      >
        <span className="hero__mouse">
          <span />
        </span>
        Scroll
      </motion.button>
    </section>
  )
}
