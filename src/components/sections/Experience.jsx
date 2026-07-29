import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Glass from '../ui/Glass'
import Magnetic from '../ui/Magnetic'
import Icon from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'
import { experience } from '../../data/portfolio'
import { scrollToId } from '../../lib/scroll'

const ease = [0.22, 1, 0.36, 1]

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="My journey so far."
          sub="From my first day of college to building full stack apps, and what comes next."
          center
        />

        <div className="timeline" ref={ref}>
          <div className="timeline__line">
            <motion.div className="timeline__fill" style={{ scaleY }} />
          </div>

          {experience.map((item, i) => {
            const fromLeft = i % 2 === 1
            return (
              <div className="tl-item" key={item.year + item.title}>
                <motion.span
                  className={`tl-item__dot ${item.current ? 'tl-item__dot--current' : ''}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                />

                <motion.div
                  className="tl-item__period"
                  initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease, delay: 0.15 }}
                >
                  <span className="tl-item__year">{item.year}</span>
                  <span className="tl-item__label">{item.label}</span>
                </motion.div>

                <Glass
                  className={`tl-card ${item.current ? 'tl-card--current' : ''}`}
                  tilt={4}
                  initial={{ opacity: 0, x: fromLeft ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <div className="tl-card__top">
                    <span className="tl-card__icon">
                      <Icon name={item.icon} size={20} />
                    </span>
                    {item.current && (
                      <span className="tl-now">
                        <span className="status__dot" />
                        Now
                      </span>
                    )}
                  </div>
                  <h3 className="tl-card__role">{item.title}</h3>
                  <p className="tl-card__company">{item.subtitle}</p>
                  <p>{item.description}</p>
                  <div className="tags">
                    {item.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {item.current && (
                    <Magnetic className="tl-card__cta" strength={0.3}>
                      <button className="btn btn--primary btn--sm" onClick={() => scrollToId('contact')}>
                        Let's talk
                        <span className="btn__icon">
                          <Icon name="arrowUpRight" size={16} />
                        </span>
                      </button>
                    </Magnetic>
                  )}
                </Glass>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
