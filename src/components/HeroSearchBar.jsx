import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, Wallet, BedDouble, Search } from "lucide-react";

// Same look & interaction as the original site's hero search bar — but
// wired to the real backend's actual filters (pincode/area, propertyType,
// price range, rooms) instead of the old mock "Fresh/Resale" categories.
const PROPERTY_TYPES = [
  { label: "Any Type", value: "" },
  { label: "For Rent", value: "rent" },
  { label: "For Sale", value: "sell" },
];

const BUDGETS = [
  { label: "Any Budget", min: "", max: "" },
  { label: "Under ₹70 Lakh", min: "", max: "7000000" },
  { label: "₹70L – ₹1 Cr", min: "7000000", max: "10000000" },
  { label: "₹1 Cr – ₹1.5 Cr", min: "10000000", max: "15000000" },
  { label: "Above ₹1.5 Cr", min: "15000000", max: "" },
];

const BHK_OPTIONS = [
  { label: "Any BHK", value: "" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
];

export default function HeroSearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [rooms, setRooms] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("area", location);
    if (propertyType) params.set("propertyType", propertyType);
    if (rooms) params.set("rooms", rooms);
    const budget = BUDGETS[budgetIdx];
    if (budget.min) params.set("minPrice", budget.min);
    if (budget.max) params.set("maxPrice", budget.max);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:p-2.5"
    >
      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-gray-50 lg:border-r lg:border-black/8">
        <MapPin size={17} className="shrink-0 text-emerald-500" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Sector 85)"
          className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-gray-50 lg:border-r lg:border-black/8">
        <Home size={17} className="shrink-0 text-emerald-500" />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-gray-800 focus:outline-none"
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t.label} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-gray-50 lg:border-r lg:border-black/8">
        <Wallet size={17} className="shrink-0 text-emerald-500" />
        <select
          value={budgetIdx}
          onChange={(e) => setBudgetIdx(Number(e.target.value))}
          className="w-full appearance-none bg-transparent text-sm text-gray-800 focus:outline-none"
        >
          {BUDGETS.map((b, i) => (
            <option key={b.label} value={i}>{b.label}</option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-xl px-3 py-3 hover:bg-gray-50">
        <BedDouble size={17} className="shrink-0 text-emerald-500" />
        <select
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-gray-800 focus:outline-none"
        >
          {BHK_OPTIONS.map((b) => (
            <option key={b.label} value={b.value}>{b.label}</option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        <Search size={16} />
        Search Properties
      </button>
    </form>
  );
}
