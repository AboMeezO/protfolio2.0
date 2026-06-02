import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  siDiscord,
  siDocker,
  siElectron,
  siExpress,
  siFramer,
  siGit,
  siGithubactions,
  siGsap,
  siNestjs,
  siNextdotjs,
  siPassport,
  siPostgresql,
  siPrisma,
  siRailway,
  siReact,
  siReactquery,
  siSequelize,
  siShadcnui,
  siSqlite,
  siTailwindcss,
  siTanstack,
  siTypescript,
  siVercel,
  siZod,
} from "simple-icons";
import OrbitingCircles from "./OrbitingCircles";
import { SectionWrapper } from "../hoc";
import { technologyCategories } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const brandIcons = {
  discord: siDiscord,
  docker: siDocker,
  electron: siElectron,
  express: siExpress,
  framer: siFramer,
  git: siGit,
  githubactions: siGithubactions,
  gsap: siGsap,
  nestjs: siNestjs,
  nextdotjs: siNextdotjs,
  passport: siPassport,
  postgresql: siPostgresql,
  prisma: siPrisma,
  railway: siRailway,
  react: siReact,
  reactquery: siReactquery,
  sequelize: siSequelize,
  shadcnui: siShadcnui,
  sqlite: siSqlite,
  tailwindcss: siTailwindcss,
  tanstack: siTanstack,
  typescript: siTypescript,
  vercel: siVercel,
  zod: siZod,
};

const darkBrandIcons = new Set([
  "express",
  "nextdotjs",
  "passport",
  "prisma",
  "shadcnui",
  "vercel",
]);

const BrandIcon = ({ technology, large = false }) => {
  const icon = brandIcons[technology.iconKey];
  const iconSize = large ? "w-12 h-12" : "w-8 h-8";
  const needsLightBadge =
    technology.iconKey && darkBrandIcons.has(technology.iconKey);

  if (icon) {
    return (
      <div
        className={`flex justify-center items-center rounded-full ${
          needsLightBadge ? "bg-white" : ""
        } ${large ? "w-14 h-14" : "w-10 h-10"}`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={iconSize}
        >
          <path fill={`#${icon.hex}`} d={icon.path} />
        </svg>
      </div>
    );
  }

  if (technology.icon) {
    return (
      <img
        src={technology.icon}
        alt={technology.name}
        loading="lazy"
        className={
          large ? "w-12 h-12 object-contain" : "w-8 h-8 object-contain"
        }
      />
    );
  }

  return (
    <span
      className={`text-white font-bold leading-none ${
        large ? "text-[14px]" : "text-[10px]"
      }`}
    >
      {technology.shortLabel || technology.name}
    </span>
  );
};

const shellConfigs = [
  { key: "primary-ring", radius: 318, iconSize: 76, duration: 46, reverse: false, large: true, depth: 0, angles: [-96, -38, 22, 84, 148, 214, 278] },
  { key: "secondary-ring", radius: 252, iconSize: 64, duration: 38, reverse: true, large: false, depth: 34, angles: [-128, -72, -18, 38, 96, 156, 218, 286] },
  { key: "tertiary-ring", radius: 184, iconSize: 54, duration: 30, reverse: false, large: false, depth: 72, angles: [-150, -92, -34, 28, 88, 146, 208, 268] },
  { key: "inner-ring", radius: 112, iconSize: 46, duration: 23, reverse: true, large: false, depth: 112, angles: [-118, -28, 64, 154, 244] },
  { key: "core-ring", radius: 54, iconSize: 40, duration: 18, reverse: false, large: false, depth: 150, angles: [-90, 30, 150] },
];

const orbitMotionConfig = {
  introDelay: 0.4,
  introDuration: 0.85,
  introEase: "power3.out",
  outroDelayMs: 1600,
  outroDuration: 0.9,
  itemOutroDuration: 0.75,
  systemHover: {
    rotateX: 14,
    rotateY: 22,
    rotateZ: 6,
    x: 18,
    scale: 1.045,
  },
  shellDepthMultiplier: 1.45,
  itemDepthMultiplier: 1.65,
  itemHoverScale: 1.045,
  observer: {
    threshold: 0.35,
    rootMargin: "-8% 0px -12% 0px",
  },
};

const TechIcon = ({ technology, large = false }) => (
  <div
    className={`bg-tertiary rounded-full flex justify-center items-center ${
      large ? "w-20 h-20" : "w-12 h-12"
    }`}
    title={technology.name}
  >
    <BrandIcon technology={technology} large={large} />
  </div>
);

const MobileCategoryList = ({ category }) => (
  <div className="green-pink-gradient p-[1px] rounded-[20px]">
    <div className="bg-tertiary rounded-[20px] py-5 px-5">
      <h3 className="text-white font-bold text-[24px]">{category.name}</h3>
      <div className="mt-6 flex flex-wrap gap-4">
        {category.items.map((technology) => (
          <div
            key={technology.name}
            className="bg-primary rounded-2xl py-3 px-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-tertiary flex justify-center items-center">
              <BrandIcon technology={technology} />
            </div>
            <div>
              <p className="text-white text-[14px] font-bold">
                {technology.name}
              </p>
              <p className="text-secondary text-[14px]">
                {technology.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Tech = () => {
  const techSectionRef = useRef(null);
  const orbitSystemRef = useRef(null);
  const orbitActiveRef = useRef(false);
  const orbitOutroRef = useRef(null);
  const categoryMap = Object.fromEntries(
    technologyCategories.map((category) => [category.name, category.items])
  );
  const shells = [
    {
      ...shellConfigs[0],
      items: [
        categoryMap.Frontend?.find((item) => item.name === "React"),
        categoryMap.Frontend?.find((item) => item.name === "Next.js"),
        categoryMap.Frontend?.find((item) => item.name === "Tailwind CSS"),
        categoryMap.Tooling?.find((item) => item.name === "TypeScript"),
        categoryMap.Backend?.find((item) => item.name === "NestJS"),
        categoryMap.Backend?.find((item) => item.name === "ExpressJS"),
        categoryMap.Deployments?.find((item) => item.name === "Docker"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[1],
      items: [
        categoryMap.Frontend?.find((item) => item.name === "TanStack Start"),
        categoryMap.Frontend?.find((item) => item.name === "TanStack Router"),
        categoryMap.Frontend?.find((item) => item.name === "React Query"),
        categoryMap.Frontend?.find((item) => item.name === "TanStack Query"),
        categoryMap.Frontend?.find((item) => item.name === "GSAP"),
        categoryMap.Frontend?.find((item) => item.name === "Framer Motion"),
        categoryMap.Frontend?.find((item) => item.name === "shadcn/ui"),
        categoryMap.Frontend?.find((item) => item.name === "Barba.js"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[2],
      items: [
        categoryMap.Backend?.find((item) => item.name === "Prisma ORM"),
        categoryMap.Frontend?.find((item) => item.name === "Jotai"),
        categoryMap.Backend?.find((item) => item.name === "Passport.js"),
        categoryMap.Backend?.find((item) => item.name === "Discord.js"),
        categoryMap.Backend?.find((item) => item.name === "Sequelize ORM"),
        categoryMap.Backend?.find((item) => item.name === "Zod"),
        categoryMap.Data?.find((item) => item.name === "PostgreSQL"),
        categoryMap.Data?.find((item) => item.name === "SQLite"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[3],
      items: [
        categoryMap.Deployments?.find((item) => item.name === "Railway"),
        categoryMap.Deployments?.find((item) => item.name === "Vercel"),
        categoryMap.Deployments?.find((item) => item.name === "GitHub CI"),
        categoryMap.Deployments?.find((item) => item.name === "ReviveNode"),
        categoryMap.Tooling?.find((item) => item.name === "Git"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[4],
      items: [
        categoryMap.Tooling?.find((item) => item.name === "Electron.js"),
        categoryMap.Tooling?.find((item) => item.name === "Java"),
      ].filter(Boolean),
    },
  ].filter((shell) => shell.items.length > 0);

  useEffect(() => {
    const section = techSectionRef.current;
    const system = orbitSystemRef.current;
    if (!section || !system) return undefined;

    const shells = gsap.utils.toArray(".orbiting-circle", system);
    const items = gsap.utils.toArray(".orbit-item", system);
    const enter = () => {
      if (orbitActiveRef.current) return;
      orbitActiveRef.current = true;
      if (orbitOutroRef.current) {
        clearTimeout(orbitOutroRef.current);
        orbitOutroRef.current = null;
      }
      gsap.killTweensOf([system, ...shells, ...items]);
      gsap.to(system, {
        ...orbitMotionConfig.systemHover,
        delay: orbitMotionConfig.introDelay,
        duration: orbitMotionConfig.introDuration,
        ease: orbitMotionConfig.introEase,
      });
      gsap.to(shells, {
        "--orbit-hover-depth": (index, target) =>
          `${Number(target.dataset.depth) * orbitMotionConfig.shellDepthMultiplier}px`,
        delay: orbitMotionConfig.introDelay,
        duration: orbitMotionConfig.introDuration,
        ease: orbitMotionConfig.introEase,
        stagger: 0.025,
      });
      gsap.to(items, {
        "--item-hover-depth": (index, target) =>
          `${Number(target.dataset.depth) * orbitMotionConfig.itemDepthMultiplier}px`,
        scale: orbitMotionConfig.itemHoverScale,
        delay: orbitMotionConfig.introDelay,
        duration: orbitMotionConfig.introDuration,
        ease: "back.out(1.5)",
        stagger: { each: 0.008, from: "center" },
      });
    };
    const leave = () => {
      if (!orbitActiveRef.current) return;
      orbitActiveRef.current = false;
      if (orbitOutroRef.current) clearTimeout(orbitOutroRef.current);
      orbitOutroRef.current = setTimeout(() => {
        orbitOutroRef.current = null;
        gsap.killTweensOf([system, ...shells, ...items]);
        gsap.to(system, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          x: 0,
          scale: 1,
          duration: orbitMotionConfig.outroDuration,
          ease: orbitMotionConfig.introEase,
        });
        gsap.to(shells, {
          "--orbit-hover-depth": (index, target) => `${Number(target.dataset.depth)}px`,
          duration: orbitMotionConfig.outroDuration,
          ease: orbitMotionConfig.introEase,
        });
        gsap.to(items, {
          "--item-hover-depth": (index, target) => `${Number(target.dataset.depth)}px`,
          scale: 1,
          duration: orbitMotionConfig.itemOutroDuration,
          ease: orbitMotionConfig.introEase,
        });
      }, orbitMotionConfig.outroDelayMs);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enter();
        } else {
          leave();
        }
      },
      orbitMotionConfig.observer
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (orbitOutroRef.current) clearTimeout(orbitOutroRef.current);
    };
  }, []);

  return (
    <div ref={techSectionRef} className="tech-stack-section">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I use</p>
        <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        This is what I've learned and what I use to build and ship your software:
      </motion.p>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-20 hidden sm:block"
      >
        <div className="tech-orbit-stage relative mx-auto h-[760px] w-full overflow-hidden">
          <div ref={orbitSystemRef} className="tech-orbit-system">
            {shells.map((entry) => (
              <OrbitingCircles
                key={entry.key}
                radius={entry.radius}
                iconSize={entry.iconSize}
              duration={entry.duration}
              reverse={entry.reverse}
              depth={entry.depth}
              angles={entry.angles}
              centered={entry.centered}
            >
                {entry.items.map((technology) => (
                  <TechIcon
                    key={technology.name}
                    technology={technology}
                    large={entry.large}
                  />
                ))}
              </OrbitingCircles>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-20 sm:hidden grid grid-cols-1 gap-7">
        {technologyCategories.map((category) => (
          <MobileCategoryList key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
