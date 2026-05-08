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
  <div className="bg-tertiary p-6 sm:p-10 rounded-3xl xs:w-[320px] w-[80vw] sm:w-[360px] shrink-0 border border-white/5 flex flex-col justify-between hover:border-[#5d55fa40] transition-all duration-500 group relative overflow-hidden">
    {/* Background Glow Effect */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#5d55fa]/10 blur-[50px] group-hover:bg-[#5d55fa]/20 transition-all duration-500" />
    
    <div className="relative z-10">
      <div className="w-10 h-10 bg-[#5d55fa20] rounded-full flex items-center justify-center mb-4">
        <span className="text-[#5d55fa] text-[40px] font-serif leading-none mt-4">“</span>
      </div>
      <div className="mt-1">
        <p className="text-white tracking-wider text-[14px] sm:text-[18px] line-clamp-6 italic font-light leading-relaxed">
          {testimonial}
        </p>
      </div>
    </div>

    <div className="mt-7 flex justify-between items-center gap-3 border-t border-white/10 pt-6 relative z-10">
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-white font-bold text-[14px] sm:text-[16px] truncate group-hover:text-[#5d55fa] transition-colors">
          {name}
        </p>
        <p className="mt-1 text-secondary text-[10px] sm:text-[12px] truncate uppercase tracking-[2px] font-medium">
          {designation} @ <span className="text-[#5d55fa]/80">{company}</span>
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-[#5d55fa] blur-[8px] opacity-0 group-hover:opacity-40 transition-opacity" />
        <img
          src={image}
          alt={`feedback_by-${name}`}
          crossOrigin="anonymous"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-[#5d55fa] transition-all duration-500 relative z-10"
        />
      </div>
    </div>
  </div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-transparent`}>
      <div className={`${styles.padding} min-h-[200px] sm:min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <div className={`-mt-10 pb-14 relative overflow-hidden px-2 sm:px-0`}>
        {/* Edge Blur & Shadow Masks - Responsive Widths */}
        <div className="absolute inset-y-0 left-0 w-10 sm:w-32 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-32 bg-gradient-to-l from-primary via-primary/80 to-transparent z-10 pointer-events-none" />

        <Marquee 
          pauseOnHover 
          duration="40s" 
          gap="1rem"
          className="sm:gap-8 py-4"
        >
          {testimonials.map((testimonial, index) => (
            <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
