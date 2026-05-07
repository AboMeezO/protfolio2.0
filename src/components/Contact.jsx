import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { siLinkedin, siYoutube, siInstagram, siGmail } from "simple-icons";
import { github, discord } from "../assets";
import EarthCanvas from "./canvas/Earth";

const socialIcons = {
  linkedin: undefined,
  youtube: siYoutube,
  instagram: siInstagram,
  gmail: siGmail,
};

const SimpleIcon = ({ name, color }) => {
  const icon = socialIcons[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill={`#${icon.hex}`}
      className="w-5 h-5 object-contain"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};
import ErrorBoundary from "./ErrorBoundary";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "AboMeezO",
          from_email: form.email,
          to_email: "abomeezo2@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        },
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-4">
          <p className="text-white font-medium text-[18px]">Connect with me:</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/AboMeezO"
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#915eff] transition-all text-[14px]"
            >
              <img
                src={github}
                alt="github"
                className="w-5 h-5 object-contain"
              />
              GitHub
            </a>
            <a
              href="https://discord.com/invite/C62mj58Q2D"
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#915eff] transition-all text-[14px]"
            >
              <img
                src={discord}
                alt="discord"
                className="w-5 h-5 object-contain"
              />
              Discord
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-jalamneh/"
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#0077B5] transition-all text-[14px]"
            >
              <SimpleIcon name="linkedin" />
              LinkedIn
            </a>
            <a
              href="https://youtube.com/@abomeezo"
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#FF0000] transition-all text-[14px]"
            >
              <SimpleIcon name="youtube" />
              YouTube
            </a>
            <a
              href="https://instagram.com/abomeezo"
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#E4405F] transition-all text-[14px]"
            >
              <SimpleIcon name="instagram" />
              Instagram
            </a>
            <a
              href="mailto:abomeezo2@gmail.com"
              className="bg-tertiary py-2 px-4 rounded-xl flex items-center gap-2 text-white font-bold shadow-md shadow-primary hover:text-[#915eff] transition-all text-[14px]"
            >
              <SimpleIcon name="gmail" />
              Email
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <ErrorBoundary>
          <EarthCanvas />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
