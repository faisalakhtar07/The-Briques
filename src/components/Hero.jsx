import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, Building2, ShieldCheck, MapPinned, Sparkles } from "lucide-react";
import HeroSearchBar from "./HeroSearchBar.jsx";
import { getPublicProperties } from "../api/properties.js";
import { getPublicSettings } from "../api/settings.js";

export default function Hero() {
  const [total, setTotal] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getPublicProperties({ limit: 1 }).then(({ data }) => setTotal(data.total)).catch(() => {});
    getPublicSettings().then(({ data }) => setStats(data.settings.stats || [])).catch(() => {});
  }, []);

  const statIcons = [Building2, Sparkles, MapPinned, ShieldCheck];

  return (
    <section className="relative bg-paper text-ink">
      <div className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
          alt="Builder floor under construction"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/40 to-paper" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
          >
            The Briques — Builder Floors
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-2xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            We build trust.
            <br />
            We create <span className="text-emerald-400">value.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-md text-sm text-ink-soft"
          >
            Verified builder floors across Faridabad &amp; NCR — reviewed by our
            Admin team, connected through local pincode Owners you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-3 h-px w-16 bg-emerald-400"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <HeroSearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft"
          >
            <ArrowDown size={14} className="animate-bounce text-emerald-400" /> Scroll
          </motion.div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="border-y border-emerald-500/15 bg-paper-dim">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <Icon size={20} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-display text-xl font-bold text-ink">{s.value}{s.suffix}</p>
                    <p className="text-xs text-ink-soft">{s.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      {total !== null && stats.length === 0 && (
        <div className="border-y border-emerald-500/15 bg-paper-dim px-6 py-4 text-center text-xs text-ink-soft">
          {total}+ verified properties available right now
        </div>
      )}
    </section>
  );
}