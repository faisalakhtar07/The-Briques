import { Link } from "react-router-dom";
import { BedDouble, MapPin, Tag } from "lucide-react";

// PUBLIC card: only ever renders fields the backend already restricted to
// public/buyer-safe data. No seller name, no phone — it isn't even in the
// API response for this endpoint (see propertyController.PUBLIC_FIELDS).
export default function PropertyCard({ property }) {
  const finalPrice = property.discount
    ? Math.round(property.displayPrice * (1 - property.discount / 100))
    : property.displayPrice;

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group block rounded-xl2 overflow-hidden bg-white shadow-card hover:shadow-lift transition-shadow"
    >
      <div className="relative h-48 overflow-hidden bg-paper-dim">
        {property.images?.[0]?.url && (
          <img
            src={property.images[0].url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-emerald-600 text-white text-xs font-semibold px-3 py-1 uppercase">
          {property.propertyType === "rent" ? "For Rent" : "For Sale"}
        </span>
        {property.discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-gold-500 text-ink text-xs font-bold px-3 py-1 flex items-center gap-1">
            <Tag className="w-3 h-3" /> {property.discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-ink line-clamp-1">{property.title}</h3>
        <p className="text-ink-soft text-sm flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" /> {property.area || "—"} · {property.pincode}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-emerald-700 font-bold text-lg">₹{finalPrice?.toLocaleString("en-IN")}</span>
            {property.propertyType === "rent" && <span className="text-ink-soft text-xs">/month</span>}
          </div>
          <span className="text-ink-soft text-sm flex items-center gap-1">
            <BedDouble className="w-4 h-4" /> {property.rooms} rooms
          </span>
        </div>
      </div>
    </Link>
  );
}
