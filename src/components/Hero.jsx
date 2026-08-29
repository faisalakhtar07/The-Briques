import { motion } from "framer-motion";
import HeroSearchBar from "./HeroSearchBar.jsx";
import GlassBadge from "./GlassBadge.jsx";
import BottomLeftStatCard from "./BottomLeftStatCard.jsx";
import BottomRightCornerCard from "./BottomRightCornerCard.jsx";

// RIVR-style "floating island" hero: a big rounded card sitting inside the
// page background (not full-bleed), with glass badge, glass stat card
// bottom-left, and a corner-cutout glass card bottom-right — restyled with
// Briques branding and real property content instead of DeFi copy.
export default function Hero() {
  return (
    <div className="w-full bg-paper px-3 py-3 md:px-5 md:py-5">
      <section className="group relative h-[88vh] min-h-[600px] w-full max-w-[1536px] mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-ink/5">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
          alt="Builder floor under construction"
          className="absolute inset-0 h-full w-full object-cover object-[65%] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/50" />

        <div className="relative z-10 flex h-full w-full flex-col items-center">
          <div className="flex w-full max-w-4xl flex-col items-center px-6 pt-16 text-center md:pt-24">
            <GlassBadge>Verified Builder Floors</GlassBadge>

            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-2 text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]"
            >
              Spaces That Fit Your Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl text-sm font-normal leading-relaxed text-white/85 sm:text-base md:text-lg"
            >
              Verified builder floors across Delhi &amp; NCR — reviewed by our
              Admin team, connected through local pincode Owners you can trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 w-full"
            >
              <HeroSearchBar />
            </motion.div>
          </div>

          <BottomLeftStatCard />
          <BottomRightCornerCard />
        </div>
      </section>
    </div>
  );
}
