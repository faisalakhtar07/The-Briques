import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar.jsx";
import GlassBadge from "./GlassBadge.jsx";
import BottomLeftStatCard from "./BottomLeftStatCard.jsx";
import BottomRightCornerCard from "./BottomRightCornerCard.jsx";

export default function Hero() {
  return (
    <div className="w-full bg-paper px-3 py-3 md:px-5 md:py-5">
      <section
        className="
          group
          relative
          mx-auto
          h-[88vh]
          min-h-[620px]
          w-full
          max-w-[1536px]
          overflow-hidden
          rounded-[1.5rem]
          bg-ink/5
          md:rounded-[3rem]
        "
      >
        {/* HERO BACKGROUND */}
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=85&w=2200&auto=format&fit=crop"
          alt="Modern luxury property interior"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* MAIN DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/65" />

        {/* SOFT SIDE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex h-full w-full flex-col items-center">

          {/* TOP CONTENT */}
          <div
            className="
              flex
              w-full
              max-w-5xl
              flex-col
              items-center
              px-5
              pt-16
              text-center
              sm:px-6
              md:pt-24
            "
          >
            {/* BADGE */}
            <GlassBadge>
              Verified Builder Floors
            </GlassBadge>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="
                mt-5
                max-w-4xl
                text-4xl
                font-normal
                leading-[1.03]
                tracking-[-0.035em]
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
                mt-3
                max-w-2xl
                text-sm
                font-normal
                leading-relaxed
                text-white/90
                sm:text-base
                md:text-lg
              "
            >
              Verified builder floors across Aurangabad &amp; Delhi —
              reviewed by our Admin team, connected through local pincode
              Owners you can trust.
            </motion.p>

            {/* EXPLORE PROPERTIES CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-7 w-full"
            >
              <HeroSearchBar />
            </motion.div>
          </div>

          {/* EXISTING BOTTOM CARDS */}
          <BottomLeftStatCard />
          <BottomRightCornerCard />
        </div>
      </section>
    </div>
  );
}