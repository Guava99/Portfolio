import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Glass from '../ui/Glass'
import Icon from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'
import { profile, projects } from '../../data/portfolio'

const ease = [0.22, 1, 0.36, 1]
const githubUrl = profile.socials.find((s) => s.icon === 'github')?.href ?? '#'

// filter tabs
function useFilters() {
  return useMemo(() => {
    const counts = {}
    projects.forEach((p) => p.tech.forEach((t) => (counts[t] = (counts[t] || 0) + 1)))
    const popular = Object.entries(counts)
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => t)
    return ['All', 'Featured', ...popular]
  }, [])
}

function Preview({ project }) {
  const [a, b] = project.gradient
  return (
    <a
      className="project__preview"
      href={project.live}
      target="_blank"
      rel="noreferrer"
      data-cursor="View"
      aria-label={`Open ${project.title}`}
    >
      <div className="project__art" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
        <div className="project__glow" />
        <div className="project__window">
          <div className="project__dots">
            <i />
            <i />
            <i />
          </div>
          <div className="project__ui">
            <div className="project__ui-side">
              <div className="sk" style={{ height: 10, width: '70%' }} />
              <div className="sk" style={{ height: 8 }} />
              <div className="sk" style={{ height: 8, width: '80%' }} />
              <div className="sk" style={{ height: 8, width: '60%' }} />
            </div>
            <div className="project__ui-main">
              <div className="sk sk--accent" style={{ height: 14, width: '50%', background: `${a}aa` }} />
              <div className="project__ui-cards">
                <div className="sk" style={{ height: 38 }} />
                <div className="sk" style={{ height: 38 }} />
                <div className="sk" style={{ height: 38 }} />
              </div>
              <div className="sk" style={{ flex: 1, minHeight: 40, background: `linear-gradient(120deg, ${a}55, ${b}33)` }} />
            </div>
          </div>
        </div>
        <span className="project__letter">{project.title.charAt(0)}</span>
      </div>
    </a>
  )
}

export default function Projects() {
  const filters = useFilters()
  const [filter, setFilter] = useState('All')

  const visible = projects.filter((p) =>
    filter === 'All' ? true : filter === 'Featured' ? p.featured : p.tech.includes(filter),
  )

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Things I’ve built."
          sub="Projects I’ve designed and developed while learning — with more on the way."
        />

        {projects.length >= 3 && (
        <Glass
          className="filters"
          spotlight={false}
          role="tablist"
          aria-label="Filter projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="filter__pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </Glass>
        )}

        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <Glass
                as="article"
                key={p.title}
                layout
                tilt={5}
                className={`project ${p.featured && filter === 'All' ? 'project--featured' : ''}`}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
              >
                <Preview project={p} />
                <div className="project__body">
                  <div className="project__meta">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="project__title">{p.title}</h3>
                  <p className="project__desc">{p.description}</p>
                  <div className="tags">
                    {p.tech.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project__links">
                    <a className="project__link" href={p.live} target="_blank" rel="noreferrer">
                      Live demo <Icon name="arrowUpRight" size={15} />
                    </a>
                    <a className="project__link" href={p.code} target="_blank" rel="noreferrer">
                      <Icon name="github" size={15} /> Source
                    </a>
                  </div>
                </div>
              </Glass>
            ))}

            <Glass
              as="a"
              key="more"
              layout
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-more"
              data-cursor="GitHub"
              tilt={5}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="project-more__icon">
                <Icon name="github" size={28} />
              </span>
              <h3>
                Want to see
                <br />
                <span className="grad-text">more work?</span>
              </h3>
              <p>Practice projects, experiments and everything I’m currently building live on my GitHub.</p>
              <span className="project-more__cta">
                Browse GitHub <Icon name="arrowUpRight" size={16} />
              </span>
            </Glass>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
