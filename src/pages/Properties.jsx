import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyGrid from "../components/PropertyGrid.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getPublicProperties } from "../api/properties.js";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    pincode: searchParams.get("pincode") || "",
    area: searchParams.get("area") || "",
    city: searchParams.get("city") || "",
    propertyType: searchParams.get("propertyType") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rooms: searchParams.get("rooms") || "",
  });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicProperties({ ...filters, q: query || undefined, sort })
      .then(({ data }) => setProperties(data.properties))
      .finally(() => setLoading(false));
  }, [filters, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-1">
          Browse Properties
          {filters.city ? ` in ${filters.city}` : ""}
        </h1>
        {(filters.propertyType || filters.category) && (
          <p className="text-sm text-ink-soft mb-3">
            Filtered by {[
              filters.propertyType && { rent: "For Rent", sell: "For Sale", event: "Event Space" }[filters.propertyType],
              filters.category,
            ].filter(Boolean).join(" · ")}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <SearchBar value={query} onChange={setQuery} onSubmit={() => {}} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink-soft shrink-0"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {query && <p className="text-xs text-ink-soft mt-2">Sorted by best match for "{query}"</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div className="md:col-span-3">
          <PropertyGrid properties={properties} loading={loading} />
        </div>
      </div>
    </div>
  );
}
