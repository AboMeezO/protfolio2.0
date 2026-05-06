import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Lightbox = ({ items, activeIndex, onClose, onMove }) => {
  const item = items[activeIndex];

  useEffect(() => {
    if (!item) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose, onMove]);

  useEffect(() => {
    const next = items[(activeIndex + 1) % items.length];
    const previous = items[(activeIndex - 1 + items.length) % items.length];
    [next, previous].forEach((media) => {
      if (media?.type === "image") {
        const image = new Image();
        image.src = media.src;
      }
    });
  }, [activeIndex, items]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary bg-opacity-90 flex justify-center items-center p-6"
      onClick={onClose}
    >
      <motion.div
        variants={fadeIn("", "", 0, 0.3)}
        initial="hidden"
        animate="show"
        className="bg-tertiary rounded-2xl p-5 max-w-7xl w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              preload="metadata"
              className="w-full h-full object-contain rounded-2xl bg-primary"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt || ""}
              className="w-full h-full object-contain rounded-2xl bg-primary"
            />
          )}
        </div>
        <div className="mt-4 flex justify-between items-center gap-4">
          <button className="black-gradient w-10 h-10 rounded-full text-white" onClick={() => onMove(-1)}>
            ‹
          </button>
          <p className="text-secondary text-[14px] text-center">
            {item.caption || item.alt}
          </p>
          <button className="black-gradient w-10 h-10 rounded-full text-white" onClick={() => onMove(1)}>
            ›
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Lightbox;
