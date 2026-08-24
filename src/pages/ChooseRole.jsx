import { Link } from "react-router-dom";
import { ShoppingBag, Home as HomeIcon } from "lucide-react";

// Step 1 of signup, exactly as required by the spec: the user MUST choose
// Buyer or Seller before any signup form is shown. The choice is passed
// along as a query param so Register.jsx knows which flow to render.
export default function ChooseRole() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-display font-bold mb-2">Choose Account Type</h1>
      <p className="text-ink-soft mb-10">Select how you'd like to use The Briques.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/signup?role=buyer"
          className="group rounded-xl2 border-2 border-transparent bg-white shadow-card hover:shadow-lift hover:border-emerald-500 p-8 transition"
        >
          <ShoppingBag className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold">Buyer</h2>
          <p className="text-ink-soft text-sm mt-2">I'm looking to buy or rent a property.</p>
        </Link>

        <Link
          to="/signup?role=seller"
          className="group rounded-xl2 border-2 border-transparent bg-white shadow-card hover:shadow-lift hover:border-gold-500 p-8 transition"
        >
          <HomeIcon className="w-10 h-10 text-gold-600 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold">Seller</h2>
          <p className="text-ink-soft text-sm mt-2">I want to list/sell/rent out my property.</p>
        </Link>
      </div>
    </div>
  );
}
