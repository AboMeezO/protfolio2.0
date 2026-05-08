import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    tiltMaxAngleX={20}
    tiltMaxAngleY={20}
    perspective={900}
    scale={1.05}
    transitionSpeed={800}
    className="xs:w-[250px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        className="
          bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px]
          flex justify-evenly items-center flex-col
          transition-transform duration-700 hover:scale-105
        "
      >
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I’m a full-stack web developer who enjoys building web applications,
        desktop tools, and custom software with a strong focus on performance,
        scalability, and user experience. I mainly work with technologies around
        the React and NestJS ecosystems, and recently started exploring the
        TanStack ecosystem because I really like the direction it’s heading and
        the way it approaches modern web development. Most of my current work
        revolves around building projects, experimenting with new ideas, and
        creating solutions for problems I personally deal with. A lot of the
        things I build come from me being lazy and wanting to make the way I use
        software simpler, faster, and less annoying. One example of that is a
        self-hosted helper desktop app I’ve been working on to make the
        self-hosting process easier and more manageable.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
