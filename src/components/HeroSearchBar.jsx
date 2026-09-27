import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Home,
  Wallet,
  BedDouble,
  Search,
  ChevronDown,
} from "lucide-react";

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
      className="
        mx-auto
        flex
        w-full
        max-w-4xl
        flex-col
        overflow-hidden
        rounded-full
        border
        border-white/40
        bg-black/25
        shadow-2xl
        backdrop-blur-md
        lg:flex-row
        lg:items-center
      "
    >
      {/* LOCATION */}
      <label
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          px-5
          py-3
          lg:border-r
          lg:border-white/25
        "
      >
        <MapPin
          size={17}
          className="shrink-0 text-white"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="
            w-full
            min-w-0
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-white/70
          "
        />
      </label>

      {/* PROPERTY TYPE */}
      <label
        className="
          relative
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          px-5
          py-3
          lg:border-r
          lg:border-white/25
        "
      >
        <Home
          size={17}
          className="shrink-0 text-white"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="
            w-full
            min-w-0
            appearance-none
            bg-transparent
            pr-5
            text-sm
            text-white
            outline-none
          "
        >
          {PROPERTY_TYPES.map((type) => (
            <option
              key={type.label}
              value={type.value}
              className="text-black"
            >
              {type.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-4 text-white/70"
        />
      </label>

      {/* BUDGET */}
      <label
        className="
          relative
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          px-5
          py-3
          lg:border-r
          lg:border-white/25
        "
      >
        <Wallet
          size={17}
          className="shrink-0 text-white"
        />

        <select
          value={budgetIdx}
          onChange={(e) => setBudgetIdx(Number(e.target.value))}
          className="
            w-full
            min-w-0
            appearance-none
            bg-transparent
            pr-5
            text-sm
            text-white
            outline-none
          "
        >
          {BUDGETS.map((budget, index) => (
            <option
              key={budget.label}
              value={index}
              className="text-black"
            >
              {budget.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-4 text-white/70"
        />
      </label>

      {/* BHK */}
      <label
        className="
          relative
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          px-5
          py-3
        "
      >
        <BedDouble
          size={17}
          className="shrink-0 text-white"
        />

        <select
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="
            w-full
            min-w-0
            appearance-none
            bg-transparent
            pr-5
            text-sm
            text-white
            outline-none
          "
        >
          {BHK_OPTIONS.map((bhk) => (
            <option
              key={bhk.label}
              value={bhk.value}
              className="text-black"
            >
              {bhk.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-4 text-white/70"
        />
      </label>

      {/* SEARCH BUTTON */}
      <button
        type="submit"
        className="
          m-1
          flex
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-full
          bg-white
          px-6
          py-3
          text-sm
          font-semibold
          text-[#1f2937]
          transition-all
          duration-200
          hover:bg-white/90
          hover:scale-[1.02]
          active:scale-[0.98]
        "
      >
        <Search size={16} />
        <span>Search</span>
      </button>
    </form>
  );
}