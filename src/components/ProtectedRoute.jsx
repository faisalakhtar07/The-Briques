import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wraps a route and enforces both "must be logged in" and "must have role X".
// This is a UX convenience only — the backend enforces the real permission
// boundary via protect()/restrictTo() on every API route.
export default function ProtectedRoute({ children, allow = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center text-ink-soft">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
