import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import PropertyGrid from "../components/PropertyGrid.jsx";
import { getSavedProperties } from "../api/users.js";

export default function Saved() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedProperties()
      .then(({ data }) => setProperties(data.properties))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-display font-bold">Saved Properties</h1>
      </div>
      {!loading && properties.length === 0 ? (
        <p className="text-ink-soft text-sm">
          You haven't saved any properties yet. Tap the heart icon on a listing to save it here.
        </p>
      ) : (
        <PropertyGrid properties={properties} loading={loading} />
      )}
    </div>
  );
}
