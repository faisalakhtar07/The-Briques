import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyTransactions } from "../../api/payments.js";
import { getMyNotifications } from "../../api/notifications.js";
import { Bell, Receipt } from "lucide-react";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const contactPropertyId = searchParams.get("contact");
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyTransactions().then(({ data }) => setTransactions(data.transactions)).catch(() => {});
    getMyNotifications().then(({ data }) => setNotifications(data.notifications)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-1">Welcome, {user?.name?.split(" ")[0]}</h1>
      <p className="text-ink-soft text-sm mb-8">Track your transactions and notifications here.</p>

      {contactPropertyId && (
        <div className="bg-gold-50 border border-gold-400/40 rounded-xl2 p-4 mb-6 text-sm text-ink">
          To proceed with this property, our platform will connect you with the seller through a secure flow —
          seller contact details are never shared directly. Full checkout/payment flow coming to this dashboard.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-emerald-600" /> Your Transactions
          </h2>
          {transactions.length === 0 ? (
            <p className="text-ink-soft text-sm">No transactions yet.</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map((t) => (
                <li key={t._id} className="text-sm flex justify-between border-b border-black/5 pb-2">
                  <span>{t.property?.title}</span>
                  <span className="font-semibold">₹{t.amount?.toLocaleString("en-IN")} · {t.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-5">
          <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-emerald-600" /> Notifications
          </h2>
          {notifications.length === 0 ? (
            <p className="text-ink-soft text-sm">You're all caught up.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.slice(0, 8).map((n) => (
                <li key={n._id} className="text-sm border-b border-black/5 pb-2">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-ink-soft">{n.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Link to="/properties" className="inline-block mt-8 text-emerald-700 font-semibold text-sm hover:underline">
        Browse more properties →
      </Link>
    </div>
  );
}
