import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api/axios.js";
import { getOwnerBookings, approveBooking, rejectBooking } from "../../api/bookings.js";
import { Users, Building2, Wallet, ShoppingBag, Phone, Check, X } from "lucide-react";

// Owner dashboard is strictly scoped server-side to req.user.pincode
// (see /api/pincodes/owner/dashboard and /api/bookings/owner) — this page
// just renders whatever the backend allows for this Owner, nothing more.
export default function OwnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [actingId, setActingId] = useState(null);

  const loadBookings = () => getOwnerBookings().then(({ data }) => setBookings(data.bookings)).catch(() => {});

  useEffect(() => {
    api.get("/pincodes/owner/dashboard").then(({ data }) => setStats(data));
    loadBookings();
  }, []);

  if (!stats) return <div className="p-10 text-center text-ink-soft">Loading...</div>;

  const cards = [
    { icon: Building2, label: "Properties", value: stats.properties },
    { icon: ShoppingBag, label: "Sellers", value: stats.sellers },
    { icon: Users, label: "Buyers", value: stats.buyers },
    { icon: Wallet, label: "Revenue", value: `₹${stats.revenue?.toLocaleString("en-IN")}` },
  ];

  const pendingBookings = bookings.filter((b) => b.status === "pending");

  const handleApprove = async (id) => {
    setActingId(id);
    try { await approveBooking(id); await loadBookings(); } finally { setActingId(null); }
  };

  const handleReject = async (id) => {
    const reason = window.prompt("Reason for declining (optional):") || "";
    setActingId(id);
    try { await rejectBooking(id, reason); await loadBookings(); } finally { setActingId(null); }
  };

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

      <div className="bg-white rounded-xl2 shadow-card p-5 mb-6">
        <h2 className="font-display font-semibold mb-4">
          Pending Booking Requests {pendingBookings.length > 0 && `(${pendingBookings.length})`}
        </h2>
        {pendingBookings.length === 0 ? (
          <p className="text-ink-soft text-sm">No pending requests right now.</p>
        ) : (
          <ul className="space-y-4">
            {pendingBookings.map((b) => (
              <li key={b._id} className="border border-black/8 rounded-xl p-4">
                <p className="font-semibold text-sm">{b.property?.title}</p>
                <p className="text-xs text-ink-soft mt-1">₹{b.property?.displayPrice?.toLocaleString("en-IN")} · {b.property?.pincode}</p>
                <p className="text-sm mt-2 flex items-center gap-1.5">
                  <span className="font-medium">{b.buyerName}</span>
                  <span className="text-ink-soft flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {b.buyerPhone}</span>
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApprove(b._id)}
                    disabled={actingId === b._id}
                    className="flex items-center gap-1 rounded-full bg-emerald-600 text-white text-xs font-semibold px-4 py-2 hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(b._id)}
                    disabled={actingId === b._id}
                    className="flex items-center gap-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold px-4 py-2 hover:bg-red-100 disabled:opacity-60"
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
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
