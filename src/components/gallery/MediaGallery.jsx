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
      <h2 className="text-white font-bold text-[24px]">Media Gallery</h2>
      <div className="mt-6 flex flex-wrap gap-7">
        {visibleItems.map((item, index) => (
          <motion.button
            key={`${item.src}-${index}`}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full text-left"
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative w-full h-[230px]">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  preload="metadata"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
            </div>
            {item.caption && (
              <p className="mt-4 text-secondary text-[14px]">{item.caption}</p>
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
