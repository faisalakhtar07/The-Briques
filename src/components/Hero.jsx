import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar.jsx";
import GlassBadge from "./GlassBadge.jsx";
import BottomLeftStatCard from "./BottomLeftStatCard.jsx";
import BottomRightCornerCard from "./BottomRightCornerCard.jsx";

export default function Hero() {
  return (
    <div className="w-full bg-paper px-3 py-3 md:px-5 md:py-5">
      <section className="group relative h-[88vh] min-h-[600px] w-full max-w-[1536px] mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-ink/5">

        {/* HERO BACKGROUND */}
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=2200&auto=format&fit=crop"
          alt="Modern luxury builder floor"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/65" />

        {/* SOFT SIDE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex h-full w-full flex-col items-center">

          {/* TOP CONTENT */}
          <div className="flex w-full max-w-5xl flex-col items-center px-5 pt-16 text-center md:px-6 md:pt-24">

            <GlassBadge>
              Verified Builder Floors
            </GlassBadge>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="
                mt-5
                mb-3
                max-w-4xl
                text-4xl
                font-normal
                leading-[1.02]
                tracking-[-0.03em]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[78px]
              "
            >
              Spaces That Fit
              <br className="hidden sm:block" />
              Your Life
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="
                max-w-2xl
                text-sm
                font-normal
                leading-relaxed
                text-white/90
                sm:text-base
                md:text-lg
              "
            >
              Verified builder floors across Aurangabad &amp; Delhi— reviewed by our
              Admin team, connected through local pincode Owners you can trust.
            </motion.p>

            {/* SEARCH BAR */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="
                mt-7
                w-full
                max-w-4xl
                rounded-[22px]
                md:mt-9
              "
            >
              <HeroSearchBar />
            </motion.div>
          </div>

          {/* BOTTOM CARDS */}
          <BottomLeftStatCard />
          <BottomRightCornerCard />

        </div>
      </section>
    </div>
  );
}