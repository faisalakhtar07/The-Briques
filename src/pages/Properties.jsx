import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar'
import PropertyGrid from '../components/PropertyGrid'
import { properties } from '../data/properties'

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || searchParams.get('location') || '')
  const [sort, setSort] = useState('relevance')
  const [view, setView] = useState('grid')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: searchParams.get('status') ? [searchParams.get('status')] : [],
    bhk: searchParams.get('bhk') ? [Number(searchParams.get('bhk'))] : [],
    possession: [],
    maxPrice: 20000000,
  })

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      const matchesQuery =
        !query ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = !filters.status.length || filters.status.includes(p.status)
      const matchesBhk = !filters.bhk.length || filters.bhk.includes(p.bhk)
      const matchesPossession = !filters.possession.length || filters.possession.includes(p.possession)
      const matchesPrice = p.priceValue <= filters.maxPrice
      return matchesQuery && matchesStatus && matchesBhk && matchesPossession && matchesPrice
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceValue - b.priceValue)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceValue - a.priceValue)
    if (sort === 'area-desc') list = [...list].sort((a, b) => b.area - a.area)

    return list
  }, [query, filters, sort])

  return (
    <div className="section-pad bg-paper">
      <div className="container-app flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-ink">Discover Builder Floors</h1>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location or title..."
              className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 sm:max-w-sm"
            />
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
            <div className="ml-auto hidden items-center gap-1 rounded-xl border border-ink/12 bg-white p-1 sm:flex">
              <button
                onClick={() => setView('grid')}
                className={`rounded-lg p-2 ${view === 'grid' ? 'bg-emerald-500 text-white' : 'text-ink/50'}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`rounded-lg p-2 ${view === 'list' ? 'bg-emerald-500 text-white' : 'text-ink/50'}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <p className="text-sm text-ink/50">{filtered.length} properties found</p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar filters={filters} setFilters={setFilters} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex-1">
            <PropertyGrid properties={filtered} />
          </div>
        </div>
      </div>
    </div>
  )
}
