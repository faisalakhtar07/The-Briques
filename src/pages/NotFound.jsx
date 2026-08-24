import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-5xl font-display font-bold text-emerald-600 mb-4">404</h1>
      <p className="text-ink-soft mb-6">This page doesn't exist.</p>
      <Link to="/" className="rounded-full bg-emerald-600 text-white font-semibold px-6 py-2.5 hover:bg-emerald-700">
        Back to Home
      </Link>
    </div>
  );
}
