import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RoleCard({ icon: Icon, title, description, features, to, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="group flex flex-col gap-5 rounded-2xl border border-ink/8 bg-white p-7 shadow-card transition-shadow hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
        <Icon size={22} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="text-sm text-ink/60">{description}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to={to}
        className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-transform group-hover:translate-x-1"
      >
        Learn More <ArrowRight size={15} />
      </Link>
    </motion.div>
  )
}
