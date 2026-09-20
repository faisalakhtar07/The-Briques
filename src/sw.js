/* eslint-disable no-restricted-globals */
// Custom service worker source (Workbox injectManifest strategy) — adds
// real push notification handling (sound + swipe-down tray, works even
// with the app fully closed) on top of the PWA's normal offline caching.

import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

// A push arrived from our backend (via web-push). Show it as a native OS
// notification — the browser/OS plays its own default notification sound
// automatically, the same as WhatsApp/Instagram, with no extra setup
// needed on our side. Works even if no tab is open.
self.addEventListener("push", (event) => {
  let data = { title: "The Briques", body: "You have a new update.", url: "/" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    // non-JSON payload — fall back to defaults
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      vibrate: [200, 100, 200],
      data: { url: data.url || "/" },
      tag: data.tag || undefined,
    })
  );
});

// Tapping the notification (from the pulled-down tray) opens/focuses the
// app at the relevant page, like Instagram/WhatsApp do.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});
