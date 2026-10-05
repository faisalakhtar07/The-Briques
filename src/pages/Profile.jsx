import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, ShieldCheck, Sun, Moon, Monitor, Heart, Bell, Share2, Wallet,
  RefreshCw, Lock, LogOut, CheckCircle2, Loader2, Trash2, ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getMyFullProfile, requestPasswordOtp, verifyPasswordOtp } from "../api/users.js";
import { getMyNotifications, markAllNotificationsRead } from "../api/notifications.js";
import { getMyTransactions } from "../api/payments.js";
import { getShareHistory, clearShareHistory } from "../utils/shareHistory.js";
import EnableNotificationsButton from "../components/EnableNotificationsButton.jsx";

const ROLE_LABELS = { buyer: "Buyer", seller: "Seller", owner: "Owner", admin: "Admin" };

function SettingsCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-5 sm:p-6">
      <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
        <Icon className="w-4.5 h-4.5 text-emerald-600" /> {title}
      </h2>
      {children}
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { mode, setMode } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const [phone, setPhone] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [shareHistory, setShareHistory] = useState([]);
  const [payments, setPayments] = useState({ transactions: [], connectFees: [] });
  const [loadingPayments, setLoadingPayments] = useState(true);

  // Account Privacy / password-via-OTP flow state
  const [otpStage, setOtpStage] = useState("idle"); // idle -> sent -> done
  const [otpMsg, setOtpMsg] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpBusy, setOtpBusy] = useState(false);

  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    getMyFullProfile().then(({ data }) => setPhone(data.user.phone)).catch(() => {});
    getMyNotifications().then(({ data }) => setNotifications(data.notifications.slice(0, 5))).catch(() => {});
    setShareHistory(getShareHistory().slice(0, 10));
    getMyTransactions()
      .then(({ data }) => setPayments({ transactions: data.transactions || [], connectFees: data.connectFees || [] }))
      .catch(() => {})
      .finally(() => setLoadingPayments(false));
  }, []);

  const sendOtp = async () => {
    setOtpBusy(true);
    setOtpErr("");
    try {
      const { data } = await requestPasswordOtp();
      setOtpMsg(data.message);
      setOtpStage("sent");
    } catch (err) {
      setOtpErr(err.response?.data?.message || "Could not send code.");
    } finally {
      setOtpBusy(false);
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    setOtpErr("");
    if (newPassword !== confirmPassword) return setOtpErr("Passwords don't match.");
    setOtpBusy(true);
    try {
      await verifyPasswordOtp(otpCode, newPassword);
      setOtpStage("done");
    } catch (err) {
      setOtpErr(err.response?.data?.message || "Could not change password.");
    } finally {
      setOtpBusy(false);
    }
  };

  // sw.js already calls self.skipWaiting() on install (see its comments),
  // so there's no real "waiting" worker to swap in — this just forces an
  // immediate update check instead of waiting for the next navigation,
  // then reloads to pick up anything new.
  const checkForUpdate = async () => {
    setUpdateMsg(t("Checking..."));
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      if (reg) await reg.update();
      setTimeout(() => window.location.reload(), 600);
    } catch {
      setUpdateMsg(t("You're on the latest version."));
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-5">
      {/* HEADER */}
      <div className="bg-white rounded-xl2 shadow-card p-6 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
          {initials}
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-ink truncate">{user?.name}</h1>
          <p className="text-sm text-ink-soft flex items-center gap-1.5 mt-0.5">
            <Mail className="w-3.5 h-3.5" /> {user?.email}
          </p>
          {phone && (
            <p className="text-sm text-ink-soft flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3.5 h-3.5" /> {phone}
            </p>
          )}
          <span className="inline-flex items-center gap-1 mt-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1">
            <ShieldCheck className="w-3 h-3" /> {ROLE_LABELS[user?.role] || user?.role}
          </span>
        </div>
      </div>

      {/* APPEARANCE */}
      <SettingsCard icon={Sun} title={t("Appearance")}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "light", label: t("Light"), icon: Sun },
            { value: "dark", label: t("Dark"), icon: Moon },
            { value: "system", label: t("System"), icon: Monitor },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border py-3 text-xs font-semibold transition-colors ${
                mode === opt.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-black/10 text-ink-soft hover:border-black/20"
              }`}
            >
              <opt.icon className="w-4 h-4" /> {opt.label}
            </button>
          ))}
        </div>
      </SettingsCard>

      {/* LANGUAGE */}
      <SettingsCard icon={ShieldCheck} title={t("App Language")}>
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-soft">{lang === "en" ? "English" : "हिन्दी"}</p>
          <button
            onClick={toggleLang}
            className="rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2 hover:bg-emerald-700"
          >
            {lang === "en" ? "हिंदी में बदलें" : "Switch to English"}
          </button>
        </div>
      </SettingsCard>

      {/* SAVED */}
      {user?.role === "buyer" && (
        <SettingsCard icon={Heart} title={t("Saved")}>
          <Link to="/saved" className="flex items-center justify-between text-sm text-ink-soft hover:text-emerald-700">
            {t("View your saved properties")}
            <ExternalLink className="w-4 h-4" />
          </Link>
        </SettingsCard>
      )}

      {/* NOTIFICATIONS */}
      <SettingsCard icon={Bell} title={t("Notifications")}>
        <EnableNotificationsButton />
        {notifications.length === 0 ? (
          <p className="text-sm text-ink-soft">{t("No notifications yet.")}</p>
        ) : (
          <>
            <ul className="space-y-2 mb-3">
              {notifications.map((n) => (
                <li key={n._id} className="text-sm border-b border-black/5 pb-2 last:border-0">
                  <p className="font-medium text-ink">{n.title}</p>
                  <p className="text-ink-soft text-xs">{n.message}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => markAllNotificationsRead().then(() => setNotifications([]))}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              {t("Mark all as read")}
            </button>
          </>
        )}
      </SettingsCard>

      {/* SHARING */}
      <SettingsCard icon={Share2} title={t("Sharing")}>
        <p className="text-xs text-ink-soft mb-3">
          {t("WhatsApp doesn't tell us which contact you picked — we can only show what you shared, not who you sent it to.")}
        </p>
        {shareHistory.length === 0 ? (
          <p className="text-sm text-ink-soft">{t("You haven't shared any properties yet.")}</p>
        ) : (
          <>
            <ul className="space-y-2 mb-3">
              {shareHistory.map((s, i) => (
                <li key={i} className="flex items-center justify-between text-sm border-b border-black/5 pb-2 last:border-0">
                  <span className="truncate pr-2">{s.propertyTitle}</span>
                  <span className="text-xs text-ink-soft shrink-0">{new Date(s.sharedAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { clearShareHistory(); setShareHistory([]); }}
              className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
            >
              <Trash2 className="w-3 h-3" /> {t("Clear history")}
            </button>
          </>
        )}
      </SettingsCard>

      {/* PAYMENTS */}
      <SettingsCard icon={Wallet} title={t("Payment History")}>
        {loadingPayments ? (
          <p className="text-sm text-ink-soft">{t("Loading...")}</p>
        ) : (
          <div className="space-y-4">
            {user?.role === "buyer" && payments.connectFees.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-soft uppercase mb-2">{t("Connect Fees")}</p>
                <ul className="space-y-2">
                  {payments.connectFees.map((b) => (
                    <li key={b._id} className="flex justify-between text-sm">
                      <span className="truncate pr-2">{b.property?.title}</span>
                      <span className="font-semibold shrink-0">₹{b.connectFee?.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {payments.transactions.length > 0 ? (
              <div>
                <p className="text-xs font-semibold text-ink-soft uppercase mb-2">{t("Transactions")}</p>
                <ul className="space-y-2">
                  {payments.transactions.map((tx) => (
                    <li key={tx._id} className="flex justify-between text-sm">
                      <span className="truncate pr-2">{tx.property?.title}</span>
                      <span className="font-semibold shrink-0">₹{tx.amount?.toLocaleString("en-IN")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              payments.connectFees.length === 0 && <p className="text-sm text-ink-soft">{t("No payment history yet.")}</p>
            )}
          </div>
        )}
      </SettingsCard>

      {/* APP UPDATE */}
      <SettingsCard icon={RefreshCw} title={t("App Update")}>
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-soft">{updateMsg || t("You're on the latest version.")}</p>
          <button
            onClick={checkForUpdate}
            className="flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink-soft hover:border-emerald-500 hover:text-emerald-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> {t("Check for Updates")}
          </button>
        </div>
      </SettingsCard>

      {/* ACCOUNT PRIVACY */}
      <SettingsCard icon={Lock} title={t("Account Privacy")}>
        <p className="text-sm font-semibold text-ink mb-1">{t("Change Password")}</p>
        {otpStage === "done" ? (
          <div className="flex items-center gap-2 text-emerald-700 text-sm">
            <CheckCircle2 className="w-4 h-4" /> {t("Password changed successfully.")}
          </div>
        ) : otpStage === "sent" ? (
          <form onSubmit={submitOtp} className="space-y-3">
            <p className="text-xs text-ink-soft">{otpMsg}</p>
            <div>
              <label className="text-xs font-medium text-ink-soft">{t("Verification Code")}</label>
              <input
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm tracking-widest"
                placeholder="______"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-soft">{t("New Password")}</label>
              <input
                required
                type="password"
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-soft">{t("Confirm New Password")}</label>
              <input
                required
                type="password"
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
              />
            </div>
            {otpErr && <p className="text-xs text-red-600">{otpErr}</p>}
            <button
              disabled={otpBusy}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white text-sm font-semibold py-2.5 hover:bg-emerald-700 disabled:opacity-60"
            >
              {otpBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {t("Change Password")}
            </button>
          </form>
        ) : (
          <>
            <p className="text-xs text-ink-soft mb-3">
              {t("We'll email a 6-digit code to")} {user?.email}.
            </p>
            {otpErr && <p className="text-xs text-red-600 mb-2">{otpErr}</p>}
            <button
              disabled={otpBusy}
              onClick={sendOtp}
              className="rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 hover:bg-emerald-700 disabled:opacity-60"
            >
              {otpBusy ? t("Sending...") : t("Send Verification Code")}
            </button>
          </>
        )}
      </SettingsCard>

      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 rounded-full border border-red-200 text-red-600 text-sm font-semibold py-3 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" /> {t("Logout")}
      </button>
    </div>
  );
}
