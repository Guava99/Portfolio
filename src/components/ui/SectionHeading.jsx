import { motion } from 'framer-motion'
import Glass from './Glass'
import SplitText from './SplitText'

export default function SectionHeading({ index, eyebrow, title, sub, center = false }) {
  return (
    <div className={`heading ${center ? 'heading--center' : ''}`}>
      <Glass
        className="eyebrow"
        spotlight={false}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow__dot" />
        {index} / {eyebrow}
      </Glass>
      <h2 className="heading__title">
        <SplitText text={title} />
      </h2>
      {sub && (
        <motion.p
          className="heading__sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}
