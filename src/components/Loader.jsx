import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import Glass from './ui/Glass'
import { profile } from '../data/portfolio'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader__orb" />
      <Glass
        className="loader__inner"
        liquid
        spotlight={false}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="loader__label">{profile.name}</span>
        <span className="loader__count">
          {count}
          <span className="grad-text">%</span>
        </span>
        <div className="loader__bar">
          <motion.span style={{ scaleX: count / 100 }} />
        </div>
        <span className="loader__label">Loading</span>
      </Glass>
    </motion.div>
  )
}
