import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

// Full-screen viewer: swipe (drag) left/right to move between photos with a
// slide animation, double-tap/click a photo to zoom in, tap the backdrop or
// the X to close. Opened from PropertyDetails by clicking the main photo.
export default function ImageLightbox({ images, index, onIndexChange, onClose }) {
  const [direction, setDirection] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const go = (delta) => {
    setZoomed(false);
    setDirection(delta);
    onIndexChange((index + delta + images.length) % images.length);
  };

  const handleDragEnd = (e, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) go(1);
    else if (info.offset.x > threshold) go(-1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10"
      >
        <X className="w-7 h-7" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous photo"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next photo"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="flex-1 overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            drag={zoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[index].url}
              alt=""
              draggable={false}
              onDoubleClick={() => setZoomed((z) => !z)}
              onClick={() => setZoomed((z) => !z)}
              className={`max-h-full max-w-full object-contain select-none transition-transform duration-300 ${
                zoomed ? "scale-[2] cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="pb-6 pt-2 text-center text-white/70 text-sm">
          {index + 1} / {images.length} · swipe or tap arrows · tap photo to zoom
        </div>
      )}
    </div>
  );
}
