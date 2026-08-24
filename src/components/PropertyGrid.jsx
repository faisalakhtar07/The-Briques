import PropertyCard from "./PropertyCard.jsx";

export default function PropertyGrid({ properties, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-xl2 bg-paper-dim animate-pulse" />
        ))}
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-16 text-ink-soft">
        No properties found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p) => (
        <PropertyCard key={p._id} property={p} />
      ))}
    </div>
  );
}
