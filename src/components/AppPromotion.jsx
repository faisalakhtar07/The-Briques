import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Play, ShieldCheck, MapPin, CheckCircle2, Share, X } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall.js";

// Same "coming soon" mobile-app promo as the original site. Since this is
// a PWA (not a native app on either store), both the "Google Play" and
// "App Store" badges trigger the same install prompt instead of linking
// to real store listings that don't exist.
export default function AppPromotion() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { canInstall, isIOS, promptInstall } = usePWAInstall();
  const [showIOSHint, setShowIOSHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSHint(true);
      return;
    }
    await promptInstall();
  };

  return (
    <section className="overflow-hidden bg-emerald-900 text-paper py-16">
      <div className="mx-auto max-w-7xl px-4 grid items-center gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            {canInstall ? "Available Now" : "Coming Soon"}
          </span>
          <h2 className="text-3xl font-display font-bold leading-tight sm:text-4xl">
            Get the best builder floor listings right in your pocket.
          </h2>
          <p className="text-emerald-100/80">
            {canInstall ? "Install the app — no store download needed." : "Be the first to know when we launch!"}
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-emerald-100">
              <CheckCircle2 size={18} className="text-emerald-300" /> You're on the list — we'll notify you at launch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-emerald-300"
              />
              <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50">
                Notify Me
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleInstallClick}
              disabled={!canInstall}
              className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={15} /> Google Play
            </button>
            <button
              onClick={handleInstallClick}
              disabled={!canInstall}
              className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Apple size={15} /> App Store
            </button>
          </div>
          {canInstall && (
            <p className="text-[11px] text-emerald-200/70">
              Installs directly from your browser — it's a web app, so there's nothing to review or approve in an app store.
            </p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }} className="mx-auto w-56">
          <div className="rounded-[2.2rem] border-4 border-white/15 bg-emerald-950 p-3 shadow-lift">
            <div className="overflow-hidden rounded-3xl bg-paper">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" alt="Listing preview on mobile app" className="h-40 w-full object-cover" />
              <div className="flex flex-col gap-2 p-3">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600"><ShieldCheck size={11} /> Verified</span>
                <span className="text-xs font-bold text-ink">3 BHK Builder Floor</span>
                <span className="flex items-center gap-1 text-[10px] text-ink-soft"><MapPin size={10} /> Sector 85, Faridabad</span>
                <span className="text-sm font-bold text-emerald-600">₹1.25 Cr</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {showIOSHint && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl2 shadow-lift max-w-sm w-full p-5 relative">
            <button onClick={() => setShowIOSHint(false)} className="absolute top-3 right-3 text-ink-soft">
              <X size={18} />
            </button>
            <h3 className="font-display font-bold text-ink mb-2">Install on iPhone</h3>
            <p className="text-sm text-ink-soft mb-3">
              Tap the <Share size={14} className="inline mx-1" /> Share button in Safari, then scroll down and tap
              <span className="font-semibold text-ink"> "Add to Home Screen"</span>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
