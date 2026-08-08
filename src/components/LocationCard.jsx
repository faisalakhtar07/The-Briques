import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export default function LocationCard({ location, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        to={`/properties?location=${encodeURIComponent(location.name)}`}
        className="group relative block h-44 overflow-hidden rounded-2xl shadow-card"
      >
        <img
          src={location.image}
          alt={`Builder floors in ${location.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 flex flex-col gap-0.5 p-4 text-white">
          <span className="flex items-center gap-1 text-sm font-semibold">
            <MapPin size={14} /> {location.name}
          </span>
          <span className="text-xs text-white/80">{location.count} Properties</span>
        </div>
      </Link>
    </motion.div>
  )
}
