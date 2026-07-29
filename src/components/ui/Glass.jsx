import { forwardRef, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const cache = {}
const getMotion = (tag) => (cache[tag] ??= motion.create(tag))

// liquid - svg distortion (only chrome), live - same but animated
// tilt - max tilt in degrees, spotlight - light that follows the mouse
const Glass = forwardRef(function Glass(
  {
    as = 'div',
    liquid = false,
    live = false,
    tilt = 0,
    spotlight = true,
    className = '',
    style,
    children,
    onMouseMove,
    onMouseLeave,
    ...rest
  },
  forwardedRef,
) {
  const Comp = getMotion(as)
  const ref = useRef(null)
  const setRef = useCallback(
    (node) => {
      ref.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef],
  )

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring)

  const handleMove = (e) => {
    const el = ref.current
    if (el) {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      if (spotlight) {
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
      }
      if (tilt) {
        px.set(x)
        py.set(y)
      }
    }
    onMouseMove?.(e)
  }

  const handleLeave = (e) => {
    px.set(0.5)
    py.set(0.5)
    onMouseLeave?.(e)
  }

  const classes = [
    'lg',
    liquid && 'lg--liquid',
    live && 'lg--live',
    spotlight && 'has-spot',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Comp
      ref={setRef}
      className={classes}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000, ...style } : style}
      onMouseMove={spotlight || tilt ? handleMove : onMouseMove}
      onMouseLeave={tilt ? handleLeave : onMouseLeave}
      {...rest}
    >
      {children}
    </Comp>
  )
})

export default Glass
