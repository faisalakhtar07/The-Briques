import { useState } from "react";
import { useSearchParams, useNavigate, Navigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Role MUST be chosen first — if someone lands here without it, send them
  // back to the role-choice screen rather than guessing.
  if (role !== "buyer" && role !== "seller") return <Navigate to="/choose-role" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await register({ ...form, role });
      navigate(user.role === "seller" ? "/dashboard/seller" : "/dashboard/buyer");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-display font-bold mb-1">
        Create your {role === "seller" ? "Seller" : "Buyer"} account
      </h1>
      <p className="text-ink-soft text-sm mb-6">
        Not a {role}? <Link to="/choose-role" className="text-emerald-700 font-semibold">Switch account type</Link>
      </p>

      <form onSubmit={submit} className="space-y-4 bg-white rounded-xl2 shadow-card p-6">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium">Full name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone number</label>
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
          {role === "seller" && (
            <p className="text-xs text-ink-soft mt-1">
              Kept private — buyers never see this. Only visible to Admin.
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input required minLength={6} type={showPassword ? "text" : "password"} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-ink-soft">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button disabled={loading} type="submit"
          className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Creating account..." : `Sign up as ${role === "seller" ? "Seller" : "Buyer"}`}
        </button>

        <p className="text-center text-sm text-ink-soft">
          Already have an account? <Link to="/login" className="text-emerald-700 font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
}
