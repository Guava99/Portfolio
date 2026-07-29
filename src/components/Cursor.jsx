import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, input, textarea, [data-cursor]'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE)
      setHover(!!el)
      const text = el?.getAttribute('data-cursor')
      setLabel(text && text !== 'true' ? text : '')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor" style={{ x: rx, y: ry }} aria-hidden="true">
        <div className={`cursor-ring ${hover ? 'is-hover' : ''} ${label ? 'has-label' : ''}`}>
          {label && <span className="cursor-ring__label">{label}</span>}
        </div>
      </motion.div>
      <motion.div className="cursor" style={{ x, y, opacity: label ? 0 : 1 }} aria-hidden="true">
        <div className="cursor-dot" />
      </motion.div>
    </>
  )
}
