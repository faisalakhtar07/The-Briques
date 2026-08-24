import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin } from "lucide-react";
import HeroSearchBar from "./HeroSearchBar.jsx";
import { getPublicProperties } from "../api/properties.js";

// Same hero as the original site (badge, heading, stats line, search bar,
// "List Your Property" pill) — but the property count is live from the
// database now instead of a hard-coded "500+".
export default function Hero() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getPublicProperties({ limit: 1 })
      .then(({ data }) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="mx-auto max-w-7xl relative px-4 grid gap-12 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-2 w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <ShieldCheck size={14} /> Fresh Builder Floors • Verified Listings • Dealer-Friendly System
          </span>

          <h1 className="max-w-xl text-4xl font-display font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            India's Dedicated Platform for{" "}
            <span className="text-emerald-600">Builder Floors</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            <MapPin size={16} className="text-emerald-500" />
            Searching in <span className="font-semibold text-ink">Faridabad & NCR</span>
            <span className="mx-1 h-1 w-1 rounded-full bg-ink/30" />
            <span className="font-semibold text-emerald-600">
              {total !== null ? `${total}+ Properties Available` : "Properties Available"}
            </span>
          </div>

          <div className="pt-2">
            <HeroSearchBar />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              to="/signup?role=seller"
              className="rounded-full border-2 border-emerald-600 text-emerald-700 font-semibold px-5 py-2.5 hover:bg-emerald-50 transition-colors"
            >
              List Your Property
            </Link>
            <span className="text-xs text-ink-soft">No brokerage. No fake listings. Ever.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="overflow-hidden rounded-xl2 shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Premium builder floor residence"
              className="h-[26rem] w-full object-cover sm:h-[30rem]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-white p-4 shadow-lift sm:block"
          >
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">Verified Listing</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Admin-approved listing</p>
            <p className="text-xs text-ink-soft">Every property reviewed before it goes live</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
