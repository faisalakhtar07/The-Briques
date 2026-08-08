import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, User, Hammer, Handshake } from 'lucide-react'

const roles = [
  { id: 'buyer', label: 'Buyer', icon: User },
  { id: 'builder', label: 'Builder', icon: Hammer },
  { id: 'dealer', label: 'Dealer', icon: Handshake },
]

export default function Register() {
  const [role, setRole] = useState('buyer')

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-paper px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-ink/8 bg-white p-8 shadow-lift"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <Building2 size={20} />
          </span>
          <h1 className="text-xl font-bold text-ink">Create your account</h1>
          <p className="text-sm text-ink/50">Join The Briques Reescotech as a</p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-colors ${
                role === r.id
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-ink/12 text-ink/60 hover:border-emerald-300'
              }`}
            >
              <r.icon size={17} />
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Full Name</span>
            <input required className="rounded-xl border border-ink/12 px-4 py-3 text-sm outline-none focus:border-emerald-500" placeholder="Your full name" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Phone Number</span>
            <input required type="tel" className="rounded-xl border border-ink/12 px-4 py-3 text-sm outline-none focus:border-emerald-500" placeholder="10-digit mobile number" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Email</span>
            <input required type="email" className="rounded-xl border border-ink/12 px-4 py-3 text-sm outline-none focus:border-emerald-500" placeholder="you@email.com" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Password</span>
            <input required type="password" className="rounded-xl border border-ink/12 px-4 py-3 text-sm outline-none focus:border-emerald-500" placeholder="Create a password" />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Register as {roles.find((r) => r.id === role).label}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/55">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-emerald-600">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
