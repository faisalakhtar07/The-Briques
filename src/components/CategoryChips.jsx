import { Link } from "react-router-dom";
import { CATEGORY_LABELS } from "../data/categories.js";

// `items` = [{ propertyType: "rent", label: "For Rent" }] or
//           [{ category: "hotel", label: "Hotel", count: 12 }] or
//           [{ city: "Aurangabad", count: 34 }]
export default function CategoryChips({ items }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const param = item.propertyType
          ? `propertyType=${encodeURIComponent(item.propertyType)}`
          : item.city
          ? `city=${encodeURIComponent(item.city)}`
          : `category=${encodeURIComponent(item.category)}`;
        const label = item.label || CATEGORY_LABELS[item.category] || item.city || item.category;
        return (
          <Link
            key={param}
            to={`/properties?${param}`}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            {label}
            {item.count ? <span className="text-ink-soft font-normal ml-1">({item.count})</span> : null}
          </Link>
        );
      })}
    </div>
  );
}
