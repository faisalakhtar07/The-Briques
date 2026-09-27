import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Facebook,
  Instagram,
  Twitter,
  ExternalLink,
  ArrowUpRight,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { getPublicSettings } from "../api/settings.js";

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
};

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getPublicSettings()
      .then(({ data }) => setSettings(data.settings))
      .catch(() => {});
  }, []);

  const footerLinks = settings?.footerLinks?.length
    ? settings.footerLinks
    : [
        {
          label: "My Portfolio",
          url: "https://myportfolio-nine-beta-60.vercel.app/",
        },
      ];

  const socialLinks = settings?.socialLinks || [];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 overflow-hidden bg-[#171817] text-white">
      {/* TOP CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16 lg:px-8">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-gradient-to-br
              from-white/[0.08]
              via-white/[0.04]
              to-transparent
              px-6
              py-10
              sm:px-10
              md:py-12
            "
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  <ShieldCheck size={14} />
                  Verified property platform
                </div>

                <h2 className="text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
                  Find a space that
                  <span className="text-white/50"> feels like yours.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
                  Explore verified builder-floor properties and discover a
                  place that fits your life.
                </p>
              </div>

              <Link
                to="/properties"
                className="
                  group
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-[#242522]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white/90
                "
              >
                Explore Properties

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f1eee5]
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                >
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          {/* BRAND */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.07]
                  transition-colors
                  group-hover:bg-white/10
                "
              >
                <Home className="h-5 w-5 text-[#d9c98a]" />
              </span>

              <span className="text-xl font-semibold tracking-tight">
                The Briques
              </span>
            </Link>

            <p className="mt-5 text-sm leading-6 text-white/50">
              {settings?.platformName || "The Briques"} — India's trusted
              platform to buy, sell and rent builder-floor properties,
              area by area.
            </p>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/45">
              <MapPin size={15} className="text-[#d9c98a]" />
              <span>India</span>
            </div>

            {/* Social */}
            {socialLinks.length > 0 && (
              <div className="mt-7 flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon =
                    ICONS[social.platform?.toLowerCase()] || ExternalLink;

                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.platform || "Social media"}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-white/55
                        transition-all
                        duration-200
                        hover:border-white/20
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Explore
            </h3>

            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  to="/properties"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  All Properties
                </Link>
              </li>

              <li>
                <Link
                  to="/properties"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  For Sale
                </Link>
              </li>

              <li>
                <Link
                  to="/properties"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  For Rent
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  About The Briques
                </Link>
              </li>
            </ul>
          </div>

          {/* FOR USERS */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              For Users
            </h3>

            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  to="/signup?role=buyer"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Buyer
                </Link>
              </li>

              <li>
                <Link
                  to="/signup?role=seller"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Seller
                </Link>
              </li>

              <li>
                <Link
                  to="/owner-login"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Owner Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup?role=seller"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Help &amp; Support
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <a
                  href="mailto:contact@thebriques.com"
                  className="inline-flex items-center gap-2 text-white/50 transition-colors hover:text-white"
                >
                  <Mail size={14} />
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* EXTRA LINKS */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Popular */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                Popular Searches
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/45">
                <Link
                  to="/properties"
                  className="transition-colors hover:text-white"
                >
                  Builder Floors
                </Link>

                <Link
                  to="/properties"
                  className="transition-colors hover:text-white"
                >
                  Properties for Sale
                </Link>

                <Link
                  to="/properties"
                  className="transition-colors hover:text-white"
                >
                  Properties for Rent
                </Link>

                <Link
                  to="/properties"
                  className="transition-colors hover:text-white"
                >
                  Verified Properties
                </Link>
              </div>
            </div>

            {/* Admin Dynamic Links */}
            <div className="md:text-right">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                More
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                {footerLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-sm
                      text-white/45
                      transition-colors
                      hover:text-white
                    "
                  >
                    {link.label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-4
            px-5
            py-6
            text-xs
            text-white/35
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-8
          "
        >
          <p>
            © {currentYear} The Briques. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Verified Property Platform</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <span>Built for better spaces</span>
          </div>
        </div>
      </div>
    </footer>
  );
}