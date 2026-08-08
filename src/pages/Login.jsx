import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Lock, Smartphone } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '' })

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-paper px-4 py-16">
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
          <h1 className="text-xl font-bold text-ink">Welcome back</h1>
          <p className="text-sm text-ink/50">Log in to The Briques Reescotech</p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Email or Phone</span>
            <div className="flex items-center gap-2 rounded-xl border border-ink/12 px-4 py-3 focus-within:border-emerald-500">
              <Smartphone size={16} className="text-ink/40" />
              <input
                required
                value={form.identifier}
                onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="you@email.com or 8789502494"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-ink/12 px-4 py-3 focus-within:border-emerald-500">
              <Lock size={16} className="text-ink/40" />
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="••••••••"
              />
            </div>
          </label>

          <button
            type="submit"
            className="mt-2 rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/55">
          New here?{' '}
          <Link to="/register" className="font-semibold text-emerald-600">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
