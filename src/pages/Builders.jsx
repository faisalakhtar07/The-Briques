import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, MapPin, Building2, Phone } from 'lucide-react'
import { builders } from '../data/builders'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

export default function Builders() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      builders.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.location.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  return (
    <div className="section-pad bg-paper">
      <div className="container-app flex flex-col gap-12">
        <SectionHeading
          eyebrow="Builder Directory"
          title="Verified Builders on The Briques Reescotech"
          subtitle="Explore builders actively listing fresh builder floors across Faridabad & NCR."
          align="left"
        />

        <label className="flex max-w-md items-center gap-2 rounded-xl border border-ink/12 bg-white px-4 py-3">
          <Search size={16} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builders by name or location"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col gap-4 rounded-2xl border border-ink/8 bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <img src={b.image} alt={b.name} className="h-14 w-14 rounded-xl object-cover" />
                <div>
                  <h3 className="flex items-center gap-1.5 text-base font-bold text-ink">
                    {b.name}
                    {b.verified && <ShieldCheck size={14} className="text-emerald-500" />}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-ink/50">
                    <MapPin size={12} /> {b.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-ink/8 pt-4 text-xs text-ink/60">
                <span className="flex items-center gap-1">
                  <Building2 size={13} /> {b.projects} Projects
                </span>
                <span>{b.experience} Experience</span>
              </div>
              <p className="text-xs font-medium text-emerald-600">{b.specialty}</p>
              <div className="mt-auto flex gap-2 pt-2">
                <Button to={`/properties?location=${encodeURIComponent(b.location)}`} variant="secondary" className="flex-1">
                  View Properties
                </Button>
                <a
                  href="tel:+918789502494"
                  aria-label={`Call ${b.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                >
                  <Phone size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
