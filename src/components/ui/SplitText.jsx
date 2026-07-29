import { motion } from 'framer-motion'

const wordVariants = {
  hidden: { y: '110%', rotate: 6 },
  show: (i) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i },
  }),
}

// reveals text word by word when it comes into view (or when play is true)
export default function SplitText({ text, as = 'span', className = '', delay = 0, stagger = 0.06, play }) {
  const Tag = motion[as]
  const words = text.split(' ')
  const controlled = play !== undefined

  return (
    <Tag
      className={`split ${className}`}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.5 } })}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span className="split__word" key={i} aria-hidden="true">
          <motion.span className="split__inner" variants={wordVariants} custom={delay + i * stagger}>
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
