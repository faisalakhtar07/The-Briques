import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyBookings } from "../../api/bookings.js";
import { getMyNotifications } from "../../api/notifications.js";
import { Bell, ClipboardList } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-gold-50 text-gold-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyBookings().then(({ data }) => setBookings(data.bookings)).catch(() => {});
    getMyNotifications().then(({ data }) => setNotifications(data.notifications)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-1">Welcome, {user?.name?.split(" ")[0]}</h1>
      <p className="text-ink-soft text-sm mb-8">Track your booking requests and notifications here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-emerald-600" /> Your Booking Requests
          </h2>
          {bookings.length === 0 ? (
            <p className="text-ink-soft text-sm">No booking requests yet.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li key={b._id} className="text-sm border-b border-black/5 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <span>{b.property?.title}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>
                  </div>
                  {b.status === "rejected" && b.rejectionReason && (
                    <p className="text-xs text-ink-soft mt-1">{b.rejectionReason}</p>
                  )}
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
    </div>
  );
}
