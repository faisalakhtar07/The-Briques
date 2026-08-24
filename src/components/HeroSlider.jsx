import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getFeaturedProperties } from "../api/properties.js";
import { getPublicSettings } from "../api/settings.js";

// Dynamic hero slider: images/order come entirely from Admin (SiteSettings
// sliderImages, or featured properties as a fallback) — nothing hard-coded.
export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [intervalMs, setIntervalMs] = useState(3000);

  useEffect(() => {
    (async () => {
      const { data: settingsData } = await getPublicSettings().catch(() => ({ data: {} }));
      setIntervalMs(settingsData?.settings?.sliderIntervalMs || 3000);

      if (settingsData?.settings?.sliderImages?.length) {
        setSlides(
          settingsData.settings.sliderImages
            .sort((a, b) => a.order - b.order)
            .map((s) => ({ image: s.image, title: s.title, link: s.link || "/properties" }))
        );
        return;
      }

      const { data } = await getFeaturedProperties().catch(() => ({ data: { properties: [] } }));
      setSlides(
        (data.properties || []).slice(0, 4).map((p) => ({
          image: p.images?.[0]?.url || "",
          title: p.title,
          link: `/properties/${p._id}`,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(timer);
  }, [slides, intervalMs]);

  if (!slides.length) {
    return (
      <div className="h-[420px] md:h-[560px] bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white">
        <p className="text-lg">Featured properties will appear here once Admin adds them.</p>
      </div>
    );
  }

  return (
    <div className="relative h-[420px] md:h-[560px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img src={slides[index].image} alt={slides[index].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-xl">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">{slides[index].title}</h2>
            <Link to={slides[index].link} className="inline-block rounded-full bg-gold-500 text-ink px-5 py-2 font-semibold hover:bg-gold-400">
              View Details
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-gold-400" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
