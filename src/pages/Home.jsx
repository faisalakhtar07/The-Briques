import { useEffect, useState } from "react";
import {
  Building2,
  Handshake,
  Users,
  ShieldCheck,
  Layers3,
  MapPinned,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import RoleCard from "../components/RoleCard.jsx";
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

/* =========================================================
   ROLES
========================================================= */

const roles = [
  {
    icon: Building2,
    title: "For Sellers",
    description:
      "List your property and reach genuine, verified buyers faster.",
    features: [
      "Post your property directly",
      "Admin-reviewed for trust",
      "No broker spam",
      "Your phone stays private",
    ],
    to: "/signup?role=seller",
  },
  {
    icon: Handshake,
    title: "For Owners",
    description:
      "Manage your assigned pincode's listings and transactions with full visibility.",
    features: [
      "Dedicated pincode dashboard",
      "Track local transactions",
      "Transparent commission",
      "Local-first support",
    ],
    to: "/owner-login",
  },
  {
    icon: Users,
    title: "For Buyers",
    description:
      "Find genuine listings only — no fake prices or misleading info.",
    features: [
      "100% verified listings",
      "No fake prices",
      "Transparent pricing",
      "Direct seller connection",
    ],
    to: "/properties",
  },
];

/* =========================================================
   HOW IT WORKS
========================================================= */

const HOW_IT_WORKS = [
  {
    title: "Seller Posts Property",
    desc: "Sellers list their property with photos, price and pincode — reviewed before going live.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Owner & Admin Review",
    desc: "The pincode's assigned Owner and our Admin team verify every listing for accuracy.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Buyer Explores",
    desc: "Buyers browse verified listings, filter by price/area/rooms, and connect through the platform.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Secure Transaction",
    desc: "Payments and commissions are handled transparently, with a full record for everyone involved.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90",
  },
];

/* =========================================================
   WHY CHOOSE THE BRIQUES
========================================================= */

const whyChoose = [
  {
    icon: Layers3,
    title: "Only Builder Floors",
    description:
      "We focus exclusively on builder floors, not apartments or villas.",
  },
  {
    icon: Sparkles,
    title: "Admin-Reviewed Listings",
    description:
      "Every listing is verified by our Admin team before going live.",
  },
  {
    icon: ShieldCheck,
    title: "Seller Privacy Protected",
    description:
      "Seller phone numbers are never shown to buyers — ever.",
  },
  {
    icon: Users,
    title: "Transparent Pricing",
    description:
      "See exactly what you pay, with full price history on record.",
  },
  {
    icon: Handshake,
    title: "Fair, Configurable Commission",
    description:
      "Commission is set transparently and can never surprise you.",
  },
  {
    icon: MapPinned,
    title: "Local-First",
    description:
      "Deep expertise in Delhi and surrounding NCR areas, via local Owners.",
  },
];

/* =========================================================
   HOME PAGE
========================================================= */

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
      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />

      {/* =====================================================
          STATS
      ===================================================== */}

      <Stats />

      {/* =====================================================
          WHAT IS THE BRIQUES
      ===================================================== */}

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading
            eyebrow="Who We Serve"
            title="What is The Briques?"
            subtitle="A dedicated platform connecting Sellers, Owners, and Buyers for builder floors in Delhi & NCR. Simple, transparent, and trustworthy."
          />

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((r, i) => (
              <RoleCard key={r.title} {...r} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE THE BRIQUES
          NO IMAGES
      ===================================================== */}

      <section className="py-20 md:py-28 bg-paper">
        <div className="mx-auto max-w-7xl px-4">

          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase mb-3">
              Our Edge
            </p>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-ink-900">
              Why Choose The Briques?
            </h2>

            <p className="text-ink-500 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
              We understand the builder floor market inside out.
            </p>
          </div>

          {/* Why Choose Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {whyChoose.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[26px]
                    border border-cloud-200
                    bg-white
                    p-7 md:p-8
                    min-h-[235px]
                    shadow-[0_15px_45px_rgba(0,0,0,0.06)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_55px_rgba(0,0,0,0.10)]
                  "
                >

                  {/* Background Number */}
                  <div
                    className="
                      absolute
                      top-2
                      right-5
                      text-[80px]
                      leading-none
                      font-display
                      font-bold
                      text-ink-900/[0.035]
                      select-none
                      pointer-events-none
                    "
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div
                    className="
                      relative
                      z-10
                      h-12
                      w-12
                      rounded-2xl
                      bg-brand-500/10
                      text-brand-600
                      flex
                      items-center
                      justify-center
                      mb-6
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      relative
                      z-10
                      font-display
                      font-bold
                      text-xl
                      text-ink-900
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      relative
                      z-10
                      mt-3
                      text-sm
                      leading-relaxed
                      text-ink-500
                      max-w-sm
                    "
                  >
                    {item.description}
                  </p>

                  {/* Bottom Hover Line */}
                  <div
                    className="
                      absolute
                      left-7
                      right-7
                      bottom-0
                      h-[2px]
                      bg-brand-500
                      scale-x-0
                      origin-left
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
          IMAGE BACKGROUND + STICKY STACKING
      ===================================================== */}

      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-14 md:mb-20">
            <p
              className="
                inline-flex
                items-center
                rounded-full
                bg-[#faf6e8]
                px-4
                py-2
                text-xs
                font-semibold
                tracking-[0.16em]
                text-[#8f7015]
                uppercase
                mb-5
              "
            >
              Process
            </p>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-ink-900">
              How It Works
            </h2>

            <p className="text-ink-500 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
              A simple, transparent process that benefits everyone in the
              ecosystem.
            </p>
          </div>

          {/* Sticky Stacked Cards */}
          <div className="relative max-w-6xl mx-auto pb-24">

            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.title}
                className="sticky"
                style={{
                  top: `${75 + i * 24}px`,
                  zIndex: i + 1,
                }}
              >

                {/* Main Card */}
                <div
                  className="
                    relative
                    mb-8
                    min-h-[440px]
                    md:min-h-[540px]
                    rounded-[28px]
                    md:rounded-[36px]
                    overflow-hidden
                    bg-white
                    border border-cloud-200
                    shadow-[0_25px_70px_rgba(0,0,0,0.13)]
                  "
                >

                  {/* =================================================
                      BACKGROUND IMAGE
                  ================================================= */}

                  <div className="absolute inset-0">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    {/* Dark Gradient Left */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black/75
                        via-black/40
                        to-black/10
                      "
                    />

                    {/* Bottom Gradient */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/65
                        via-transparent
                        to-transparent
                      "
                    />
                  </div>

                  {/* =================================================
                      STEP NUMBER CIRCLE
                  ================================================= */}

                  <div
                    className="
                      absolute
                      top-6
                      left-6
                      md:top-8
                      md:left-8
                      z-20
                    "
                  >
                    <div
                      className="
                        h-12
                        w-12
                        md:h-14
                        md:w-14
                        rounded-full
                        bg-brand-500
                        text-white
                        flex
                        items-center
                        justify-center
                        font-display
                        font-bold
                        text-lg
                        md:text-xl
                        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                      "
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* =================================================
                      LARGE BACKGROUND NUMBER
                  ================================================= */}

                  <div
                    className="
                      absolute
                      right-5
                      top-3
                      md:right-10
                      md:top-0
                      text-[120px]
                      md:text-[190px]
                      font-display
                      font-bold
                      text-white/10
                      leading-none
                      select-none
                      pointer-events-none
                      z-10
                    "
                  >
                    {i + 1}
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div
                    className="
                      relative
                      z-20
                      flex
                      items-end
                      min-h-[440px]
                      md:min-h-[540px]
                      p-7
                      md:p-12
                    "
                  >
                    <div className="max-w-2xl text-white">

                      {/* Step Label */}
                      <p
                        className="
                          text-xs
                          md:text-sm
                          font-semibold
                          tracking-[0.18em]
                          uppercase
                          text-white/75
                          mb-3
                        "
                      >
                        Step {i + 1}
                      </p>

                      {/* Title */}
                      <h3
                        className="
                          font-display
                          font-bold
                          text-3xl
                          md:text-5xl
                          leading-tight
                        "
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="
                          mt-4
                          text-sm
                          md:text-lg
                          text-white/85
                          leading-relaxed
                          max-w-xl
                        "
                      >
                        {step.desc}
                      </p>

                      {/* Progress */}
                      <div className="mt-7 flex items-center gap-3">

                        <div
                          className="
                            h-1.5
                            w-32
                            md:w-48
                            bg-white/25
                            rounded-full
                            overflow-hidden
                          "
                        >
                          <div
                            className="
                              h-full
                              bg-brand-500
                              rounded-full
                            "
                            style={{
                              width: `${
                                ((i + 1) / HOW_IT_WORKS.length) * 100
                              }%`,
                            }}
                          />
                        </div>

                        <span className="text-xs text-white/70">
                          {i + 1} / {HOW_IT_WORKS.length}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          HERO SLIDER
          COMPLETELY SEPARATE FROM HOW IT WORKS
      ===================================================== */}

      <HeroSlider />

      {/* =====================================================
          LIVE INVENTORY
      ===================================================== */}

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col gap-14">

          <SectionHeading
            eyebrow="Live Inventory"
            title="Discover Real Builder Floors"
            align="left"
          />

          <PropertyGrid
            properties={properties}
            loading={loading}
          />

          <div className="flex justify-center">
            <Button to="/properties" variant="primary">
              View All Properties
            </Button>
          </div>

        </div>
      </section>

      {/* =====================================================
          APP PROMOTION
      ===================================================== */}

      <AppPromotion />

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">

          <SectionHeading
            eyebrow="Community"
            title="What People Say"
            subtitle="From search to keys in hand — real stories from our community."
          />

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">

            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                delay={i * 0.08}
              />
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-y border-black/8 bg-white"
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            flex
            flex-col
            items-center
            gap-5
            py-16
            text-center
          "
        >

          <h2
            className="
              max-w-xl
              text-2xl
              font-display
              font-bold
              text-ink
              sm:text-3xl
            "
          >
            Ready to find or list a builder floor with confidence?
          </h2>

          <div className="flex flex-wrap justify-center gap-3">

            <Button to="/properties" variant="primary">
              Browse Properties
            </Button>

            <Button to="/choose-role" variant="secondary">
              List Your Property
            </Button>

          </div>
        </div>
      </motion.section>

    </>
  );
}