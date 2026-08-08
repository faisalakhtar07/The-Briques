import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our Team', to: '/about#team' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/contact' },
    ],
  },
  {
    title: 'Properties',
    links: [
      { label: 'Fresh Properties', to: '/properties?status=Fresh' },
      { label: 'Resale Properties', to: '/properties?status=Resale' },
      { label: 'Locations', to: '/properties' },
      { label: 'Featured Properties', to: '/properties' },
    ],
  },
  {
    title: 'For Partners',
    links: [
      { label: 'Builders', to: '/builders' },
      { label: 'Dealers', to: '/dealers' },
      { label: 'List Property', to: '/register' },
      { label: 'Partner With Us', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms & Conditions', to: '/contact' },
      { label: 'Disclaimer', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="container-app grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <Building2 size={18} />
            </span>
            <span className="font-display text-lg font-bold text-paper">The Briques Reescotech</span>
          </Link>
          <p className="max-w-xs text-sm text-paper/60">
            India's dedicated platform for builder floors. Fresh & verified listings in Faridabad & NCR.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-emerald-400 hover:text-emerald-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-paper">{col.title}</h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-paper/60 transition-colors hover:text-emerald-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row">
          <span>© 2026 The Briques Reescotech. All rights reserved.</span>
          <span>Made for Faridabad & NCR</span>
        </div>
      </div>
    </footer>
  )
}
