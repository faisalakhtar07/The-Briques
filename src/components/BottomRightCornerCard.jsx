import { motion } from "framer-motion";
import { Building2, ChevronRight } from "lucide-react";

// RIVR-style corner "cutout" glass card (Documentation card), ported to
// Briques — smoothly scrolls to the "How It Works" section further down
// this same page, instead of navigating away.
export default function BottomRightCornerCard() {
  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-paper rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6"
    >
      {/* Top intersection mask */}
      <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" className="fill-paper" />
        </svg>
      </div>
      {/* Left intersection mask */}
      <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" className="fill-paper" />
        </svg>
      </div>

      <div className="bg-emerald-500/10 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-emerald-500/20 shrink-0">
        <Building2 className="text-emerald-700 w-5 h-5 md:w-6 md:h-6" />
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-[16px] md:text-[20px] font-semibold text-ink">How It Works</span>
        <a
          href="#how-it-works"
          onClick={scrollToHowItWorks}
          className="flex items-center gap-1 text-ink-soft cursor-pointer hover:text-emerald-700 transition-colors w-fit"
        >
          <span className="text-[12px] md:text-[15px] font-normal">See the process</span>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </a>
      </div>
    </motion.div>
  );
}
