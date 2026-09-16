import { useEffect, useState } from "react";
import {
  Building2,
  Handshake,
  Users,
  ShieldCheck,
  Layers3,
  MapPinned,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

import SectionHeading from "../components/SectionHeading.jsx";
import RoleCard from "../components/RoleCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import AppPromotion from "../components/AppPromotion.jsx";
import Button from "../components/Button.jsx";
import Stats from "../components/Stats.jsx";
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
      "List your builder floor and reach genuine buyers through a clean and trusted platform.",
    features: [
      "Post your property directly",
      "Admin-reviewed before publishing",
      "No broker spam",
      "Your phone stays private",
    ],
    to: "/signup?role=seller",
  },
  {
    icon: Handshake,
    title: "For Owners",
    description:
      "Manage your assigned pincode listings and transactions with complete visibility.",
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
      "Explore genuine builder-floor listings with clear pricing and useful property details.",
    features: [
      "Verified listings",
      "Transparent pricing",
      "Smart property discovery",
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
    desc: "Sellers add photos, price, location and property details. Every listing goes through a review before becoming visible.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Owner & Admin Review",
    desc: "The assigned Owner and Admin team review the listing so buyers can discover properties with greater confidence.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Buyer Explores",
    desc: "Buyers browse builder floors, compare details and discover properties based on their needs, budget and location.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Secure Transaction",
    desc: "The platform keeps the process transparent with clear records for the people involved in the transaction.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90",
  },
];

/* =========================================================
   WHY CHOOSE
========================================================= */

const whyChoose = [
  {
    icon: Layers3,
    title: "Only Builder Floors",
    description:
      "A focused platform built around builder floors instead of trying to list everything in real estate.",
  },
  {
    icon: Sparkles,
    title: "Admin-Reviewed Listings",
    description:
      "Listings are reviewed before going live to keep property information cleaner and more reliable.",
  },
  {
    icon: ShieldCheck,
    title: "Seller Privacy",
    description:
      "Seller contact details stay protected while buyers connect through the platform.",
  },
  {
    icon: Users,
    title: "Transparent Pricing",
    description:
      "Property information and pricing are presented clearly so buyers know what they are exploring.",
  },
  {
    icon: Handshake,
    title: "Fair Commission",
    description:
      "Commission rules can be configured transparently instead of surprising participants later.",
  },
  {
    icon: MapPinned,
    title: "Local-First",
    description:
      "Local Owners help bring area-level understanding to the builder-floor discovery experience.",
  },
];

/* =========================================================
   SEARCH OPTIONS
========================================================= */

const searchItems = [
  "Location",
  "Property Type",
  "Budget",
  "Bedrooms",
];

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProperties({ limit: 3 })
      .then(({ data }) => {
        setProperties(data.properties);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* =====================================================
          DISCOVER REAL BUILDER FLOORS
          This is intentionally FIRST after Header.
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#11110f] text-white">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
            alt=""
            className="h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Discover better. Buy with confidence.
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Discover Real
              <span className="block text-white/65">
                Builder Floors.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Explore carefully presented builder-floor properties with
              transparent details, local insight and a simpler way to find
              your next home.
            </p>
          </motion.div>

          {/* =================================================
              SEARCH PANEL
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-9 max-w-5xl rounded-[28px] border border-white/15 bg-white/[0.10] p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-1 rounded-[22px] bg-white p-2 text-ink-900 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.8fr_auto]">
              {searchItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className="group flex min-h-[66px] items-center gap-3 rounded-2xl px-4 text-left transition hover:bg-black/[0.035]"
                >
                  {/* Icon */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.045]">
                    {index === 0 ? (
                      <MapPinned size={18} />
                    ) : index === 1 ? (
                      <Building2 size={18} />
                    ) : index === 2 ? (
                      <Search size={18} />
                    ) : (
                      <Users size={18} />
                    )}
                  </span>

                  {/* Text */}
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                      {item}
                    </span>

                    <span className="mt-1 block text-sm font-semibold">
                      {index === 0
                        ? "Choose a location"
                        : index === 1
                          ? "Builder Floor"
                          : index === 2
                            ? "Select your range"
                            : "Any"}
                    </span>
                  </span>
                </button>
              ))}

              {/* Explore Button */}
              <Button to="/properties" variant="primary">
                <span className="inline-flex items-center gap-2">
                  Explore
                  <ArrowRight size={16} />
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Trust Points */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/55">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={14} />
              Reviewed listings
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={14} />
              Clear property details
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={14} />
              Privacy-focused
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <Stats />

      {/* =====================================================
          WHAT IS THE BRIQUES?
      ====================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4">
          <SectionHeading
            eyebrow="The Platform"
            title="What is The Briques?"
            subtitle="A dedicated platform connecting Sellers, Owners, and Buyers for builder floors. Simple, transparent, and built around a focused property experience."
          />

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {roles.map((role, index) => (
              <RoleCard
                key={role.title}
                {...role}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE THE BRIQUES?
      ====================================================== */}

      <section className="bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Our Edge
            </p>

            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 md:text-5xl">
              Why Choose The Briques?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
              A focused approach to builder-floor discovery, with clarity and
              trust built into the experience.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="group relative min-h-[235px] overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#fbfaf7] p-7 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)] md:p-8"
                >
                  {/* Number */}
                  <span className="absolute right-6 top-4 select-none font-display text-6xl font-bold text-black/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition duration-300 group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-ink-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
                    {item.description}
                  </p>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
          STICKY STACKED IMAGE CARDS
      ====================================================== */}

      <section
        id="how-it-works"
        className="bg-[#f5f4f0] px-4 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-14 text-center md:mb-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Simple Process
            </p>

            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 md:text-5xl">
              How It Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
              Four clear steps from listing a property to completing the
              transaction.
            </p>
          </div>

          {/* Sticky Cards */}
          <div className="mx-auto max-w-5xl pb-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step.title}
                className="sticky mb-6 md:mb-8"
                style={{
                  top: `${88 + index * 18}px`,
                  zIndex: index + 1,
                }}
              >
                <motion.article
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-70px",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/15 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.18)] md:min-h-[520px]"
                >
                  {/* Background Image */}
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 md:p-12">
                    {/* Top Row */}
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 font-display text-sm font-bold backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        Step {index + 1} / 4
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                      {step.desc}
                    </p>

                    {/* Progress */}
                    <div className="mt-7 h-px w-full max-w-xl bg-white/20">
                      <div
                        className="h-full bg-white/80"
                        style={{
                          width: `${((index + 1) / 4) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HERO SLIDER
      ====================================================== */}

      <HeroSlider />

      {/* =====================================================
          LIVE PROPERTY INVENTORY
      ====================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Live Inventory"
              title="More Builder Floors to Explore"
              subtitle="Browse current property listings and discover a home that fits your needs."
              align="left"
            />

            <Button to="/properties" variant="secondary">
              <span className="inline-flex items-center gap-2">
                View All
                <ChevronRight size={17} />
              </span>
            </Button>
          </div>

          <PropertyGrid
            properties={properties}
            loading={loading}
          />
        </div>
      </section>

      {/* =====================================================
          APP PROMOTION
      ====================================================== */}

      <AppPromotion />

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4">
          <SectionHeading
            eyebrow="Community"
            title="What People Say"
            subtitle="From search to keys in hand — stories from the people using the platform."
          />

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
        }}
        className="border-y border-black/8 bg-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-20 text-center md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            Your Next Move
          </p>

          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Ready to find your next builder floor?
          </h2>

          <p className="max-w-xl text-sm leading-7 text-ink-500">
            Explore properties or list your own property with The Briques.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
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