import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const blobs = [
  { cls: 'bg__blob--1', depth: 40 },
  { cls: 'bg__blob--2', depth: -60 },
  { cls: 'bg__blob--3', depth: 30 },
  { cls: 'bg__blob--4', depth: -35 },
]

function Blob({ cls, depth, mx, my }) {
  const x = useTransform(mx, [-1, 1], [-depth, depth])
  const y = useTransform(my, [-1, 1], [-depth, depth])
  return (
    <motion.div className={`bg__blob ${cls}`} style={{ x, y }}>
      <span />
    </motion.div>
  )
}

/** Fixed animated aurora background that the glass surfaces refract. */
export default function Background() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 40, damping: 20 })
  const my = useSpring(rawY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [rawX, rawY])

  return (
    <div className="bg" aria-hidden="true">
      {blobs.map((b) => (
        <Blob key={b.cls} {...b} mx={mx} my={my} />
      ))}
      <div className="bg__grid" />
      <div className="bg__noise" />
    </div>
  )
}
