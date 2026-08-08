import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, Play, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react'

export default function AppPromotion() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="section-pad overflow-hidden bg-emerald-900 text-paper">
      <div className="container-app grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6"
        >
          <span className="eyebrow w-fit rounded-full bg-white/10 px-3 py-1.5 text-emerald-200">Coming Soon</span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Get the best builder floor listings right in your pocket.
          </h2>
          <p className="text-emerald-100/80">Be the first to know when we launch!</p>

          {submitted ? (
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-emerald-100">
              <CheckCircle2 size={18} className="text-emerald-300" /> You're on the list — we'll notify you at launch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-emerald-300"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
              >
                Notify Me
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80">
              <Play size={15} /> Google Play
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80">
              <Apple size={15} /> App Store
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto w-56"
        >
          <div className="rounded-[2.2rem] border-4 border-white/15 bg-emerald-950 p-3 shadow-lift">
            <div className="overflow-hidden rounded-3xl bg-paper">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                alt="Builder floor listing preview on mobile app"
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-col gap-2 p-3">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <ShieldCheck size={11} /> Verified
                </span>
                <span className="text-xs font-bold text-ink">3 BHK Builder Floor</span>
                <span className="flex items-center gap-1 text-[10px] text-ink/50">
                  <MapPin size={10} /> Sector 85, Faridabad
                </span>
                <span className="text-sm font-bold text-emerald-600">₹1.25 Cr</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
