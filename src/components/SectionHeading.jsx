import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}
    >
      {eyebrow && (
        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-display font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-base text-ink-soft">{subtitle}</p>}
    </motion.div>
  );
}
