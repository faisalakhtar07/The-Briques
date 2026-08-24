import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, Building2, User, LogOut, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navLink = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-emerald-600" : "text-ink-soft hover:text-emerald-600"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "seller" ? "/dashboard/seller" : user?.role === "buyer" ? "/dashboard/buyer" : "/";

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-ink">
          <Home className="w-6 h-6 text-emerald-600" />
          The Briques
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLink} end>Home</NavLink>
          <NavLink to="/properties" className={navLink}>Properties</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to={dashboardPath} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-emerald-600">
                <User className="w-4 h-4" /> {user.name?.split(" ")[0]}
              </Link>
              <button
                onClick={async () => { await logout(); navigate("/"); }}
                className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-red-600"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-emerald-600">Login</Link>
              <Link to="/signup" className="rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2 shadow-card hover:bg-emerald-700">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-paper px-4 py-3 flex flex-col gap-2">
          <NavLink to="/" onClick={() => setOpen(false)} className={navLink} end>Home</NavLink>
          <NavLink to="/properties" onClick={() => setOpen(false)} className={navLink}>Properties</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={navLink}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={navLink}>Contact</NavLink>
          {user ? (
            <>
              <Link to={dashboardPath} onClick={() => setOpen(false)} className={navLink({ isActive: false })}>Dashboard</Link>
              <button onClick={async () => { await logout(); setOpen(false); navigate("/"); }} className="text-left px-3 py-2 text-sm font-medium text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className={navLink({ isActive: false })}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className={navLink({ isActive: false })}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
