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
  CheckCircle2,
  Search,
  Home,
  BadgeCheck,
  KeyRound,
} from "lucide-react";
import { motion } from "framer-motion";

import Stats from "../components/Stats.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import RoleCard from "../components/RoleCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import AppPromotion from "../components/AppPromotion.jsx";
import Button from "../components/Button.jsx";

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
      "List your builder floor and reach genuine buyers through a trusted platform.",
    features: [
      "Post your property directly",
      "Admin-reviewed listing",
      "No broker spam",
      "Seller privacy protected",
    ],
    to: "/signup?role=seller",
  },
  {
    icon: Handshake,
    title: "For Owners",
    description:
      "Manage your assigned pincode listings and transactions with complete visibility.",
    features: [
      "Dedicated dashboard",
      "Track local listings",
      "Transparent commission",
      "Local-first support",
    ],
    to: "/owner-login",
  },
  {
    icon: Users,
    title: "For Buyers",
    description:
      "Explore carefully presented builder floors with clear property information.",
    features: [
      "Verified listings",
      "Transparent pricing",
      "Property details",
      "Direct seller connection",
    ],
    to: "/properties",
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
      "The Briques focuses specifically on builder floors instead of mixing unrelated property categories.",
  },
  {
    icon: BadgeCheck,
    title: "Admin-Reviewed Listings",
    description:
      "Listings go through an admin review process before being presented to buyers.",
  },
  {
    icon: ShieldCheck,
    title: "Seller Privacy",
    description:
      "Seller information is handled carefully so buyers can explore without unnecessary exposure.",
  },
  {
    icon: Sparkles,
    title: "Clear Property Details",
    description:
      "Important property information is presented in a simple and easy-to-understand format.",
  },
  {
    icon: Handshake,
    title: "Transparent Process",
    description:
      "From listing to buyer connection, the platform keeps the process straightforward.",
  },
  {
    icon: MapPinned,
    title: "Local Focus",
    description:
      "Built around local property discovery and the people who understand the market.",
  },
];

/* =========================================================
   HOW IT WORKS
========================================================= */

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Seller Posts Property",
    desc:
      "Sellers add their builder floor with photos, location, price and important property details.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    number: "02",
    title: "Property Gets Reviewed",
    desc:
      "The listing goes through the platform's review process before becoming visible to buyers.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
  },
  {
    number: "03",
    title: "Buyer Explores",
    desc:
      "Buyers browse properties, compare details and find builder floors that match their requirements.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90",
  },
  {
    number: "04",
    title: "Connect & Move Forward",
    desc:
      "Once a suitable property is found, buyers and sellers can move forward through the platform.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90",
  },
];

/* =========================================================
   EDITORIAL IMAGE SECTIONS
========================================================= */

const STORY_SECTIONS = [
  {
    eyebrow: "THE BRIQUES",
    title: "A better way to discover your next home.",
    text:
      "Finding a builder floor should not feel complicated. The Briques brings property discovery, clear information and a more focused experience together in one place.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=90",
    reverse: false,
  },
  {
    eyebrow: "BUILT AROUND TRUST",
    title: "Property information, presented with clarity.",
    text:
      "From the first property image to the important details that matter, every part of the experience is designed to help you understand a listing before taking the next step.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
    reverse: true,
  },
];

/* =========================================================
   ANIMATED IMAGE
   Image comes from bottom to top while scrolling
========================================================= */

function RevealImage({ src, alt, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{
          opacity: 0,
          y: 90,
          scale: 1.08,
          clipPath: "inset(100% 0% 0% 0%)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProperties({ limit: 3 })
      .then(({ data }) => {
        setProperties(data.properties || []);
      })
      .catch(() => {
        setProperties([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-paper text-ink-900 overflow-hidden">

      {/* =====================================================
          01. DISCOVER
          Header ke JUST neeche ye section aayega.
      ===================================================== */}

      <section className="relative min-h-[760px] md:min-h-[820px] overflow-hidden bg-black">

        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
            alt="Builder floor"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[760px] md:min-h-[820px] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 md:px-8 md:pb-16">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-[10px] font-semibold tracking-[0.22em] text-white uppercase md:text-xs">
                Discover Better. Buy With Confidence.
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.94] tracking-tight text-white sm:text-6xl md:text-8xl">
              Discover Real
              <span className="block text-white/55">
                Builder Floors.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Explore carefully presented builder-floor properties with
              transparent details, local insight and a simpler way to find
              your next home.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 w-full rounded-[28px] border border-white/20 bg-black/35 p-2 backdrop-blur-xl md:mt-12 md:rounded-[32px]"
          >
            <div className="grid grid-cols-1 overflow-hidden rounded-[22px] bg-white md:grid-cols-4 md:rounded-[26px]">

              <div className="flex items-center gap-4 border-b border-black/5 px-5 py-5 md:border-b-0 md:border-r">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/5">
                  <MapPinned size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-black/45 uppercase">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    Delhi & NCR
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-black/5 px-5 py-5 md:border-b-0 md:border-r">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/5">
                  <Home size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-black/45 uppercase">
                    Property Type
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    Builder Floor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-black/5 px-5 py-5 md:border-b-0 md:border-r">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/5">
                  <Search size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-black/45 uppercase">
                    Budget
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    Choose Budget
                  </p>
                </div>
              </div>

              <div className="p-2">
                <Button
                  to="/properties"
                  variant="primary"
                  className="flex h-full min-h-[64px] w-full items-center justify-center gap-2 rounded-[18px]"
                >
                  Explore
                  <ArrowRight size={18} />
                </Button>
              </div>

            </div>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/65 md:text-sm"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} />
              Reviewed listings
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} />
              Clear property details
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} />
              Privacy-focused
            </span>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          02. PROPERTY — VERY EARLY
          Actual PropertyGrid header ke neeche hi rakha gaya hai.
      ===================================================== */}

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">

            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase">
                Live Inventory
              </p>

              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 md:text-5xl">
                Homes worth
                <span className="text-ink-400"> looking at.</span>
              </h2>
            </div>

            <Button
              to="/properties"
              variant="secondary"
              className="w-fit"
            >
              View All Properties
              <ArrowRight size={17} />
            </Button>

          </div>

          {/* Existing Property System */}
          <PropertyGrid
            properties={properties}
            loading={loading}
          />

        </div>
      </section>

      {/* =====================================================
          03. STATS
      ===================================================== */}

      <Stats />

      {/* =====================================================
          04. WHAT IS THE BRIQUES
      ===================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <SectionHeading
            eyebrow="Who We Are"
            title="What is The Briques?"
            subtitle="A focused platform connecting Sellers, Owners and Buyers around builder-floor properties."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
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
          05. BIG IMAGE STORY SECTION
          Image bottom -> top reveal
      ===================================================== */}

      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {STORY_SECTIONS.map((story, index) => (
            <div
              key={story.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                index !== 0 ? "mt-24 md:mt-36" : ""
              }`}
            >

              <div
                className={
                  story.reverse
                    ? "md:order-2"
                    : "md:order-1"
                }
              >
                <RevealImage
                  src={story.image}
                  alt={story.title}
                  className="h-[420px] md:h-[600px]"
                />
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  story.reverse
                    ? "md:order-1"
                    : "md:order-2"
                }
              >

                <p className="text-xs font-semibold tracking-[0.22em] text-brand-600 uppercase">
                  {story.eyebrow}
                </p>

                <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 md:text-6xl">
                  {story.title}
                </h2>

                <p className="mt-6 max-w-lg text-base leading-8 text-ink-500 md:text-lg">
                  {story.text}
                </p>

                <div className="mt-8">
                  <Button
                    to="/properties"
                    variant="secondary"
                    className="w-fit"
                  >
                    Explore Properties
                    <ArrowRight size={17} />
                  </Button>
                </div>

              </motion.div>

            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          06. WHY CHOOSE
      ===================================================== */}

      <section className="bg-paper px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">

            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-brand-600 uppercase">
              Our Edge
            </p>

            <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 md:text-6xl">
              Why Choose
              <span className="text-ink-400"> The Briques?</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-ink-500">
              A more focused way to discover builder floors with clarity,
              privacy and a simpler property journey.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {whyChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                  }}
                  className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-black/8 bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.09)] md:p-8"
                >

                  <span className="absolute right-6 top-4 font-display text-6xl font-bold text-black/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-7 font-display text-xl font-bold text-ink-900 md:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-ink-500">
                    {item.description}
                  </p>

                  <div className="absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />

                </motion.article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          07. HOW IT WORKS
          Sticky stacked image cards
      ===================================================== */}

      <section className="bg-white px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">

            <p className="mb-4 inline-flex rounded-full bg-[#faf6e8] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#8f7015] uppercase">
              Simple Process
            </p>

            <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 md:text-6xl">
              How It Works
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-500 md:text-lg">
              From posting a property to finding the right home, the journey
              stays simple and transparent.
            </p>

          </div>

          <div className="mx-auto max-w-5xl">

            {HOW_IT_WORKS.map((step, index) => (

              <div
                key={step.number}
                className="relative mb-7 last:mb-0 md:mb-10"
                style={{
                  zIndex: index + 1,
                }}
              >

                <div
                  className="sticky"
                  style={{
                    top: `${90 + index * 18}px`,
                  }}
                >

                  <motion.article
                    initial={{
                      opacity: 0,
                      y: 100,
                      clipPath: "inset(100% 0% 0% 0%)",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0% 0% 0% 0%)",
                    }}
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-[500px] overflow-hidden rounded-[30px] border border-black/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:h-[620px] md:rounded-[38px]"
                  >

                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                    <div className="absolute left-5 top-5 md:left-8 md:top-8">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold tracking-[0.12em] text-white backdrop-blur-md">
                        {step.number}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

                      <div className="max-w-3xl">

                        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
                          Step {step.number}
                        </p>

                        <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                          {step.title}
                        </h3>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                          {step.desc}
                        </p>

                      </div>

                    </div>

                  </motion.article>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          08. HERO SLIDER
      ===================================================== */}

      <section className="bg-paper py-10 md:py-16">
        <HeroSlider />
      </section>

      {/* =====================================================
          09. FEATURED PROPERTY AGAIN
      ===================================================== */}

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase">
                Explore More
              </p>

              <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 md:text-5xl">
                More builder floors.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-ink-500 md:text-base">
                Browse the complete property collection and discover homes
                that fit your requirements.
              </p>
            </div>

            <Button
              to="/properties"
              variant="secondary"
              className="w-fit"
            >
              See All
              <ArrowRight size={17} />
            </Button>

          </div>

          <PropertyGrid
            properties={properties}
            loading={loading}
          />

        </div>
      </section>

      {/* =====================================================
          10. APP PROMOTION
      ===================================================== */}

      <AppPromotion />

      {/* =====================================================
          11. TESTIMONIALS
      ===================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <SectionHeading
            eyebrow="Community"
            title="What People Say"
            subtitle="From search to keys in hand — real stories from our community."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
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
          12. FINAL CTA
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative overflow-hidden bg-black"
      >

        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:py-32">

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
            <KeyRound size={23} />
          </div>

          <p className="text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
            Your Next Move
          </p>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Find a builder floor
            <span className="block text-white/50">
              that feels like home.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            Explore verified property listings or list your own property
            with The Briques.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <Button
              to="/properties"
              variant="primary"
            >
              Browse Properties
              <ArrowRight size={17} />
            </Button>

            <Button
              to="/choose-role"
              variant="secondary"
            >
              List Your Property
            </Button>

          </div>

        </div>

      </motion.section>

    </div>
  );
}