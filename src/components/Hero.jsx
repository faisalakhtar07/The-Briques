import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, MapPin } from 'lucide-react'
import SearchBar from './SearchBar'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="container-app relative grid gap-12 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <span className="eyebrow w-fit rounded-full bg-emerald-50 px-3 py-1.5">
            <ShieldCheck size={14} /> Fresh Builder Floors • Verified Listings • Dealer-Friendly System
          </span>
          <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            India's Dedicated Platform for{' '}
            <span className="text-emerald-600">Builder Floors</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-ink/60">
            <MapPin size={16} className="text-emerald-500" />
            Searching in <span className="font-semibold text-ink">Faridabad & NCR</span>
            <span className="mx-1 h-1 w-1 rounded-full bg-ink/30" />
            <span className="font-semibold text-emerald-600">500+ Properties Available</span>
          </div>

          <div className="pt-2">
            <SearchBar />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Button to="/register" variant="secondary">
              List Your Property
            </Button>
            <span className="text-xs text-ink/50">No brokerage. No fake listings. Ever.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl2 shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Premium builder floor residence in Faridabad"
              className="h-[26rem] w-full object-cover sm:h-[30rem]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-white p-4 shadow-lift sm:block"
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">Verified Listing</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Sector 85, Faridabad</p>
            <p className="text-xs text-ink/50">3 BHK • 1800 sq.ft. • ₹1.25 Cr</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
