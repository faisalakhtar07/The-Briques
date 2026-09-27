// Loads Razorpay's checkout.js on demand (not upfront in index.html) so
// buyers who never click "Pay" don't pay the cost of loading a 3rd-party
// script. Safe to call multiple times — only injects the tag once.
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Loads checkout.js if needed, then opens the Razorpay payment popup.
// Resolves with Razorpay's response object on success, rejects on
// cancel/dismiss/script-load-failure so callers can just try/catch.
export function openRazorpayCheckout({ keyId, order, name, description, prefill }) {
  return new Promise(async (resolve, reject) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) return reject(new Error("Could not load payment gateway. Check your connection."));

    const rzp = new window.Razorpay({
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: name || "The Briques",
      description: description || "",
      prefill: prefill || {},
      theme: { color: "#059669" },
      handler: (response) => resolve(response),
      modal: { ondismiss: () => reject(new Error("Payment cancelled.")) },
    });
    rzp.on("payment.failed", () => reject(new Error("Payment failed. Please try again.")));
    rzp.open();
  });
}
