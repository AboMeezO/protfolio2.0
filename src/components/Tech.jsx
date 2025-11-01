import React, { useState } from "react";
import { BallCanvas } from "./canvas";
import { ErrorBoundary } from "./";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { motion } from "framer-motion";
const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          className="w-28 h-28 relative group"
          key={technology.name}
          onMouseEnter={() => setHoveredTech(technology.name)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          <ErrorBoundary>
            <BallCanvas icon={technology.icon} />
          </ErrorBoundary>
          {hoveredTech === technology.name && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={
                hoveredTech === technology.name
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ ease: "easeIn", duration: 0.3 }}
              className="absolute top-[-30px] left-0 rounded-md right-0 bg-[#1D1836] bg-opacity-20 text-white text-center py-2 px-4 opacity-80"
            >
              {technology.name}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
