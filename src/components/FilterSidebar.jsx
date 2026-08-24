export default function FilterSidebar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className="bg-white rounded-xl2 shadow-card p-5 space-y-5 h-fit sticky top-20">
      <div>
        <label className="text-sm font-semibold text-ink">Pincode</label>
        <input
          value={filters.pincode || ""}
          onChange={(e) => update("pincode", e.target.value)}
          placeholder="e.g. 824101"
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Type</label>
        <select
          value={filters.propertyType || ""}
          onChange={(e) => update("propertyType", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="rent">For Rent</option>
          <option value="sell">For Sale</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Rooms</label>
        <select
          value={filters.rooms || ""}
          onChange={(e) => update("rooms", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}+</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Price range (₹)</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            min={8000}
            placeholder="Min 8,000"
            value={filters.minPrice || ""}
            onChange={(e) => update("minPrice", e.target.value)}
            className="w-1/2 rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="w-1/2 rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        onClick={() => onChange({})}
        className="w-full text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        Clear filters
      </button>
    </aside>
  );
}
