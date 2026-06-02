import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { siYoutube, siInstagram, siGmail } from "simple-icons";
import { github } from "../assets";
import EarthCanvas from "./canvas/Earth";

const socialIcons = {
  youtube: siYoutube,
  instagram: siInstagram,
  gmail: siGmail,
};

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const useNearViewport = (rootMargin = "500px") => {
  const ref = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNearViewport) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return [ref, isNearViewport];
};

const SimpleIcon = ({ name }) => {
  if (name === "linkedin") {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="#0A66C2"
        className="w-5 h-5 object-contain"
      >
        <title>LinkedIn</title>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28h-.01ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    );
  }

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
  const [earthRef, shouldRenderEarth] = useNearViewport();
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

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

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (
      trimmedForm.name.length < 2 ||
      !isValidEmail(trimmedForm.email) ||
      trimmedForm.message.length < 10
    ) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: trimmedForm.name,
          to_name: "AboMeezO",
          from_email: trimmedForm.email,
          to_email: "abomeezo2@gmail.com",
          message: trimmedForm.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: "success",
            message: "Thank you. I will get back to you as soon as possible.",
          });

          setForm(initialForm);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setStatus({
            type: "error",
            message: "Something went wrong. Please try again.",
          });
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
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-transparent font-medium outline-none transition-all focus:border-[#915eff] focus:ring-2 focus:ring-[#915eff]/40"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={120}
              autoComplete="email"
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-transparent font-medium outline-none transition-all focus:border-[#915eff] focus:ring-2 focus:ring-[#915eff]/40"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={2000}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border border-transparent font-medium outline-none transition-all focus:border-[#915eff] focus:ring-2 focus:ring-[#915eff]/40"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all focus:ring-2 focus:ring-[#915eff]/50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {status && (
            <p
              className={`rounded-xl bg-tertiary px-5 py-3 text-[14px] font-medium ${
                status.type === "success" ? "text-[#00cea8]" : "text-[#ff8a8a]"
              }`}
            >
              {status.message}
            </p>
          )}
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
              href="https://www.instagram.com/abotasneem_/"
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
        ref={earthRef}
      >
        <ErrorBoundary>
          {shouldRenderEarth && <EarthCanvas />}
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
