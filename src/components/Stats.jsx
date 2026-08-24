import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { getPublicSettings } from "../api/settings.js";

// Same animated-counter strip as the original site — but numbers are
// pulled from SiteSettings (Admin-editable), never hard-coded fake stats.
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-display font-bold text-ink sm:text-5xl">
      {display}{suffix}
    </span>
  );
}

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getPublicSettings().then(({ data }) => setStats(data.settings.stats || [])).catch(() => {});
  }, []);

  if (!stats.length) return null;

  return (
    <section className="border-y border-black/8 bg-white">
      <div className="mx-auto max-w-7xl grid grid-cols-2 gap-8 px-4 py-14 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <span className="text-sm text-ink-soft">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
