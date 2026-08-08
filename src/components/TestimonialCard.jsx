import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial, delay = 0 }) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col gap-5 rounded-2xl border border-ink/8 bg-white p-7 shadow-card"
    >
      <Quote size={26} className="text-emerald-200" />
      <p className="text-sm leading-relaxed text-ink/75">"{testimonial.quote}"</p>
      <div className="mt-auto flex items-center gap-3 border-t border-ink/8 pt-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-ink/50">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
