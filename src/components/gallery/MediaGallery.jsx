import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Lightbox from "./Lightbox";

const MediaGallery = ({ items = [], fallbackCover, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const normalizedItems = useMemo(() => {
    if (items.length) return items;
    if (fallbackCover) {
      return [{ type: "image", src: fallbackCover, alt: title, caption: title }];
    }
    return [];
  }, [fallbackCover, items, title]);

  const visibleItems = normalizedItems.length > 20
    ? normalizedItems.slice(0, 20)
    : normalizedItems;

  const move = (direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return normalizedItems.length - 1;
      if (next >= normalizedItems.length) return 0;
      return next;
    });
  };

  if (!normalizedItems.length) return null;

  return (
    <div className="mt-20">
      <span className="section-label">
        <span className="section-label__dot" />
        Gallery
      </span>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        {visibleItems.map((item, index) => (
          <motion.button
            key={`${item.src}-${index}`}
            variants={fadeIn("up", "spring", index * 0.08, 0.6)}
            className="group relative rounded-2xl overflow-hidden border border-white/5 bg-tertiary/50 transition-all duration-500 hover:border-[#915eff]/20 hover:shadow-[0_20px_50px_-12px_rgba(33,30,53,0.6)]"
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </div>
              </div>
            </div>
            {item.caption && (
              <div className="p-4">
                <p className="text-secondary text-[13px] leading-[1.5]">{item.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={normalizedItems}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onMove={move}
        />
      )}
    </div>
  );
};

export default MediaGallery;
