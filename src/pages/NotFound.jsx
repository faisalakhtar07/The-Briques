import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-paper px-4 text-center">
      <span className="font-display text-7xl font-bold text-emerald-500">404</span>
      <h1 className="text-xl font-bold text-ink">This page doesn't exist</h1>
      <p className="max-w-sm text-sm text-ink/55">
        The page you're looking for may have been moved or the listing is no longer available.
      </p>
      <Link
        to="/"
        className="mt-2 flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white"
      >
        <Home size={16} /> Back to Home
      </Link>
    </div>
  )
}
