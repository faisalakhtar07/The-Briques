import { useState } from "react";
import { Download, Share, X } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall.js";

export default function InstallAppButton() {
  const { canInstall, isIOS, promptInstall } = usePWAInstall();
  const [showIOSHint, setShowIOSHint] = useState(false);

  if (!canInstall) return null;

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSHint(true);
      return;
    }
    await promptInstall();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2 hover:bg-emerald-700 transition-colors"
      >
        <Download size={16} /> Install App
      </button>

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
    </>
  );
}
