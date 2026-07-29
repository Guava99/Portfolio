import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Glass from '../ui/Glass'
import Magnetic from '../ui/Magnetic'
import Icon from '../ui/Icons'
import SplitText from '../ui/SplitText'
import { profile } from '../../data/portfolio'

const ease = [0.22, 1, 0.36, 1]
const topics = ['Internship', 'Freelance project', 'Collaboration', 'Just saying hi']

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <Glass
          className="toast"
          liquid
          spotlight={false}
          role="status"
          initial={{ opacity: 0, y: 40, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="toast__icon">
            <Icon name="check" size={15} strokeWidth={3} />
          </span>
          {message}
        </Glass>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [topic, setTopic] = useState(topics[0])
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 3200)
    return () => clearTimeout(id)
  }, [toast])

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setToast('Email copied to clipboard')
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // no backend for this yet, just opens the mail app
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${topic} — message from ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} <${form.email}>`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setToast('Opening your mail app…')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="container contact__grid">
        <div>
          <Glass
            className="eyebrow"
            spotlight={false}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="eyebrow__dot" />
            05 — Contact
          </Glass>

          <h2 className="contact__title">
            <SplitText text="Let’s build something" />{' '}
            <SplitText text="remarkable." className="split--grad" delay={0.2} />
          </h2>

          <motion.p
            className="contact__lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            Hiring interns, have a project in mind or just want to connect? I’m actively looking for
            internship opportunities and would love to hear from you.
          </motion.p>

          <div className="contact__cards">
            <Glass
              as="button"
              className="contact-item"
              onClick={copyEmail}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
            >
              <span className="contact-item__icon">
                <Icon name="mail" />
              </span>
              <span>
                <span className="contact-item__label">Email</span>
                <br />
                <span className="contact-item__value">{profile.email}</span>
              </span>
              <span className="contact-item__action">
                <Icon name="copy" size={16} />
                <span>Copy</span>
              </span>
            </Glass>

            <Glass
              className="contact-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.45 }}
            >
              <span className="contact-item__icon">
                <Icon name="mapPin" />
              </span>
              <span>
                <span className="contact-item__label">Location</span>
                <br />
                <span className="contact-item__value">{profile.location} · Open to remote</span>
              </span>
            </Glass>
          </div>

          <div className="contact__socials">
            {profile.socials.map((s, i) => (
              <Magnetic key={s.label} strength={0.5}>
                <Glass
                  as="a"
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="icon-btn"
                  aria-label={s.label}
                  spotlight={false}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.5 + i * 0.07 }}
                >
                  <Icon name={s.icon} size={18} />
                </Glass>
              </Magnetic>
            ))}
          </div>
        </div>

        <Glass
          as="form"
          className="form"
          liquid
          onSubmit={submit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          <div className="form__row">
            <div className="field">
              <input id="name" name="name" placeholder=" " value={form.name} onChange={update} required autoComplete="name" />
              <label htmlFor="name">Your name</label>
            </div>
            <div className="field">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                value={form.email}
                onChange={update}
                required
                autoComplete="email"
              />
              <label htmlFor="email">Email address</label>
            </div>
          </div>

          <span className="form__label">I’m reaching out about</span>
          <div className="budget" role="radiogroup" aria-label="Reason for reaching out">
            {topics.map((b) => (
              <motion.button
                type="button"
                key={b}
                role="radio"
                aria-checked={topic === b}
                className={topic === b ? 'is-active' : ''}
                onClick={() => setTopic(b)}
                whileTap={{ scale: 0.94 }}
              >
                {b}
              </motion.button>
            ))}
          </div>

          <div className="field">
            <textarea id="message" name="message" placeholder=" " value={form.message} onChange={update} required />
            <label htmlFor="message">Your message</label>
          </div>

          <Magnetic strength={0.15} style={{ display: 'flex', width: '100%' }}>
            <button type="submit" className="btn btn--primary form__submit">
              Send message
              <span className="btn__icon">
                <Icon name="send" size={18} />
              </span>
            </button>
          </Magnetic>
          <p className="form__note">No spam, ever. Your details stay between us.</p>
        </Glass>
      </div>

      <Toast message={toast} />
    </section>
  )
}
