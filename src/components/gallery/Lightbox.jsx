import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Lightbox = ({ items, activeIndex, onClose, onMove }) => {
  const item = items[activeIndex];
  const thumbsRef = useRef(null);

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

  useEffect(() => {
    if (!thumbsRef.current) return;
    const activeThumb = thumbsRef.current.children[activeIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  const jumpTo = useCallback(
    (index) => {
      const delta = index - activeIndex;
      if (delta !== 0) onMove(delta);
    },
    [activeIndex, onMove]
  );

  if (!item) return null;

  const caption = item.caption || item.alt || "";

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__topbar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__counter">
          {activeIndex + 1} / {items.length}
        </span>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="lightbox__stage" onClick={onClose}>
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onMove(-1); }}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                controls
                autoPlay
                preload="metadata"
                className="lightbox__media"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt || ""}
                className="lightbox__media"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onMove(1); }}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="lightbox__bottombar" onClick={(e) => e.stopPropagation()}>
        {caption && (
          <p className="lightbox__caption">{caption}</p>
        )}
        {items.length > 1 && (
          <div className="lightbox__thumbs" ref={thumbsRef}>
            {items.map((media, index) => (
              <button
                key={`${media.src}-${index}`}
                className={`lightbox__thumb ${index === activeIndex ? "lightbox__thumb--active" : ""}`}
                onClick={() => jumpTo(index)}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={media.src} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
