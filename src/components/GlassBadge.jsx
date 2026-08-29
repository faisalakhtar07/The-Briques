import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// RIVR-style glass pill badge, ported to Briques branding.
export default function GlassBadge({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/30 mx-auto mb-3 w-fit"
    >
      <ShieldCheck className="w-4 h-4 text-emerald-700" />
      <span className="text-[14px] font-normal text-emerald-900">{children}</span>
    </motion.div>
  );
}
