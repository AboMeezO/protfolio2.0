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
  { key: "outer-core", radius: 318, iconSize: 82, duration: 43, reverse: false, large: true, depth: 0, angles: [-92, -16, 58, 154, 232] },
  { key: "frontend-shapers", radius: 274, iconSize: 70, duration: 36, reverse: true, large: false, depth: 22, angles: [-142, -36, 74, 172] },
  { key: "motion-data", radius: 230, iconSize: 62, duration: 29, reverse: false, large: false, depth: 46, angles: [-118, -8, 88, 184, 274] },
  { key: "state-field", radius: 188, iconSize: 56, duration: 24, reverse: true, large: false, depth: 72, angles: [-156, 24, 214] },
  { key: "backend-services", radius: 154, iconSize: 50, duration: 20, reverse: false, large: false, depth: 98, angles: [-74, 32, 146, 252] },
  { key: "deploy-data", radius: 120, iconSize: 44, duration: 17, reverse: true, large: false, depth: 124, angles: [-136, -14, 108, 220] },
  { key: "tooling-core", radius: 96, iconSize: 38, duration: 14, reverse: false, large: false, depth: 150, angles: [-96, 14, 140, 236] },
  { key: "inner-core", radius: 0, iconSize: 34, duration: 11, reverse: true, large: false, depth: 174, centered: true, angles: [0] },
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
        categoryMap.Frontend?.find((item) => item.name === "TypeScript"),
        categoryMap.Backend?.find((item) => item.name === "NestJS"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[1],
      items: [
        categoryMap.Frontend?.find((item) => item.name === "TanStack Start"),
        categoryMap.Frontend?.find((item) => item.name === "GSAP"),
        categoryMap.Frontend?.find((item) => item.name === "shadcn/ui"),
        categoryMap.Backend?.find((item) => item.name === "ExpressJS"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[2],
      items: [
        categoryMap.Frontend?.find((item) => item.name === "TanStack Router"),
        categoryMap.Frontend?.find((item) => item.name === "Framer Motion"),
        categoryMap.Frontend?.find((item) => item.name === "React Query"),
        categoryMap.Backend?.find((item) => item.name === "Prisma ORM"),
        categoryMap.Deployments?.find((item) => item.name === "Docker"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[3],
      items: [
        categoryMap.Frontend?.find((item) => item.name === "Barba.js"),
        categoryMap.Frontend?.find((item) => item.name === "TanStack Query"),
        categoryMap.Frontend?.find((item) => item.name === "Jotai"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[4],
      items: [
        categoryMap.Backend?.find((item) => item.name === "Passport.js"),
        categoryMap.Backend?.find((item) => item.name === "Discord.js"),
        categoryMap.Backend?.find((item) => item.name === "Sequelize ORM"),
        categoryMap.Backend?.find((item) => item.name === "Zod"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[5],
      items: [
        ...(categoryMap.Data || []),
        categoryMap.Deployments?.find((item) => item.name === "Railway"),
        categoryMap.Deployments?.find((item) => item.name === "Vercel"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[6],
      items: [
        categoryMap.Deployments?.find((item) => item.name === "GitHub CI"),
        categoryMap.Deployments?.find((item) => item.name === "ReviveNode"),
        categoryMap.Tooling?.find((item) => item.name === "Git"),
        categoryMap.Tooling?.find((item) => item.name === "Java"),
      ].filter(Boolean),
    },
    {
      ...shellConfigs[7],
      items: [
        categoryMap.Tooling?.find((item) => item.name === "Electron.js"),
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
