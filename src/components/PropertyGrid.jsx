import React from 'react'
import PropertyCard from './PropertyCard'
import { SearchX } from 'lucide-react'

function Skeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card">
      <div className="h-52 animate-pulse bg-paper-dim" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-paper-dim" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-paper-dim" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-paper-dim" />
        <div className="h-9 w-full animate-pulse rounded-full bg-paper-dim" />
      </div>
    </div>
  )
}

export default function PropertyGrid({ properties, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    )
  }

  if (!properties.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-dim text-ink/40">
          <SearchX size={22} />
        </span>
        <h3 className="text-lg font-semibold text-ink">No properties match your filters</h3>
        <p className="max-w-sm text-sm text-ink/50">
          Try widening your budget, changing location, or clearing a few filters to see more listings.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p, i) => (
        <PropertyCard key={p.id} property={p} delay={(i % 6) * 0.05} />
      ))}
    </div>
  )
}
