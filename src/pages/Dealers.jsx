import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, MapPin, ListChecks, Phone } from 'lucide-react'
import { dealers } from '../data/dealers'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

export default function Dealers() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      dealers.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.location.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  return (
    <div className="section-pad bg-paper">
      <div className="container-app flex flex-col gap-12">
        <SectionHeading
          eyebrow="Dealer Directory"
          title="Verified Dealers on The Briques Reescotech"
          subtitle="Connect with trusted dealers managing fresh and resale builder floor inventory."
          align="left"
        />

        <label className="flex max-w-md items-center gap-2 rounded-xl border border-ink/12 bg-white px-4 py-3">
          <Search size={16} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dealers by name or location"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col gap-4 rounded-2xl border border-ink/8 bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <img src={d.image} alt={d.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="flex items-center gap-1.5 text-base font-bold text-ink">
                    {d.name}
                    {d.verified && <ShieldCheck size={14} className="text-emerald-500" />}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-ink/50">
                    <MapPin size={12} /> {d.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-ink/8 pt-4 text-xs text-ink/60">
                <span className="flex items-center gap-1">
                  <ListChecks size={13} /> {d.listings} Active Listings
                </span>
                <span>{d.experience} Experience</span>
              </div>
              <div className="mt-auto flex gap-2 pt-2">
                <Button to={`/properties?location=${encodeURIComponent(d.location)}`} variant="secondary" className="flex-1">
                  View Inventory
                </Button>
                <a
                  href="tel:+918789502494"
                  aria-label={`Call ${d.name}`}
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
