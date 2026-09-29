import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { getPropertiesByIds } from "../api/properties.js";
import { getRecentlyViewedIds } from "../utils/recentlyViewed.js";
import PropertyGrid from "./PropertyGrid.jsx";

export default function RecentlyViewed() {
  const [properties, setProperties] = useState(null); // null = still loading / not applicable

  useEffect(() => {
    const ids = getRecentlyViewedIds();
    if (!ids.length) {
      setProperties([]);
      return;
    }
    getPropertiesByIds(ids)
      .then(({ data }) => setProperties(data.properties))
      .catch(() => setProperties([]));
  }, []);

  if (!properties?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-emerald-600" />
        <h2 className="font-display text-xl font-bold text-ink">Recently Viewed</h2>
      </div>
      <PropertyGrid properties={properties.slice(0, 6)} loading={false} />
    </section>
  );
}
