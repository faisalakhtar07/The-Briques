import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api/axios.js";
import { Users, Building2, Wallet, ShoppingBag } from "lucide-react";

// Owner dashboard is strictly scoped server-side to req.user.pincode
// (see /api/pincodes/owner/dashboard) — this page just renders whatever
// the backend allows for this Owner, nothing more.
export default function OwnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/pincodes/owner/dashboard").then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <div className="p-10 text-center text-ink-soft">Loading...</div>;

  const cards = [
    { icon: Building2, label: "Properties", value: stats.properties },
    { icon: ShoppingBag, label: "Sellers", value: stats.sellers },
    { icon: Users, label: "Buyers", value: stats.buyers },
    { icon: Wallet, label: "Revenue", value: `₹${stats.revenue?.toLocaleString("en-IN")}` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-1">Owner Dashboard</h1>
      <p className="text-ink-soft text-sm mb-8">
        {user?.name} · Managing pincode <span className="font-semibold text-ink">{stats.pincode}</span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl2 shadow-card p-5 text-center">
            <c.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xl font-bold">{c.value}</p>
            <p className="text-xs text-ink-soft">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl2 shadow-card p-5">
        <h2 className="font-display font-semibold mb-4">Recent Transactions in {stats.pincode}</h2>
        {stats.recentTransactions?.length === 0 ? (
          <p className="text-ink-soft text-sm">No transactions yet in your area.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {stats.recentTransactions?.map((t) => (
              <li key={t._id} className="flex justify-between border-b border-black/5 pb-2">
                <span>{t.type} · {t.status}</span>
                <span className="font-semibold">₹{t.amount?.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
