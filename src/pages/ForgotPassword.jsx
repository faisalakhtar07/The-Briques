import { useState } from "react";
import { forgotPassword } from "../api/auth.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await forgotPassword(email);
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-display font-bold mb-1">Forgot password</h1>
      <p className="text-ink-soft text-sm mb-6">We'll send a reset link to your registered email.</p>

      <form onSubmit={submit} className="space-y-4 bg-white rounded-xl2 shadow-card p-6">
        {message && <p className="text-emerald-700 text-sm">{message}</p>}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        </div>
        <button disabled={loading} type="submit"
          className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
