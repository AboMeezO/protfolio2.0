import { motion } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const TimelineMarker = ({ experience, isFirst, isLast, isMobileLayout }) => {
  const lineClass = "w-[3px] flex-1 bg-[#5d55fa]";

  return (
    <div className="flex h-full min-h-[140px] flex-col items-center">
      {!isFirst && <div className={lineClass} />}
      <div
        className="z-10 flex items-center justify-center overflow-hidden rounded-full border-[4px] border-[#5d55fa] bg-[#f3f3f3] shadow-[0_0_15px_rgba(93,85,250,0.3)]"
        style={{
          width: isMobileLayout ? 45 : 75,
          height: isMobileLayout ? 45 : 75,
        }}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="h-[65%] w-[65%] rounded-md object-contain"
        />
      </div>
      {!isLast && <div className={lineClass} />}
    </div>
  );
};

const ExperienceCard = ({ experience }) => (
  <div className="bg-[#1d1836] p-4 sm:p-6 rounded-2xl border-b-4 border-l-2 border-[#5d55fa20] hover:border-[#5d55fa] transition-all duration-500 group text-left">
    <h3 className="text-white text-[18px] sm:text-[24px] font-bold group-hover:text-[#5d55fa] transition-colors text-left">
      {experience.title}
    </h3>
    <p
      className="text-secondary text-[13px] sm:text-[16px] font-semibold text-left"
      style={{ margin: 0 }}
    >
      {experience.company_name} — <span className="text-[#5d55fa]">{experience.date}</span>
    </p>
    <ul className="mt-5 list-disc ml-5 space-y-2 text-left">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white-100 text-[12px] sm:text-[14px] pl-1 tracking-wider leading-relaxed text-left"
        >
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const ExperienceRow = ({ experience, index, isLast, isMobileLayout }) => {
  const isLeft = index % 2 === 1;

  if (isMobileLayout) {
    return (
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "56px minmax(0, 1fr)" }}
      >
        <TimelineMarker
          experience={experience}
          isFirst={index === 0}
          isLast={isLast}
          isMobileLayout
        />
        <div className="py-1">
          <ExperienceCard experience={experience} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid items-stretch gap-6"
      style={{ gridTemplateColumns: "minmax(0, 1fr) 92px minmax(0, 1fr)" }}
    >
      <div className={isLeft ? "py-3" : ""}>
        {isLeft && <ExperienceCard experience={experience} />}
      </div>
      <TimelineMarker
        experience={experience}
        isFirst={index === 0}
        isLast={isLast}
        isMobileLayout={false}
      />
      <div className={!isLeft ? "py-3" : ""}>
        {!isLeft && <ExperienceCard experience={experience} />}
      </div>
    </div>
  );
};

const Experience = () => {
  const theme = useTheme();
  const isMobileLayout = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-12 sm:mt-20 space-y-4 sm:space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceRow
            key={`experience-${index}`}
            experience={experience}
            index={index}
            isLast={index === experiences.length - 1}
            isMobileLayout={isMobileLayout}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
