import { useEffect, useState } from "react";

// Shared install logic used by both the navbar "Install App" button and
// the App Promotion section's "Google Play" / "App Store" badges — since
// this is a PWA (not a native app), both should trigger the same install
// prompt rather than linking to real stores.
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setInstalled(isStandalone);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const canInstall = !installed && (isIOS || !!deferredPrompt);

  const promptInstall = async () => {
    if (!deferredPrompt) return false; // caller should show iOS hint instead
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return true;
  };

  return { canInstall, isIOS, installed, promptInstall };
}
