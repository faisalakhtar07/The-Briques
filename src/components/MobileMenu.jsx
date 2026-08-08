import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/builders', label: 'Builders' },
  { to: '/dealers', label: 'Dealers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-t border-ink/10 bg-white md:hidden"
        >
          <div className="container-app flex flex-col gap-1 py-4">
            <div className="flex justify-end pb-2">
              <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-paper-dim">
                <X size={20} />
              </button>
            </div>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-ink hover:bg-paper-dim'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3">
              <Button to="/login" variant="secondary" className="flex-1">
                Login
              </Button>
              <Button to="/register" variant="primary" className="flex-1">
                Register
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
