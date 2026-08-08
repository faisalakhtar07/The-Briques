import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  { value: 95, suffix: '+', label: 'Builders Onboarded' },
  { value: 190, suffix: '+', label: 'Active Dealers' },
  { value: 316, suffix: '+', label: 'Properties Listed' },
  { value: 633, suffix: '+', label: 'Happy Customers' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl font-bold text-ink sm:text-5xl">
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="border-y border-ink/8 bg-white">
      <div className="container-app grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <span className="text-sm text-ink/55">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
