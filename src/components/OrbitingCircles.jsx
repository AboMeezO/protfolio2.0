const OrbitingCircles = ({
  children,
  radius = 150,
  duration = 24,
  reverse = false,
  iconSize = 56,
  depth = 0,
  startAngle = 0,
  angles,
  centered = false,
}) => {
  const items = Array.isArray(children) ? children : [children];
  const centeredOffsets = [
    { x: -18, y: -12 },
    { x: 14, y: -14 },
    { x: 0, y: 0 },
    { x: -10, y: 18 },
    { x: 18, y: 14 },
  ];

  return (
    <div
      className="orbiting-circle"
      style={{
        width: radius * 2,
        height: radius * 2,
        "--orbit-depth": `${depth}px`,
        "--orbit-hover-depth": `${depth}px`,
      }}
      data-depth={depth}
    >
      <div
        className="orbit-plane"
        style={{
          "--orbit-duration": `${duration}s`,
        }}
      >
        {!centered && <div className="orbit-ring" />}
        {items.map((child, index) => {
          const angle =
            angles?.[index] ?? startAngle + (360 / items.length) * index;
          const itemDepth = centered ? 0 : depth + 18 + index * 5;
          const centeredOffset = centered
            ? centeredOffsets[index % centeredOffsets.length]
            : { x: 0, y: 0 };
          const itemTransform = centered
            ? `translate(${centeredOffset.x}px, ${centeredOffset.y}px) translate3d(0, 0, 0)`
            : `rotate(${angle}deg) translate(${radius}px) rotate(${-1 * angle}deg) translateZ(var(--item-hover-depth))`;

          return (
            <div
              key={index}
              className="orbit-item"
              style={{
                width: iconSize,
                height: iconSize,
                marginLeft: -(iconSize / 2),
                marginTop: -(iconSize / 2),
                "--item-depth": `${itemDepth}px`,
                "--item-hover-depth": `${itemDepth}px`,
                transform: itemTransform,
              }}
              data-orbit-item="true"
              data-depth={itemDepth}
              data-radius={centered ? 0 : radius}
              data-base-angle={angle}
              data-duration={duration}
              data-direction={reverse ? -1 : 1}
              data-center-x={centeredOffset.x}
              data-center-y={centeredOffset.y}
              data-tech-name={child.props?.technology?.name || ""}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingCircles;
