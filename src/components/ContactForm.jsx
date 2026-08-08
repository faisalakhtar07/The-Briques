import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'

const initialState = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!/^[0-9+\s-]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (!form.message.trim()) e.message = 'Please write a short message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setToast(true)
    setForm(initialState)
    setTimeout(() => setToast(false), 3500)
  }

  const field = (name, label, type = 'text') => (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        className={`rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-emerald-500 ${
          errors[name] ? 'border-red-400' : 'border-ink/12'
        }`}
      />
      {errors[name] && <span className="text-xs text-red-500">{errors[name]}</span>}
    </label>
  )

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-ink/8 bg-white p-7 shadow-card">
        <div className="grid gap-5 sm:grid-cols-2">
          {field('name', 'Name')}
          {field('email', 'Email', 'email')}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {field('phone', 'Phone')}
          {field('subject', 'Subject')}
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Message</span>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-emerald-500 ${
              errors.message ? 'border-red-400' : 'border-ink/12'
            }`}
          />
          {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          Send Message <Send size={15} />
        </button>
      </form>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute -top-4 left-1/2 flex -translate-x-1/2 -translate-y-full items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-lift"
          >
            <CheckCircle2 size={15} className="text-emerald-400" />
            Message sent — we'll get back to you shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
