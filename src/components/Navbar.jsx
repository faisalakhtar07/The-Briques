import InstallAppButton from "./InstallAppButton.jsx";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navLink = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "text-emerald-600"
      : "text-ink-soft hover:text-emerald-600"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "seller"
      ? "/dashboard/seller"
      : user?.role === "buyer"
      ? "/dashboard/buyer"
      : "/";

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            onClick={closeMenu}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Home className="h-4.5 w-4.5" />
            </div>

            <div className="leading-none">
              <div className="font-display text-lg font-bold tracking-tight text-ink">
                The Briques
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                Better Spaces
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" className={navLink} end>
              Home
            </NavLink>

            <NavLink to="/properties" className={navLink}>
              Properties
            </NavLink>

            <NavLink to="/about" className={navLink}>
              About
            </NavLink>

            <NavLink to="/contact" className={navLink}>
              Contact
            </NavLink>
          </nav>

          {/* DESKTOP RIGHT */}
          <div className="hidden items-center gap-3 md:flex">
            <InstallAppButton />

            {user ? (
              <>
                <Link
                  to={dashboardPath}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-black/5 hover:text-emerald-600"
                >
                  <User className="h-4 w-4" />
                  {user.name?.split(" ")[0]}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-black/5 hover:text-emerald-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="group flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-emerald-700 hover:shadow-md"
                >
                  Sign Up
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON — RIGHT SIDE */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-ink shadow-sm backdrop-blur transition-all duration-300 hover:border-emerald-600 hover:text-emerald-600 active:scale-95 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* RIGHT SIDE MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-[82%] max-w-[360px] bg-paper shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* MENU HEADER */}
        <div className="flex h-[72px] items-center justify-between border-b border-black/5 px-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Navigation
            </p>

            <h2 className="mt-1 font-display text-xl font-bold text-ink">
              The Briques
            </h2>
          </div>

          <button
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MENU LINKS */}
        <div className="flex h-[calc(100%-72px)] flex-col px-5 py-6">
          <nav className="space-y-1">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-ink hover:bg-black/5"
                }`
              }
            >
              Home
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>

            <NavLink
              to="/properties"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-ink hover:bg-black/5"
                }`
              }
            >
              Properties
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-ink hover:bg-black/5"
                }`
              }
            >
              About
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-ink hover:bg-black/5"
                }`
              }
            >
              Contact
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>
          </nav>

          {/* BOTTOM AREA */}
          <div className="mt-auto border-t border-black/5 pt-5">
            <InstallAppButton />

            {user ? (
              <div className="mt-4 space-y-2">
                <Link
                  to={dashboardPath}
                  onClick={closeMenu}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-sm"
                >
                  <User className="h-4 w-4 text-emerald-600" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-black/5"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              Better spaces. Better living.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}