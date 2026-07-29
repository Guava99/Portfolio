import { motion } from 'framer-motion'
import Glass from '../ui/Glass'
import Icon from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'
import { skillGroups, techStack } from '../../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

// short names for the badges
const MARKS = {
  JavaScript: 'JS',
  React: 'Re',
  'Node.js': 'N',
  'Express.js': 'Ex',
  REST: 'API',
  Authentication: 'Auth',
  MongoDB: 'M',
  Queries: 'Q',
  Git: 'Git',
  GitHub: 'GH',
  'VS Code': 'VS',
  'Command line': '>_',
}

const mark = (name) => {
  if (MARKS[name]) return MARKS[name]
  if (/^[A-Z]{2,4}$/.test(name)) return name
  const caps = name.replace(/[^A-Z]/g, '')
  return caps.length >= 2 ? caps.slice(0, 2) : name.slice(0, 2)
}

function Marquee({ items, reverse }) {
  // repeat the list so one group is always wider than the screen
  const filled = [...items, ...items]
  const group = (hidden) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {filled.map((t, i) => (
        <span className="chip" key={i}>
          <i />
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <div className={`marquee__row ${reverse ? 'marquee__row--reverse' : ''}`}>
      {group(false)}
      {group(true)}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="My toolkit."
          sub="The technologies I use to build full stack web apps, from frontend to database."
        />

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <Glass
              className="skill-card"
              key={group.title}
              tilt={4}
              style={{ '--accent': group.accent }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: (gi % 2) * 0.1 }}
            >
              <div className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon name={group.icon ?? 'code'} size={22} />
                </span>
                <div className="skill-card__heading">
                  <h3 className="skill-card__title">{group.title}</h3>
                  <p className="skill-card__blurb">{group.blurb}</p>
                </div>
                <span className="skill-card__count">
                  {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              <div className="skill-tiles">
                {group.skills.map((skill, si) => (
                  <motion.div
                    className="skill-tile"
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ y: -3 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + si * 0.06 }}
                  >
                    <span className="skill-tile__mark">{mark(skill)}</span>
                    <span className="skill-tile__name">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </Glass>
          ))}
        </div>

        <Glass
          className="marquee"
          spotlight={false}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <Marquee items={techStack} />
          <Marquee items={[...techStack].reverse()} reverse />
        </Glass>
      </div>
    </section>
  )
}
