import { Link } from "react-router-dom";
import { Home, Tag, PartyPopper, Building2, Hotel, Store, TreePine, MapPin } from "lucide-react";
import { CATEGORY_LABELS } from "../data/categories.js";

const TYPE_ICONS = { rent: Home, sell: Tag, event: PartyPopper };
const CATEGORY_ICONS = {
  marriage_hall: Building2,
  hotel: Hotel,
  banquet_hall: PartyPopper,
  apartment: Home,
  shop: Store,
  land: TreePine,
  other: Building2,
};

// `items` = [{ propertyType: "rent", label: "For Rent" }] or
//           [{ category: "hotel", label: "Hotel", count: 12 }] or
//           [{ city: "Aurangabad", count: 34 }]
export default function CategoryChips({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {items.map((item) => {
        const param = item.propertyType
          ? `propertyType=${encodeURIComponent(item.propertyType)}`
          : item.city
          ? `city=${encodeURIComponent(item.city)}`
          : `category=${encodeURIComponent(item.category)}`;
        const label = item.label || CATEGORY_LABELS[item.category] || item.city || item.category;
        const Icon = item.propertyType
          ? TYPE_ICONS[item.propertyType] || Building2
          : item.city
          ? MapPin
          : CATEGORY_ICONS[item.category] || Building2;

        return (
          <Link
            key={param}
            to={`/properties?${param}`}
            className="group flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Icon className="w-5 h-5" />
            </span>
            <span>
              <span className="block font-semibold text-ink text-sm">{label}</span>
              {item.count ? (
                <span className="block text-xs text-ink-soft mt-0.5">
                  {item.count} listing{item.count === 1 ? "" : "s"}
                </span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
