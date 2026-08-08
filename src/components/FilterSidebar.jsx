import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal } from 'lucide-react'

const bhkOptions = [2, 3, 4]
const statusOptions = ['Fresh', 'Resale']
const possessionOptions = ['Ready to Move', 'Immediate', 'Under Construction']

function CheckPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-emerald-500 bg-emerald-500 text-white'
          : 'border-ink/12 bg-white text-ink/70 hover:border-emerald-400'
      }`}
    >
      {children}
    </button>
  )
}

function FilterBody({ filters, setFilters }) {
  const toggle = (key, value) => {
    setFilters((prev) => {
      const set = new Set(prev[key])
      set.has(value) ? set.delete(value) : set.add(value)
      return { ...prev, [key]: Array.from(set) }
    })
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Fresh / Resale</h4>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <CheckPill key={s} active={filters.status.includes(s)} onClick={() => toggle('status', s)}>
              {s}
            </CheckPill>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">BHK</h4>
        <div className="flex flex-wrap gap-2">
          {bhkOptions.map((b) => (
            <CheckPill key={b} active={filters.bhk.includes(b)} onClick={() => toggle('bhk', b)}>
              {b} BHK
            </CheckPill>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Possession</h4>
        <div className="flex flex-wrap gap-2">
          {possessionOptions.map((p) => (
            <CheckPill key={p} active={filters.possession.includes(p)} onClick={() => toggle('possession', p)}>
              {p}
            </CheckPill>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Max Price: ₹{(filters.maxPrice / 100000).toFixed(0)} Lakh</h4>
        <input
          type="range"
          min="5000000"
          max="20000000"
          step="500000"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-emerald-500"
        />
      </div>

      <button
        onClick={() =>
          setFilters({ status: [], bhk: [], possession: [], maxPrice: 20000000 })
        }
        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
      >
        Clear all filters
      </button>
    </div>
  )
}

export default function FilterSidebar({ filters, setFilters, mobileOpen, setMobileOpen }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
          <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-ink">
            <SlidersHorizontal size={16} className="text-emerald-500" /> Filters
          </h3>
          <FilterBody filters={filters} setFilters={setFilters} />
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-ink/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-ink">Filters</h3>
                <button onClick={() => setMobileOpen(false)} className="rounded-full p-1.5 hover:bg-paper-dim">
                  <X size={18} />
                </button>
              </div>
              <FilterBody filters={filters} setFilters={setFilters} />
              <button
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white"
              >
                Show Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
