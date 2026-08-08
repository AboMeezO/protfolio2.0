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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold text-[20px] sm:text-[24px]">
          Gallery
        </h2>
        <span className="text-secondary text-[12px] font-medium">
          {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="gallery-fade">
        <div className="gallery-strip">
          {visibleItems.map((item, index) => (
            <motion.button
              key={`${item.src}-${index}`}
              variants={fadeIn("up", "spring", index * 0.06, 0.5)}
              className="gallery-frame"
              onClick={() => setActiveIndex(index)}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  preload="metadata"
                  className="gallery-frame__img"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || title}
                  loading="lazy"
                  className="gallery-frame__img"
                />
              )}
              {item.caption && (
                <div className="gallery-frame__caption">
                  <p className="text-secondary text-[12px] leading-[1.5] italic">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.button>
          ))}
        </div>
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
