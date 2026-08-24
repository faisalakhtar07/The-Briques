import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

// Single login screen for Buyer/Seller/Owner (per spec: Owner gets a small
// discreet link elsewhere, not a separate look here). Admin never logs in
// through a public-facing screen.
export default function Login({ ownerMode = false }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await login(form);
      if (ownerMode && user.role !== "owner") {
        setError("This login is for Owners only.");
        return;
      }
      const dest = { buyer: "/dashboard/buyer", seller: "/dashboard/seller", owner: "/dashboard/owner", admin: "/" }[user.role] || "/";
      navigate(dest);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-display font-bold mb-1">{ownerMode ? "Owner Login" : "Welcome back"}</h1>
      <p className="text-ink-soft text-sm mb-6">
        {ownerMode ? "Manage your assigned pincode area." : "Login to your Buyer or Seller account."}
      </p>

      <form onSubmit={submit} className="space-y-4 bg-white rounded-xl2 shadow-card p-6">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input required type={showPassword ? "text" : "password"} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-ink-soft">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Link to="/forgot-password" className="text-xs text-emerald-700 font-medium mt-1 inline-block">Forgot password?</Link>
        </div>

        <button disabled={loading} type="submit"
          className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>

        {!ownerMode && (
          <p className="text-center text-sm text-ink-soft">
            New here? <Link to="/choose-role" className="text-emerald-700 font-semibold">Create an account</Link>
          </p>
        )}
      </form>

      {!ownerMode && (
        <p className="text-center text-xs text-ink-soft mt-6">
          <Link to="/owner-login" className="hover:text-emerald-700">Owner Login</Link>
        </p>
      )}
    </div>
  );
}
