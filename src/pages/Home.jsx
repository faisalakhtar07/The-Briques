import { useEffect, useState } from "react";
import { Building2, Handshake, Users, ShieldCheck, Layers3, MapPinned, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import RoleCard from "../components/RoleCard.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import LocationCard from "../components/LocationCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import AppPromotion from "../components/AppPromotion.jsx";
import Button from "../components/Button.jsx";
import { locations } from "../data/locations.js";
import { testimonials } from "../data/testimonials.js";
import { getPublicProperties } from "../api/properties.js";

// Roles adapted to the real system (Buyer/Seller/Owner) — Builder/Dealer
// were part of the old mock site's concept and don't exist as roles here.
const roles = [
  {
    icon: Building2,
    title: "For Sellers",
    description: "List your property and reach genuine, verified buyers faster.",
    features: ["Post your property directly", "Admin-reviewed for trust", "No broker spam", "Your phone stays private"],
    to: "/signup?role=seller",
  },
  {
    icon: Handshake,
    title: "For Owners",
    description: "Manage your assigned pincode's listings and transactions with full visibility.",
    features: ["Dedicated pincode dashboard", "Track local transactions", "Transparent commission", "Local-first support"],
    to: "/owner-login",
  },
  {
    icon: Users,
    title: "For Buyers",
    description: "Find genuine listings only — no fake prices or misleading info.",
    features: ["100% verified listings", "No fake prices", "Transparent pricing", "Direct seller connection"],
    to: "/properties",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Seller Posts Property",
    desc: "Sellers list their property with photos, price and pincode — reviewed before going live.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Owner & Admin Review",
    desc: "The pincode's assigned Owner and our Admin team verify every listing for accuracy.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Buyer Explores",
    desc: "Buyers browse verified listings, filter by price/area/rooms, and connect through the platform.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Secure Transaction",
    desc: "Payments and commissions are handled transparently, with a full record for everyone involved.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
  },
];

const whyChoose = [
  { icon: Layers3, title: "Only Builder Floors", description: "We focus exclusively on builder floors, not apartments or villas." },
  { icon: Sparkles, title: "Admin-Reviewed Listings", description: "Every listing is verified by our Admin team before going live." },
  { icon: ShieldCheck, title: "Seller Privacy Protected", description: "Seller phone numbers are never shown to buyers — ever." },
  { icon: Users, title: "Transparent Pricing", description: "See exactly what you pay, with full price history on record." },
  { icon: Handshake, title: "Fair, Configurable Commission", description: "Commission is set transparently and can never surprise you." },
  { icon: MapPinned, title: "Local-First", description: "Deep expertise in Delhi and surrounding NCR areas, via local Owners." },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProperties({ limit: 3 })
      .then(({ data }) => setProperties(data.properties))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <Stats />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading
            eyebrow="Who We Serve"
            title="What is The Briques?"
            subtitle="A dedicated platform connecting Sellers, Owners, and Buyers for builder floors in Delhi & NCR. Simple, transparent, and trustworthy."
          />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((r, i) => <RoleCard key={r.title} {...r} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* How It Works*/}

<section
  id="how-it-works-simple"
  className="py-16 md:py-24 bg-white"
>
  <div className="max-w-7xl mx-auto px-5 md:px-6">

    {/* Heading */}
    <div className="text-center mb-14 md:mb-20">
      <p className="inline-flex items-center rounded-full bg-[#faf6e8] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#8f7015] uppercase mb-5">
        Process
      </p>

      <h2 className="font-display font-bold text-3xl md:text-5xl text-ink-900">
        How It Works
      </h2>

      <p className="text-ink-500 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
        A simple, transparent process that benefits everyone in the ecosystem.
      </p>
    </div>

    {/* Steps */}
    <div className="max-w-4xl mx-auto">

      {HOW_IT_WORKS.map((step, i) => (
        <div
          key={`simple-${step.title}`}
          className="relative pb-12 md:pb-16 last:pb-0"
        >

          {/* Step Number */}
          <div className="flex items-center gap-5">
            <div
              className="
                flex-shrink-0
                h-16 w-16
                md:h-[68px] md:w-[68px]
                rounded-full
                bg-[#b58b13]
                text-white
                flex items-center justify-center
                font-display
                font-bold
                text-lg
                shadow-[0_5px_15px_rgba(181,139,19,0.20)]
              "
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-xl md:text-2xl text-ink-900">
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <div className="ml-0 md:ml-[88px] mt-5">
            <p className="text-sm md:text-base text-ink-500 leading-relaxed max-w-3xl">
              {step.desc}
            </p>
          </div>

          {/* Connecting Line */}
          {i < HOW_IT_WORKS.length - 1 && (
            <div
              className="
                absolute
                left-8
                md:left-[34px]
                top-16
                md:top-[68px]
                bottom-0
                w-px
                bg-[#e8e2d0]
              "
            />
          )}

        </div>
      ))}

    </div>
  </div>
</section>

 <HeroSlider />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col gap-14">
          <SectionHeading eyebrow="Live Inventory" title="Discover Real Builder Floors" align="left" />
          <PropertyGrid properties={properties} loading={loading} />
          <div className="flex justify-center">
            <Button to="/properties" variant="primary">View All Properties</Button>
          </div>
        </div>
      </section>

      <AppPromotion />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading eyebrow="Community" title="What People Say" subtitle="From search to keys in hand — real stories from our community." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => <TestimonialCard key={t.id} testimonial={t} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-y border-black/8 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-5 py-16 text-center">
          <h2 className="max-w-xl text-2xl font-display font-bold text-ink sm:text-3xl">
            Ready to find or list a builder floor with confidence?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/properties" variant="primary">Browse Properties</Button>
            <Button to="/choose-role" variant="secondary">List Your Property</Button>
          </div>
        </div>
      </motion.section>
    </>
  );
}
