import { useState } from "react";
import { Bell, BellRing, BellOff } from "lucide-react";
import { usePushNotifications } from "../hooks/usePushNotifications.js";

// Drop this into any logged-in dashboard (Buyer/Seller/Owner). Shows
// nothing once notifications are already on, so it doesn't clutter the
// page after the first successful setup.
export default function EnableNotificationsButton() {
  const { permission, supported, loading, error, enable } = usePushNotifications();
  const [justEnabled, setJustEnabled] = useState(false);

  if (!supported || permission === "granted" || justEnabled) {
    return justEnabled ? (
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <BellRing className="w-4 h-4" /> Notifications enabled — you'll get alerts even when the app is closed.
      </div>
    ) : null;
  }

  if (permission === "denied") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-paper-dim px-4 py-3 text-sm text-ink-soft">
        <BellOff className="w-4 h-4" /> Notifications are blocked in your browser settings.
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={async () => {
          const ok = await enable();
          if (ok) setJustEnabled(true);
        }}
        disabled={loading}
        className="flex items-center gap-2 rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 hover:bg-emerald-700 disabled:opacity-60"
      >
        <Bell className="w-4 h-4" /> {loading ? "Enabling..." : "Enable Notifications"}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
