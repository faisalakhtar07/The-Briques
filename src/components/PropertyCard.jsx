import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, MapPin, BedDouble, Ruler, Layers } from 'lucide-react'

export default function PropertyCard({ property, delay = 0 }) {
  const [fav, setFav] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.verified && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-card">
              <ShieldCheck size={12} /> Verified
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-card ${
              property.status === 'Fresh' ? 'bg-emerald-500 text-white' : 'bg-gold-500 text-ink'
            }`}
          >
            {property.status}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setFav((v) => !v)
          }}
          aria-label="Save to favorites"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-card transition-transform active:scale-90"
        >
          <Heart size={15} className={fav ? 'fill-red-500 text-red-500' : 'text-ink/50'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-ink">{property.title}</h3>
        </div>
        <span className="flex items-center gap-1 text-xs text-ink/55">
          <MapPin size={13} /> {property.location}
        </span>
        <span className="text-xl font-bold text-emerald-600">{property.price}</span>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/8 pt-3 text-xs text-ink/60">
          <span className="flex items-center gap-1">
            <BedDouble size={14} /> {property.bhk} BHK
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={14} /> {property.area} sq.ft.
          </span>
          <span className="flex items-center gap-1">
            <Layers size={14} /> {property.floor}
          </span>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="mt-2 flex items-center justify-center rounded-full bg-paper-dim py-2.5 text-sm font-semibold text-ink transition-colors group-hover:bg-emerald-500 group-hover:text-white"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}
