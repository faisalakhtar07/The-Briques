import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const values = [
  {
    number: "01",
    title: "Trust First",
    text: "A property platform should make the process feel clear, simple and dependable.",
    icon: CheckCircle2,
  },
  {
    number: "02",
    title: "Local Connection",
    text: "The Briques connects property discovery with local owners and a pincode-based network.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Better Experience",
    text: "From discovering a property to exploring its details, every step should feel effortless.",
    icon: Sparkles,
  },
];

const journey = [
  {
    number: "01",
    title: "Discover",
    text: "Explore builder floors and properties through a simple, focused experience.",
  },
  {
    number: "02",
    title: "Connect",
    text: "Find the right people around a property instead of navigating an unnecessarily complicated process.",
  },
  {
    number: "03",
    title: "Explore",
    text: "Understand the property, its details and the opportunity before making your next move.",
  },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-paper text-ink">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[78vh] px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid min-h-[650px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">

            {/* LEFT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                About The Briques
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[3.4rem] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[6.3rem]"
              >
                Building a better
                <span className="block text-emerald-600">
                  way home.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-xl text-base leading-7 text-ink-soft sm:text-lg"
              >
                The Briques is a property marketplace built around a simple
                idea — finding the right space should feel clear, local and
                human.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/properties"
                  className="group flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  Explore Properties
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>

                <a
                  href="#faisal"
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  Meet the Founder
                  <ArrowDown className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="relative mx-auto aspect-[4/5] max-w-[530px] overflow-hidden rounded-[2.2rem] bg-[#dedbd1] shadow-[0_30px_90px_rgba(0,0,0,.13)]">

                {/* Main property image */}
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=1200&auto=format&fit=crop"
                  alt="Modern interior"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                {/* Floating Founder card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:w-[280px]">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 overflow-hidden rounded-full bg-[#e8e4da]">
                      <img
                        src="/faisal.png"
                        alt="Faisal Akhtar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-ink">
                        Faisal Akhtar
                      </p>
                      <p className="text-xs text-ink-soft">
                        CEO & Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small floating location */}
              <div className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-xl sm:block lg:-right-7">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                      Based in
                    </p>
                    <p className="text-sm font-semibold">
                      Aurangabad, Bihar
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft lg:flex">
            <span className="h-px w-10 bg-black/15" />
            Scroll to know more
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="border-y border-black/5 bg-[#ebe8df] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
              The idea
            </p>

            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Property discovery doesn't have to be complicated.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-xl leading-8 text-ink sm:text-2xl sm:leading-9">
              The Briques was created to bring property discovery into a
              simpler, more focused experience — where buyers can explore
              properties and connect with the people behind them.
            </p>

            <p className="mt-7 leading-7 text-ink-soft">
              Instead of making users jump through countless steps, the
              platform focuses on useful property information, local
              connections and a cleaner digital experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FAISAL
      ===================================================== */}
      <section
        id="faisal"
        className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
              Behind The Briques
            </p>

            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">
              Built by a developer who wanted to make property simpler.
            </h2>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">

            {/* FAISAL IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[500px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e3dfd5]">
                <img
                  src="/faisal.png"
                  alt="Faisal Akhtar"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-24">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                    Founder
                  </p>

                  <h3 className="mt-1 font-display text-3xl font-semibold text-white">
                    Faisal Akhtar
                  </h3>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-xl sm:-right-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  From
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold">
                    Aurangabad, Bihar
                  </span>
                </div>
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.p
                variants={fadeUp}
                className="text-xl leading-8 text-ink sm:text-2xl sm:leading-9"
              >
                I'm <strong>Faisal Akhtar</strong>, CEO & Developer behind
                The Briques.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-6 leading-7 text-ink-soft"
              >
                I built The Briques with the belief that technology should
                remove complexity rather than add to it. Property is a major
                decision, and the digital experience around it should feel
                straightforward and trustworthy.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-5 leading-7 text-ink-soft"
              >
                The platform brings together property discovery, local
                connections and a cleaner way for buyers and sellers to
                explore opportunities.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center gap-3"
              >
                <div className="h-px w-10 bg-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  Aurangabad, Bihar
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}
      <section className="bg-ink px-4 py-24 text-paper sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
              What matters
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              Three things behind every decision.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3"
          >
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  variants={fadeUp}
                  className="group bg-ink p-7 transition duration-500 hover:bg-white/[0.06] sm:p-9 lg:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/35">
                      {item.number}
                    </span>

                    <Icon className="h-5 w-5 text-emerald-400 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h3 className="mt-16 font-display text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/55">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          IMAGE / STORY BREAK
      ===================================================== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=1800&auto=format&fit=crop"
            alt="Modern home"
            className="h-[480px] w-full object-cover sm:h-[560px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center px-7 sm:px-12 lg:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              More than listings
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A better digital experience for finding a place to call home.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/70 sm:text-base">
              The Briques combines technology and local connection to make
              property discovery feel more natural.
            </p>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="border-y border-black/5 bg-[#ebe8df] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                The journey
              </p>

              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Simple by design.
              </h2>

              <p className="mt-5 max-w-sm leading-7 text-ink-soft">
                The experience is designed around the way people naturally
                explore property — discover, connect and make an informed
                next move.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="space-y-4"
            >
              {journey.map((item) => (
                <motion.article
                  key={item.number}
                  variants={fadeUp}
                  className="group rounded-[1.6rem] border border-black/10 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-medium text-emerald-600">
                      {item.number}
                    </span>

                    <ArrowUpRight className="h-5 w-5 text-black/25 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600" />
                  </div>

                  <h3 className="mt-12 font-display text-3xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-xl leading-7 text-ink-soft">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
              The bigger picture
            </p>

            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Built with people at the center.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">

            <motion.div
              variants={fadeUp}
              className="rounded-[1.7rem] border border-black/10 bg-[#ebe8df] p-7 sm:p-9"
            >
              <Building2 className="h-6 w-6 text-emerald-600" />
              <p className="mt-12 font-display text-3xl font-semibold">
                Properties
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                A focused marketplace for exploring property opportunities.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-[1.7rem] border border-black/10 bg-white p-7 shadow-sm sm:p-9"
            >
              <Users className="h-6 w-6 text-emerald-600" />
              <p className="mt-12 font-display text-3xl font-semibold">
                People
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Connecting buyers, sellers and local property owners.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-[1.7rem] border border-black/10 bg-ink p-7 text-paper sm:p-9"
            >
              <Target className="h-6 w-6 text-emerald-400" />
              <p className="mt-12 font-display text-3xl font-semibold">
                Purpose
              </p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Making property discovery simpler and more transparent.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* =====================================================
          MISSION
      ===================================================== */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl rounded-[2rem] bg-emerald-600 px-7 py-16 text-center text-white sm:px-12 sm:py-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
            Our direction
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
            Make finding the right space feel easier.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            That's the direction behind The Briques — build technology that
            feels useful, human and simple enough to understand.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="border-t border-black/5 bg-[#ebe8df] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
              Ready to explore?
            </p>

            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">
              Your next space could be closer than you think.
            </h2>
          </div>

          <Link
            to="/properties"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-emerald-600"
          >
            Explore Properties
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </section>

    </main>
  );
}