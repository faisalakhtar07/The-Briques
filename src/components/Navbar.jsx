import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, Building2 } from 'lucide-react'
import Button from './Button'
import MobileMenu from './MobileMenu'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/builders', label: 'Builders' },
  { to: '/dealers', label: 'Dealers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-card backdrop-blur-md' : 'bg-paper'
      }`}
    >
      <div className="container-app flex h-18 items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <Building2 size={18} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            The Briques Reescotech
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-ink/70 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => navigate('/properties')}
            aria-label="Search properties"
            className="rounded-full p-2.5 text-ink/70 hover:bg-paper-dim hover:text-ink"
          >
            <Search size={18} />
          </button>
          <Button to="/login" variant="ghost">
            Login
          </Button>
          <Button to="/register" variant="primary">
            Register
          </Button>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-ink md:hidden"
        >
          <Menu size={22} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
