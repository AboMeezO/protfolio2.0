import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import Marquee from "./ui/Marquee";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <div className="bg-black-200 p-6 sm:p-10 rounded-3xl w-[280px] xs:w-[320px] shrink-0">
    <p className="text-white font-black text-[32px] sm:text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[14px] sm:text-[18px]">
        {testimonial}
      </p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[14px] sm:text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[10px] sm:text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          // crossOrigin="anonymous"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-transparent`}>
      <div className={`min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <div className={`-mt-20 pb-14 relative overflow-hidden`}>
        {/* Edge Blur & Shadow Masks - Responsive Widths */}
        <div className="absolute inset-y-0 left-0 w-6 sm:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 sm:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover duration="30s" gap="1.5rem" className="sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={testimonial.name}
              index={index}
              {...testimonial}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
