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
    desc:
      "Sellers list their property with photos, price and pincode — reviewed before going live.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
  },

  {
    title: "Owner & Admin Review",
    desc:
      "The pincode's assigned Owner and our Admin team verify every listing for accuracy.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
  },

  {
    title: "Buyer Explores",
    desc:
      "Buyers browse verified listings, filter by price, area and rooms, and connect through the platform.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  },

  {
    title: "Secure Transaction",
    desc:
      "Payments and commissions are handled transparently, with a full record for everyone involved.",
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
   IMAGE REVEAL COMPONENT
========================================================= */

function RevealImage({ src, alt }) {
  return (
    <motion.div
      initial={{
        clipPath: "inset(100% 0% 0% 0%)",
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-0"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}


/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProperties({ limit: 3 })
      .then(({ data }) => {
        setProperties(data.properties || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <>
      {/* =====================================================
          DISCOVER REAL BUILDER FLOORS
          FIRST MAIN SECTION AFTER HEADER
      ===================================================== */}

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4">

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
            <Button
              to="/properties"
              variant="primary"
            >
              View All Properties
            </Button>
          </div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <Stats />


      {/* =====================================================
          WHAT IS THE BRIQUES
      ===================================================== */}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4">

          <SectionHeading
            eyebrow="Who We Serve"
            title="What is The Briques?"
            subtitle="A dedicated platform connecting Sellers, Owners, and Buyers for builder floors in Delhi & NCR. Simple, transparent, and trustworthy."
          />

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">

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
          IMAGE STORY / PREMIUM VISUAL SECTION
      ===================================================== */}

      <section className="overflow-hidden bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

            {/* Image */}
            <div className="relative h-[420px] overflow-hidden rounded-[32px] md:h-[600px]">

              <RevealImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90"
                alt="Premium builder floor"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            </div>


            {/* Content */}
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                Built Around Trust
              </p>

              <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 md:text-5xl">
                A better way to discover builder floors.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-500 md:text-base">
                The Briques brings Sellers, local Owners and Buyers together
                through a transparent property discovery experience designed
                specifically for builder floors.
              </p>

              <div className="mt-8">
                <Button
                  to="/properties"
                  variant="primary"
                >
                  Explore Properties
                </Button>
              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY CHOOSE THE BRIQUES
          NO IMAGES
      ===================================================== */}

      <section className="bg-paper px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="mb-12 text-center md:mb-16">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Our Edge
            </p>

            <h2 className="font-display text-3xl font-bold text-ink-900 md:text-5xl">
              Why Choose The Briques?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
              We understand the builder floor market inside out.
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
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="
                    group
                    relative
                    min-h-[230px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-cloud-200
                    bg-white
                    p-7
                    shadow-[0_15px_45px_rgba(0,0,0,0.07)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_55px_rgba(0,0,0,0.11)]
                    md:p-8
                  "
                >

                  {/* Background Number */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-6
                      top-5
                      select-none
                      font-display
                      text-5xl
                      font-bold
                      text-ink-900/[0.04]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  {/* Icon */}

                  <div
                    className="
                      mb-6
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-brand-500/10
                      text-brand-600
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>


                  {/* Title */}

                  <h3
                    className="
                      font-display
                      text-xl
                      font-bold
                      text-ink-900
                    "
                  >
                    {item.title}
                  </h3>


                  {/* Description */}

                  <p
                    className="
                      mt-3
                      max-w-sm
                      text-sm
                      leading-relaxed
                      text-ink-500
                    "
                  >
                    {item.description}
                  </p>


                  {/* Hover Line */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-7
                      right-7
                      h-[2px]
                      origin-left
                      scale-x-0
                      bg-brand-500
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />

                </motion.div>
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
        className="relative bg-white py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl px-5 md:px-6">

          {/* Heading */}

          <div className="mb-14 text-center md:mb-20">

            <p
              className="
                mb-5
                inline-flex
                items-center
                rounded-full
                bg-[#faf6e8]
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#8f7015]
              "
            >
              Process
            </p>

            <h2 className="font-display text-3xl font-bold text-ink-900 md:text-5xl">
              How It Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
              A simple, transparent process that benefits everyone in the ecosystem.
            </p>

          </div>


          {/* Sticky Cards */}

          <div className="mx-auto max-w-5xl">

            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step.title}
                className="relative mb-8 min-h-[620px] md:mb-10 md:min-h-[760px]"
              >

                <div
                  className="sticky"
                  style={{
                    top: `${90 + index * 18}px`,
                    zIndex: index + 1,
                  }}
                >

                  {/* Main Card */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 60,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      relative
                      h-[520px]
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-black/10
                      bg-ink-900
                      shadow-[0_25px_70px_rgba(0,0,0,0.18)]
                      md:h-[650px]
                      md:rounded-[38px]
                    "
                  >

                    {/* Image Reveal */}

                    <RevealImage
                      src={step.image}
                      alt={step.title}
                    />


                    {/* Dark Overlay */}

                    <div className="absolute inset-0 bg-black/45" />


                    {/* Gradient */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/90
                        via-black/35
                        to-transparent
                      "
                    />


                    {/* Large Background Number */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        right-5
                        top-3
                        select-none
                        font-display
                        text-[120px]
                        font-bold
                        leading-none
                        text-white/10
                        md:right-10
                        md:text-[190px]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>


                    {/* Card Content */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        justify-between
                        p-7
                        md:p-12
                      "
                    >

                      {/* Top */}

                      <div className="flex items-start justify-between">

                        {/* Number */}

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-white/20
                            bg-white/15
                            font-display
                            text-lg
                            font-bold
                            text-white
                            backdrop-blur-md
                            md:h-16
                            md:w-16
                            md:text-xl
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>


                        {/* Step */}

                        <div
                          className="
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-white/80
                            backdrop-blur-md
                          "
                        >
                          Step {index + 1} / {HOW_IT_WORKS.length}
                        </div>

                      </div>


                      {/* Bottom Content */}

                      <div className="max-w-2xl">

                        {/* Small Line */}

                        <div
                          className="
                            mb-4
                            h-1
                            w-14
                            rounded-full
                            bg-white
                          "
                        />


                        {/* Title */}

                        <h3
                          className="
                            font-display
                            text-3xl
                            font-bold
                            leading-tight
                            text-white
                            md:text-5xl
                          "
                        >
                          {step.title}
                        </h3>


                        {/* Description */}

                        <p
                          className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-relaxed
                            text-white/80
                            md:text-base
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
                              overflow-hidden
                              rounded-full
                              bg-white/25
                              md:w-48
                            "
                          >
                            <div
                              className="
                                h-full
                                rounded-full
                                bg-brand-500
                              "
                              style={{
                                width: `${
                                  ((index + 1) /
                                    HOW_IT_WORKS.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>

                          <span className="text-xs text-white/70">
                            {index + 1} / {HOW_IT_WORKS.length}
                          </span>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          HERO SLIDER
          COMPLETELY SEPARATE
      ===================================================== */}

      <HeroSlider />


      {/* =====================================================
          MORE LIVE INVENTORY
      ===================================================== */}

      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4">

          <SectionHeading
            eyebrow="Live Inventory"
            title="More Properties"
            align="left"
          />

          <PropertyGrid
            properties={properties}
            loading={loading}
          />

          <div className="flex justify-center">
            <Button
              to="/properties"
              variant="primary"
            >
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

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4">

          <SectionHeading
            eyebrow="Community"
            title="What People Say"
            subtitle="From search to keys in hand — real stories from our community."
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
      ===================================================== */}

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

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            gap-5
            px-4
            py-16
            text-center
          "
        >

          <h2
            className="
              max-w-xl
              font-display
              text-2xl
              font-bold
              text-ink
              sm:text-3xl
            "
          >
            Ready to find or list a builder floor with confidence?
          </h2>


          <div className="flex flex-wrap justify-center gap-3">

            <Button
              to="/properties"
              variant="primary"
            >
              Browse Properties
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

    </>
  );
}