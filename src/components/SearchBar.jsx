import React, { useState } from 'react'
import { MapPin, Home, Wallet, BedDouble, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const budgets = ['Any Budget', 'Under ₹70 Lakh', '₹70L – ₹1 Cr', '₹1 Cr – ₹1.5 Cr', 'Above ₹1.5 Cr']
const bedroomOptions = ['Any BHK', '2 BHK', '3 BHK', '4 BHK']
const propertyTypes = ['Builder Floor', 'Fresh', 'Resale']

export default function SearchBar() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [type, setType] = useState(propertyTypes[0])
  const [budget, setBudget] = useState(budgets[0])
  const [bhk, setBhk] = useState(bedroomOptions[0])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('q', location)
    if (type) params.set('type', type)
    if (bhk !== 'Any BHK') params.set('bhk', bhk.replace(' BHK', ''))
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:p-2.5"
    >
      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-paper-dim lg:border-r lg:border-ink/8">
        <MapPin size={17} className="shrink-0 text-emerald-500" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Sector 85)"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-paper-dim lg:border-r lg:border-ink/8">
        <Home size={17} className="shrink-0 text-emerald-500" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-ink focus:outline-none"
        >
          {propertyTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-paper-dim lg:border-r lg:border-ink/8">
        <Wallet size={17} className="shrink-0 text-emerald-500" />
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-ink focus:outline-none"
        >
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-paper-dim">
        <BedDouble size={17} className="shrink-0 text-emerald-500" />
        <select
          value={bhk}
          onChange={(e) => setBhk(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-ink focus:outline-none"
        >
          {bedroomOptions.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
      >
        <Search size={16} />
        Search Properties
      </button>
    </form>
  )
}
