import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col gap-4 rounded-xl2 bg-paper-dim p-6 transition-colors hover:bg-emerald-50"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-card">
        <Icon size={19} />
      </span>
      <h3 className="text-base font-display font-bold text-ink">{title}</h3>
      <p className="text-sm text-ink-soft">{description}</p>
    </motion.div>
  );
}
