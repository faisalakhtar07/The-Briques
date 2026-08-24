import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyGrid from "../components/PropertyGrid.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getPublicProperties } from "../api/properties.js";

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    pincode: searchParams.get("pincode") || "",
    area: searchParams.get("area") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rooms: searchParams.get("rooms") || "",
  });
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicProperties({ ...filters, q: query || undefined })
      .then(({ data }) => setProperties(data.properties))
      .finally(() => setLoading(false));
  }, [filters, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-4">Browse Properties</h1>
        <SearchBar value={query} onChange={setQuery} onSubmit={() => {}} />
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
