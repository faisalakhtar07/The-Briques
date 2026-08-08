import React from 'react'
import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-emerald-500 text-white hover:bg-emerald-600 shadow-card hover:shadow-lift',
  secondary:
    'bg-white text-ink border border-ink/10 hover:border-emerald-500/40 hover:text-emerald-600',
  ghost: 'text-ink hover:text-emerald-600',
  gold: 'bg-gold-500 text-ink hover:bg-gold-600',
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  icon: Icon,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        {Icon && <Icon size={16} />}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
        {Icon && <Icon size={16} />}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {Icon && <Icon size={16} />}
    </button>
  )
}
