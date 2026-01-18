import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import Glass from '../ui/Glass'
import Icon from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'
import { about, profile, services, stats } from '../../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease, delay },
})

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || typeof value !== 'number') return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  if (typeof value !== 'number') {
    return (
      <span ref={ref} className="stat__value">
        <span className="grad-text">{value}</span>
      </span>
    )
  }

  return (
    <span ref={ref} className="stat__value">
      {n}
      <span className="grad-text">{suffix}</span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title="A student developer who loves to build."
          sub="Engineering student by day, full stack builder by night — learning by shipping real projects."
        />

        <div className="about__grid">
          <Glass className="profile" tilt={6} {...rise(0)}>
            <div className="avatar">
              <span className="avatar__glow" />
              <span className="avatar__ring" />
              <span className="avatar__core">
                <span className="grad-text">{profile.initials}</span>
              </span>
            </div>
            <div>
              <h3 className="profile__name">{profile.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>{profile.role}</p>
            </div>
            <div className="profile__meta">
              <div className="profile__row">
                <span>
                  <Icon name="mapPin" size={16} /> Based in
                </span>
                <span>{profile.location}</span>
              </div>
              <div className="profile__row">
                <span>
                  <Icon name="graduation" size={16} /> College
                </span>
                <span>{profile.collegeShort}</span>
              </div>
              <div className="profile__row">
                <span>
                  <Icon name="clock" size={16} /> Batch
                </span>
                <span>{profile.batch}</span>
              </div>
              <div className="profile__row">
                <span>
                  <Icon name="sparkle" size={16} /> Status
                </span>
                <span style={{ color: '#34d399' }}>{profile.statusText}</span>
              </div>
            </div>
          </Glass>

          <Glass className="about__text" {...rise(0.12)}>
            <p className="about__lead">{about.heading}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="about__highlights">
              {about.highlights.map((h, i) => (
                <motion.div
                  className="highlight"
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }}
                >
                  <h4>{h.title}</h4>
                  <p>{h.text}</p>
                </motion.div>
              ))}
            </div>
          </Glass>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Glass className="stat" key={s.label} tilt={8} {...rise(i * 0.08)}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="stat__label">{s.label}</p>
            </Glass>
          ))}
        </div>

        <div className="services">
          {services.map((s, i) => (
            <Glass
              className="service"
              key={s.title}
              {...rise(i * 0.1)}
              whileHover={{ y: -8 }}
            >
              <motion.span
                className="service__icon"
                whileHover={{ rotate: 12, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              >
                <Icon name={s.icon} size={22} />
              </motion.span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  )
}
