import { useEffect, useState } from "react";
import { Building2, Handshake, Users, ShieldCheck, Layers3, MapPinned, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import RoleCard from "../components/RoleCard.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import LocationCard from "../components/LocationCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import AppPromotion from "../components/AppPromotion.jsx";
import Button from "../components/Button.jsx";
import { locations } from "../data/locations.js";
import { testimonials } from "../data/testimonials.js";
import { getPublicProperties } from "../api/properties.js";

// Roles adapted to the real system (Buyer/Seller/Owner) — Builder/Dealer
// were part of the old mock site's concept and don't exist as roles here.
const roles = [
  {
    icon: Building2,
    title: "For Sellers",
    description: "List your property and reach genuine, verified buyers faster.",
    features: ["Post your property directly", "Admin-reviewed for trust", "No broker spam", "Your phone stays private"],
    to: "/signup?role=seller",
  },
  {
    icon: Handshake,
    title: "For Owners",
    description: "Manage your assigned pincode's listings and transactions with full visibility.",
    features: ["Dedicated pincode dashboard", "Track local transactions", "Transparent commission", "Local-first support"],
    to: "/owner-login",
  },
  {
    icon: Users,
    title: "For Buyers",
    description: "Find genuine listings only — no fake prices or misleading info.",
    features: ["100% verified listings", "No fake prices", "Transparent pricing", "Direct seller connection"],
    to: "/properties",
  },
];

const whyChoose = [
  { icon: Layers3, title: "Only Builder Floors", description: "We focus exclusively on builder floors, not apartments or villas." },
  { icon: Sparkles, title: "Admin-Reviewed Listings", description: "Every listing is verified by our Admin team before going live." },
  { icon: ShieldCheck, title: "Seller Privacy Protected", description: "Seller phone numbers are never shown to buyers — ever." },
  { icon: Users, title: "Transparent Pricing", description: "See exactly what you pay, with full price history on record." },
  { icon: Handshake, title: "Fair, Configurable Commission", description: "Commission is set transparently and can never surprise you." },
  { icon: MapPinned, title: "Local-First", description: "Deep expertise in Faridabad and surrounding NCR areas, via local Owners." },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProperties({ limit: 3 })
      .then(({ data }) => setProperties(data.properties))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <Stats />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading
            eyebrow="Who We Serve"
            title="What is The Briques?"
            subtitle="A dedicated platform connecting Sellers, Owners, and Buyers for builder floors in Faridabad & NCR. Simple, transparent, and trustworthy."
          />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((r, i) => <RoleCard key={r.title} {...r} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading eyebrow="Our Edge" title="Why Choose The Briques?" subtitle="We understand the builder floor market inside out." />
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.06} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 flex flex-col gap-14">
          <SectionHeading eyebrow="Coverage" title="Explore by Location" subtitle="Find builder floors in popular Faridabad & NCR areas." align="left" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {locations.map((loc, i) => <LocationCard key={loc.id} location={loc} delay={i * 0.05} />)}
          </div>
          <div className="flex justify-center">
            <Button to="/properties" variant="secondary">View All Locations</Button>
          </div>
        </div>
      </section>

      <HeroSlider />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col gap-14">
          <SectionHeading eyebrow="Live Inventory" title="Discover Real Builder Floors" align="left" />
          <PropertyGrid properties={properties} loading={loading} />
          <div className="flex justify-center">
            <Button to="/properties" variant="primary">View All Properties</Button>
          </div>
        </div>
      </section>

      <AppPromotion />

      <section className="py-16 bg-paper">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-14">
          <SectionHeading eyebrow="Community" title="What People Say" subtitle="From search to keys in hand — real stories from our community." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => <TestimonialCard key={t.id} testimonial={t} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-y border-black/8 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-5 py-16 text-center">
          <h2 className="max-w-xl text-2xl font-display font-bold text-ink sm:text-3xl">
            Ready to find or list a builder floor with confidence?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/properties" variant="primary">Browse Properties</Button>
            <Button to="/choose-role" variant="secondary">List Your Property</Button>
          </div>
        </div>
      </motion.section>
    </>
  );
}
