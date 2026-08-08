import React from 'react'
import { motion } from 'framer-motion'
import { X, ShieldCheck, Target, Eye } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import TeamCard from '../components/TeamCard'
import { team } from '../data/testimonials'

const problems = [
  'Broker spam',
  'Fake listings',
  'Confusing pricing',
  'Lack of genuine inventory',
  'Difficulty connecting builders and buyers',
]

export default function About() {
  return (
    <div className="bg-paper">
      <section className="section-pad">
        <div className="container-app grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow w-fit rounded-full bg-emerald-50 px-3 py-1.5">Our Story</span>
            <h1 className="text-3xl font-bold text-ink sm:text-4xl">About The Briques Reescotech</h1>
            <p className="text-sm leading-relaxed text-ink/65">
              We started The Briques Reescotech because existing real-estate portals created more friction than trust for
              people buying, selling or building builder floors in Faridabad & NCR.
            </p>
            <div className="flex flex-col gap-2.5 rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
              {problems.map((p) => (
                <span key={p} className="flex items-center gap-2 text-sm text-ink/70">
                  <X size={15} className="text-red-500" /> {p}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
            alt="Builder floor community in Faridabad"
            className="h-96 w-full rounded-xl2 object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-app grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-ink/8 bg-paper p-8">
            <Target size={22} className="text-emerald-500" />
            <h3 className="text-lg font-bold text-ink">Mission</h3>
            <p className="text-sm text-ink/65">
              Make builder floor transactions transparent, fast, and trustworthy for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-ink/8 bg-paper p-8">
            <Eye size={22} className="text-emerald-500" />
            <h3 className="text-lg font-bold text-ink">Vision</h3>
            <p className="text-sm text-ink/65">
              Become India's most trusted platform for builder floor properties.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="section-pad">
        <div className="container-app flex flex-col items-center gap-14">
          <SectionHeading eyebrow="Leadership" title="Meet the Team" />
          <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {team.map((m, i) => (
              <TeamCard key={m.id} member={m} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
