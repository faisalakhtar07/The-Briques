import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-display font-bold mb-4">Contact Us</h1>
      {sent ? (
        <p className="text-emerald-700 font-medium">Thanks! We'll get back to you shortly.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 bg-white rounded-xl2 shadow-card p-6">
          <input required placeholder="Your name" className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
          <input required type="email" placeholder="Your email" className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
          <textarea required rows={4} placeholder="Message" className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
          <button type="submit" className="rounded-full bg-emerald-600 text-white font-semibold px-6 py-2.5 hover:bg-emerald-700">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
