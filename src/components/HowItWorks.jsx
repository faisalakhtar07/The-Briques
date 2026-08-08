import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const steps = [
  {
    step: '01',
    title: 'Builder Posts Property',
    description: 'Builders list their fresh builder floors directly on the platform with verified details.',
  },
  {
    step: '02',
    title: 'Dealer Manages Leads',
    description: 'Dealers access both fresh and resale inventory, managing leads through our system.',
  },
  {
    step: '03',
    title: 'Customer Explores',
    description: 'Buyers browse verified listings, filter by preferences, and connect with trusted dealers.',
  },
  {
    step: '04',
    title: 'Admin Ensures Quality',
    description: 'Our team verifies listings and ensures genuine coordination between all parties.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white">
      <div className="container-app flex flex-col items-center gap-14">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          subtitle="A simple, transparent process that benefits everyone in the ecosystem."
        />

        <div className="relative grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 lg:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col gap-3"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-display text-sm font-bold text-white shadow-card">
                {s.step}
              </span>
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="text-sm text-ink/60">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
