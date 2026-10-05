import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { logShare } from "../utils/shareHistory.js";

// Shares straight to WhatsApp via the wa.me deep link (no API key/app
// needed) — this is how property links get passed around in India far
// more than any other channel, so it matters more here than a generic
// "copy link" button would.
export default function ShareButton({ title, propertyId, className = "" }) {
  const { t } = useLanguage();
  const shareOnWhatsApp = () => {
    const text = `${title} — ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    logShare(title, propertyId);
  };

  return (
    <button
      type="button"
      onClick={shareOnWhatsApp}
      className={`flex items-center justify-center gap-2 rounded-full border border-black/10 text-sm font-semibold px-4 py-2.5 text-ink-soft hover:border-emerald-500 hover:text-emerald-700 transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" /> {t("Share on WhatsApp")}
    </button>
  );
}
