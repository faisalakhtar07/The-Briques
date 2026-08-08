import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  MapPin,
  BedDouble,
  Ruler,
  Layers,
  Calendar,
  Phone,
  MessageCircle,
  Check,
} from 'lucide-react'
import { getPropertyById, properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function PropertyDetails() {
  const { id } = useParams()
  const property = getPropertyById(id)
  const [activeImage, setActiveImage] = useState(0)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduled, setScheduled] = useState(false)

  if (!property) {
    return (
      <div className="container-app section-pad text-center">
        <h1 className="text-2xl font-bold text-ink">Property not found</h1>
        <Link to="/properties" className="mt-4 inline-block text-emerald-600 underline">
          Back to properties
        </Link>
      </div>
    )
  }

  const similar = properties.filter((p) => p.id !== property.id && p.bhk === property.bhk).slice(0, 3)
  const whatsappLink = `https://wa.me/${property.dealer.phone.replace('+', '')}?text=${encodeURIComponent(
    `Hi, I'm interested in ${property.title} in ${property.location} listed on The Briques Reescotech.`
  )}`

  return (
    <div className="bg-paper pb-24">
      <div className="container-app pt-8">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:grid-rows-2">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            src={property.gallery[activeImage]}
            alt={property.title}
            className="col-span-4 h-72 w-full rounded-2xl object-cover sm:col-span-3 sm:row-span-2 sm:h-[26rem]"
          />
          {property.gallery.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              className={`hidden overflow-hidden rounded-xl sm:block ${activeImage === i ? 'ring-2 ring-emerald-500' : ''}`}
            >
              <img src={img} alt="" className="h-32 w-full object-cover sm:h-[12.5rem]" />
            </button>
          ))}
        </div>
      </div>

      <div className="container-app mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {property.verified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={13} /> Verified
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  property.status === 'Fresh' ? 'bg-emerald-500 text-white' : 'bg-gold-500 text-ink'
                }`}
              >
                {property.status}
              </span>
              <span className="rounded-full bg-paper-dim px-3 py-1 text-xs font-semibold text-ink/60">
                {property.type}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{property.title}</h1>
            <span className="mt-1 flex items-center gap-1 text-sm text-ink/55">
              <MapPin size={15} /> {property.location}
            </span>
            <span className="mt-3 block text-3xl font-bold text-emerald-600">{property.price}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-ink/8 bg-white p-6 shadow-card sm:grid-cols-4">
            {[
              { icon: BedDouble, label: 'Bedrooms', value: `${property.bhk} BHK` },
              { icon: Ruler, label: 'Area', value: `${property.area} sq.ft.` },
              { icon: Layers, label: 'Floor', value: property.floor },
              { icon: Calendar, label: 'Possession', value: property.possession },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                <s.icon size={18} className="text-emerald-500" />
                <span className="text-sm font-semibold text-ink">{s.value}</span>
                <span className="text-xs text-ink/45">{s.label}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-ink">Description</h2>
            <p className="text-sm leading-relaxed text-ink/65">{property.description}</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-ink">Amenities</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <span key={a} className="flex items-center gap-2 text-sm text-ink/70">
                  <Check size={15} className="text-emerald-500" /> {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-5 rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                {property.dealer.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{property.dealer.name}</p>
                <p className="text-xs text-ink/50">{property.dealer.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button href={`tel:${property.dealer.phone}`} variant="primary" icon={Phone} className="w-full">
                Contact Dealer
              </Button>
              <Button href={whatsappLink} variant="secondary" icon={MessageCircle} className="w-full">
                WhatsApp
              </Button>
              <Button onClick={() => setScheduleOpen(true)} variant="ghost" className="w-full border border-ink/10">
                Schedule Visit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="container-app mt-16">
          <h2 className="mb-6 text-xl font-bold text-ink">Similar Properties</h2>
          <PropertyGrid properties={similar} />
        </div>
      )}

      <Modal open={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Schedule a Visit">
        {scheduled ? (
          <p className="text-sm text-emerald-600">Your visit request has been sent to {property.dealer.name}. They'll confirm shortly.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setScheduled(true)
            }}
            className="flex flex-col gap-4"
          >
            <input required placeholder="Your name" className="rounded-xl border border-ink/12 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <input required type="date" className="rounded-xl border border-ink/12 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <input required type="tel" placeholder="Phone number" className="rounded-xl border border-ink/12 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
            <button type="submit" className="rounded-full bg-emerald-500 py-2.5 text-sm font-semibold text-white">
              Confirm Visit
            </button>
          </form>
        )}
      </Modal>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink/10 bg-white p-3 shadow-lift lg:hidden">
        <Button href={`tel:${property.dealer.phone}`} variant="secondary" icon={Phone} className="flex-1">
          Call
        </Button>
        <Button href={whatsappLink} variant="primary" icon={MessageCircle} className="flex-1">
          WhatsApp
        </Button>
      </div>
    </div>
  )
}
