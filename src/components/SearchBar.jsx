import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
      className="flex items-center gap-2 bg-white rounded-full shadow-card px-4 py-2 w-full max-w-xl"
    >
      <Search className="w-5 h-5 text-ink-soft" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, area..."
        className="flex-1 outline-none text-sm bg-transparent"
      />
      <button type="submit" className="rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-1.5 hover:bg-emerald-700">
        Search
      </button>
    </form>
  );
}
