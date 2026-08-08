import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'

export default function TeamCard({ member, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-ink/8 bg-white p-8 text-center shadow-card"
    >
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-emerald-50">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-ink">{member.name}</h3>
        <p className="text-sm font-medium text-emerald-600">{member.role}</p>
        <p className="mt-1 text-xs text-ink/50">{member.bio}</p>
      </div>
      <a
        href="#"
        aria-label={`${member.name} on LinkedIn`}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-dim text-ink/50 transition-colors hover:bg-emerald-500 hover:text-white"
      >
        <Linkedin size={16} />
      </a>
    </motion.div>
  )
}
