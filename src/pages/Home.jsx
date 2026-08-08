import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Handshake, Users, ShieldCheck, Layers3, MapPinned, Sparkles } from 'lucide-react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import SectionHeading from '../components/SectionHeading'
import RoleCard from '../components/RoleCard'
import HowItWorks from '../components/HowItWorks'
import FeatureCard from '../components/FeatureCard'
import LocationCard from '../components/LocationCard'
import PropertyGrid from '../components/PropertyGrid'
import TestimonialCard from '../components/TestimonialCard'
import AppPromotion from '../components/AppPromotion'
import Button from '../components/Button'
import { locations } from '../data/locations'
import { properties } from '../data/properties'
import { testimonials } from '../data/testimonials'

const roles = [
  {
    icon: Building2,
    title: 'For Builders',
    description: 'Post only fresh builder floors and reach genuine buyers faster.',
    features: ['Post fresh properties directly', 'Faster sales cycle', 'No broker spam', 'Verified buyer leads'],
    to: '/builders',
  },
  {
    icon: Handshake,
    title: 'For Dealers',
    description: 'Access full fresh + resale inventory with fair commission system.',
    features: ['Full fresh + resale inventory', 'Verified supply chain', 'Fair commission structure', 'Lead management tools'],
    to: '/dealers',
  },
  {
    icon: Users,
    title: 'For Buyers',
    description: 'Find genuine listings only with no fake prices or misleading info.',
    features: ['100% genuine listings', 'No fake prices', 'Trusted dealers only', 'Direct builder access'],
    to: '/properties',
  },
]

const whyChoose = [
  { icon: Layers3, title: 'Only Builder Floors', description: 'We focus exclusively on builder floors, not apartments or villas.' },
  { icon: Sparkles, title: 'Fresh & Resale Separated', description: 'Clear distinction between fresh from builders and resale properties.' },
  { icon: ShieldCheck, title: 'No Fake Listings', description: 'Every listing is verified before going live on the platform.' },
  { icon: Users, title: 'Trusted Dealers Only', description: 'Our dealers are vetted and committed to fair practices.' },
  { icon: Handshake, title: 'Dealer + Builder Friendly', description: 'A platform built for all stakeholders, not just one side.' },
  { icon: MapPinned, title: 'Local-First', description: 'Deep expertise in Faridabad and surrounding NCR areas.' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />

      <section className="section-pad bg-paper">
        <div className="container-app flex flex-col items-center gap-14">
          <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
            <SectionHeading
              eyebrow="Who We Serve"
              title="What is The Briques Reescotech?"
              subtitle="A dedicated platform connecting builders, dealers, and buyers for builder floors in Faridabad & NCR. Simple, transparent, and trustworthy."
            />
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((r, i) => (
              <RoleCard key={r.title} {...r} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="section-pad bg-paper">
        <div className="container-app flex flex-col items-center gap-14">
          <SectionHeading
            eyebrow="Our Edge"
            title="Why Choose The Briques Reescotech?"
            subtitle="We're different because we understand the builder floor market inside out."
          />
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-app flex flex-col gap-14">
          <SectionHeading
            eyebrow="Coverage"
            title="Explore by Location"
            subtitle="Find builder floors in popular Faridabad & NCR areas."
            align="left"
          />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {locations.map((loc, i) => (
              <LocationCard key={loc.id} location={loc} delay={i * 0.05} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button to="/properties" variant="secondary">
              View All Locations
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-app flex flex-col gap-14">
          <SectionHeading eyebrow="Live Inventory" title="Discover Real Builder Floors" align="left" />
          <PropertyGrid properties={properties.slice(0, 3)} />
          <div className="flex justify-center">
            <Button to="/properties" variant="primary">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      <AppPromotion />

      <section className="section-pad bg-paper">
        <div className="container-app flex flex-col items-center gap-14">
          <SectionHeading
            eyebrow="Community"
            title="What People Say"
            subtitle="From search to keys in hand — real stories from our community."
          />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-y border-ink/8 bg-white"
      >
        <div className="container-app flex flex-col items-center gap-5 py-16 text-center">
          <h2 className="max-w-xl text-2xl font-bold text-ink sm:text-3xl">
            Ready to find or list a builder floor with confidence?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/properties" variant="primary">
              Browse Properties
            </Button>
            <Button to="/register" variant="secondary">
              List Your Property
            </Button>
          </div>
        </div>
      </motion.section>
    </>
  )
}
