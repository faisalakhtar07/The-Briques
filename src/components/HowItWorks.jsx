import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

// Same 4-step layout as the original — steps updated to reflect how this
// platform actually works now (pincode → Owner → Admin approval).
const steps = [
  { step: "01", title: "Seller Posts Property", description: "Sellers list their property with photos, price and pincode — reviewed before going live." },
  { step: "02", title: "Owner & Admin Review", description: "The pincode's assigned Owner and our Admin team verify every listing for accuracy." },
  { step: "03", title: "Buyer Explores", description: "Buyers browse verified listings, filter by price/area/rooms, and connect through the platform." },
  { step: "04", title: "Secure Transaction", description: "Payments and commissions are handled transparently, with a full record for everyone involved." },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
        <SectionHeading eyebrow="Process" title="How It Works" subtitle="A simple, transparent process that benefits everyone in the ecosystem." />
        <div className="relative grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-black/10 lg:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col gap-3"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-display text-sm font-bold text-white shadow-card">
                {s.step}
              </span>
              <h3 className="text-lg font-display font-bold text-ink">{s.title}</h3>
              <p className="text-sm text-ink-soft">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
