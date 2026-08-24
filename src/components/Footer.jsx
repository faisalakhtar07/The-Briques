import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";
import { getPublicSettings } from "../api/settings.js";

const ICONS = { facebook: Facebook, instagram: Instagram, twitter: Twitter };

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getPublicSettings().then(({ data }) => setSettings(data.settings)).catch(() => {});
  }, []);

  const footerLinks = settings?.footerLinks?.length
    ? settings.footerLinks
    : [{ label: "My Portfolio", url: "https://myportfolio-nine-beta-60.vercel.app/" }];

  return (
    <footer className="bg-ink text-paper-dim mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
            <Home className="w-5 h-5 text-emerald-400" /> The Briques
          </div>
          <p className="text-ink-soft max-w-xs">
            {settings?.platformName || "The Briques"} — India's trusted platform to buy, sell and rent
            builder-floor properties, area by area.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-ink-soft">
            <li><Link to="/about" className="hover:text-emerald-400">About The Briques</Link></li>
            <li><Link to="/signup?role=buyer" className="hover:text-emerald-400">Buyer</Link></li>
            <li><Link to="/signup?role=seller" className="hover:text-emerald-400">Seller</Link></li>
            <li><Link to="/owner-login" className="hover:text-emerald-400">Owner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-ink-soft">
            <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">More</h4>
          <ul className="space-y-2 text-ink-soft">
            {footerLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="hover:text-emerald-400 inline-flex items-center gap-1">
                  {l.label} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
          {settings?.socialLinks?.length > 0 && (
            <div className="flex gap-3 mt-4">
              {settings.socialLinks.map((s) => {
                const Icon = ICONS[s.platform?.toLowerCase()] || ExternalLink;
                return (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} The Briques. All rights reserved.
      </div>
    </footer>
  );
}
