import { useEffect, useState } from "react";
import { getVapidPublicKey, subscribeToPush } from "../api/push.js";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

// Handles the whole "turn on real push notifications" flow: asks the
// browser for permission (must be a user gesture — can't be silent),
// subscribes via the service worker's PushManager, and saves the
// subscription on our backend so it can actually send to this device.
export function usePushNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof Notification !== "undefined") setPermission(Notification.permission);
  }, []);

  const supported =
    typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;

  const enable = async () => {
    setError("");
    if (!supported) {
      setError("Push notifications aren't supported on this browser.");
      return false;
    }
    setLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result !== "granted") {
        setError("Notifications permission was not granted.");
        return false;
      }

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const { data } = await getVapidPublicKey();
        if (!data.publicKey) {
          setError("Push isn't configured on the server yet.");
          return false;
        }
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(data.publicKey),
        });
      }

      await subscribeToPush(subscription.toJSON());
      return true;
    } catch (err) {
      setError(err.message || "Could not enable notifications.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { permission, supported, loading, error, enable };
}
