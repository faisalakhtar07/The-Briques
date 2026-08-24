import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth.js";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword(token, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-display font-bold mb-6">Set a new password</h1>
      <form onSubmit={submit} className="space-y-4 bg-white rounded-xl2 shadow-card p-6">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input required minLength={6} type="password" placeholder="New password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        <button disabled={loading} type="submit"
          className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Saving..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
