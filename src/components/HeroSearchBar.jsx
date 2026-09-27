import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function HeroSearchBar() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/properties");
  };

  return (
    <button
      type="button"
      onClick={handleExplore}
      className="
        group
        mx-auto
        flex
        w-fit
        items-center
        justify-center
        gap-3
        rounded-full
        border
        border-white/50
        bg-white
        px-6
        py-3
        text-sm
        font-semibold
        text-[#292929]
        shadow-[0_12px_35px_rgba(0,0,0,0.18)]
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-white/95
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]
        active:translate-y-0
        sm:px-7
        sm:py-3.5
        sm:text-base
      "
    >
      <span>Explore Properties</span>

      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-[#f3f0e7]
          transition-transform
          duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      >
        <ArrowUpRight
          size={17}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}