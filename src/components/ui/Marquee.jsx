import React from "react";

const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s", // Allow passing duration as a prop
  gap = "1rem", // Allow passing gap as a prop
  ...props
}) => {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
      style={{
        "--duration": duration,
        "--gap": gap,
        gap: "var(--gap)",
      }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row"
          } ${reverse ? "[animation-direction:reverse]" : ""} ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animationDuration: "var(--duration)",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
