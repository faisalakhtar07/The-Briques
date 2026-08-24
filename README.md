# The Briques — Buyer/Seller Frontend

Public-facing site: Home (dynamic hero slider), Properties browse/filter,
Property details, Buyer/Seller/Owner auth flows, and role-specific
dashboards. Installable as a PWA.

## Setup

```bash
npm install
npm run dev      # http://localhost:5173, proxies /api -> localhost:5000
npm run build    # production build + PWA service worker
```

## Business rules implemented here

- **Signup always asks Buyer or Seller first** (`/choose-role` →
  `/signup?role=...`) — `Register.jsx` refuses to render without a role.
- **Seller phone number is never fetched or shown** on any buyer-facing
  page — the public API endpoints this app calls don't even return it.
- **5-photo limit** enforced client-side (blocks the 6th file with the
  exact required message) *and* server-side, so it can't be bypassed.
- **Minimum ₹8,000 price** validated before submit, mirroring the backend.
- **Hero slider** pulls from Admin-controlled `SiteSettings.sliderImages`
  (falling back to featured properties), auto-advances every N ms
  (`sliderIntervalMs`, Admin-editable) — no slide content is hard-coded.
- **Owner Login** is a small, deliberately unobtrusive link in the footer
  and under the main Login form — not a prominent nav item.
- **PWA**: manifest + service worker via `vite-plugin-pwa`, works with the
  icons in `public/icons/`. Replace those placeholder icons with real
  branded artwork before shipping.

## What's stubbed / next steps

- Full Buyer checkout screen (Razorpay Checkout.js integration) — the
  backend endpoints (`/api/payments/create-order`, `/verify`) are ready;
  this app currently only has a "Contact / Proceed" placeholder button on
  `BuyerDashboard.jsx` where that flow should be wired in.
- Browser push notifications — in-app notification list is done; adding
  push requires a VAPID key pair and a small service-worker addition.
- Swap placeholder PWA icons in `public/icons/` for real branding.
