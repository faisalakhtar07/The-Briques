import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getPublicProperties } from "../api/properties.js";

// RIVR-style glass stat card (bottom-left "5.2K Active Yielders" card),
// ported to Briques — shows the real live property count instead of a
// hard-coded number, and links to Browse Properties instead of Discord.
export default function BottomLeftStatCard() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getPublicProperties({ limit: 1 }).then(({ data }) => setTotal(data.total)).catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/30 backdrop-blur-xl flex flex-col gap-2 lg:gap-3 min-w-[140px] md:min-w-[150px] lg:min-w-[180px] w-fit shadow-lift"
    >
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
          {total !== null ? `${total}+` : "—"}
        </span>
        <span className="text-[10px] md:text-[12px] font-normal text-ink-soft uppercase tracking-wider">
          Verified Properties
        </span>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/properties"
          className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start group w-fit"
        >
          <div className="bg-emerald-500/10 p-1 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-[14px] font-normal text-emerald-900">Browse Properties</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
