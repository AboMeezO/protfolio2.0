import {
  mobile,
  backend,
  web,
  reactjs,
  tailwind,
  nodejs,
  git,
  MeezOStudios,
  MeezOCraft,
  MeezOSystem,
  freelancing,
  discord,
  Electron,
  docker,
  typescript,
  java,
  carrent,
  jobit,
  tripguide,
  selfhost,
  DevRoots,
} from "../assets";
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Web Developer",
    icon: web,
  },
  {
    title: "Native Apps Developer",
    icon: mobile,
  },
  {
    title: "Discord Bots Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "React",
    icon: reactjs,
    iconKey: "react",
    shortLabel: "React",
    experience: "Advanced interface architecture and component systems",
  },
  {
    name: "Next.js",
    iconKey: "nextdotjs",
    shortLabel: "Next",
    experience: "Full-stack React applications and app router workflows",
  },
  {
    name: "TanStack Start",
    iconKey: "tanstack",
    shortLabel: "TS",
    experience: "Modern React full-stack routing and data workflows",
  },
  {
    name: "TanStack Router",
    iconKey: "tanstack",
    shortLabel: "TR",
    experience: "Type-safe client routing and nested application structure",
  },
  {
    name: "GSAP",
    iconKey: "gsap",
    shortLabel: "GSAP",
    experience: "High-control motion systems and timeline animation",
  },
  {
    name: "Framer Motion",
    iconKey: "framer",
    shortLabel: "FM",
    experience: "Declarative UI motion and interaction choreography",
  },
  {
    name: "React Query",
    iconKey: "reactquery",
    shortLabel: "RQ",
    experience: "Server-state orchestration and client caching",
  },
  {
    name: "TanStack Query",
    iconKey: "tanstack",
    shortLabel: "TQ",
    experience: "Typed async data flows and resilient fetch state",
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    iconKey: "tailwindcss",
    shortLabel: "TW",
    experience: "Utility-first styling inside constrained design systems",
  },
  {
    name: "Jotai",
    shortLabel: "J",
    experience: "Atomic state modeling for focused React surfaces",
  },
  {
    name: "shadcn/ui",
    iconKey: "shadcnui",
    shortLabel: "UI",
    experience: "Composable UI primitives and app-facing design systems",
  },
  {
    name: "Barba.js",
    shortLabel: "B",
    experience: "Navigation transitions and page-flow animation",
  },
  {
    name: "NestJS",
    iconKey: "nestjs",
    shortLabel: "Nest",
    experience: "Structured backend services and modular server design",
  },
  {
    name: "ExpressJS",
    icon: nodejs,
    iconKey: "express",
    shortLabel: "Ex",
    experience: "Lean APIs and custom middleware-driven backends",
  },
  {
    name: "Prisma ORM",
    iconKey: "prisma",
    shortLabel: "Pr",
    experience: "Type-safe database access and schema workflows",
  },
  {
    name: "Sequelize ORM",
    iconKey: "sequelize",
    shortLabel: "Sq",
    experience: "Relational modeling and query abstraction",
  },
  {
    name: "Zod",
    iconKey: "zod",
    shortLabel: "Z",
    experience: "Runtime validation and contract enforcement",
  },
  {
    name: "Passport.js",
    iconKey: "passport",
    shortLabel: "P",
    experience: "Authentication strategies and session/token flows",
  },
  {
    name: "Discord.js",
    icon: discord,
    iconKey: "discord",
    shortLabel: "D",
    experience: "Bot platforms, command systems, and community tooling",
  },
  {
    name: "SQLite",
    iconKey: "sqlite",
    shortLabel: "SQL",
    experience: "Embedded data layers and lightweight persistence",
  },
  {
    name: "PostgreSQL",
    iconKey: "postgresql",
    shortLabel: "PG",
    experience: "Relational data design and production query workflows",
  },
  {
    name: "Docker",
    icon: docker,
    iconKey: "docker",
    shortLabel: "DK",
    experience: "Containerized development and deployment packaging",
  },
  {
    name: "Railway",
    iconKey: "railway",
    shortLabel: "RW",
    experience: "Managed deployment pipelines and hosted services",
  },
  {
    name: "GitHub CI",
    iconKey: "githubactions",
    shortLabel: "CI",
    experience: "Automated checks, workflows, and release pipelines",
  },
  {
    name: "Vercel",
    iconKey: "vercel",
    shortLabel: "V",
    experience: "Frontend hosting, previews, and edge deployment",
  },
  {
    name: "ReviveNode",
    shortLabel: "RN",
    experience: "Node hosting and operational deployment management",
  },
  {
    name: "Electron.js",
    icon: Electron,
    iconKey: "electron",
    shortLabel: "El",
    experience: "Desktop applications with web-native stacks",
  },
  {
    name: "Git",
    icon: git,
    iconKey: "git",
    shortLabel: "Git",
    experience: "Version control, branching, and collaborative delivery",
  },
  {
    name: "TypeScript",
    icon: typescript,
    iconKey: "typescript",
    shortLabel: "TS",
    experience: "Typed application architecture across frontend and backend",
  },
  {
    name: "Java",
    icon: java,
    shortLabel: "J",
    experience: "Server plugins, tooling, and strongly typed application logic",
  },
];

const technologyCategories = [
  {
    name: "Frontend",
    items: technologies.filter((technology) =>
      [
        "React",
        "Next.js",
        "TanStack Start",
        "TanStack Router",
        "GSAP",
        "Framer Motion",
        "React Query",
        "TanStack Query",
        "Tailwind CSS",
        "Jotai",
        "shadcn/ui",
        "Barba.js",
      ].includes(technology.name),
    ),
  },
  {
    name: "Backend",
    items: technologies.filter((technology) =>
      [
        "NestJS",
        "ExpressJS",
        "Prisma ORM",
        "Sequelize ORM",
        "Zod",
        "Passport.js",
        "Discord.js",
      ].includes(technology.name),
    ),
  },
  {
    name: "Data",
    items: technologies.filter((technology) =>
      ["SQLite", "PostgreSQL"].includes(technology.name),
    ),
  },
  {
    name: "Deployments",
    items: technologies.filter((technology) =>
      ["Docker", "Railway", "GitHub CI", "Vercel", "ReviveNode"].includes(
        technology.name,
      ),
    ),
  },
  {
    name: "Tooling",
    items: technologies.filter((technology) =>
      ["Electron.js", "Git", "TypeScript", "Java"].includes(technology.name),
    ),
  },
];

const experiences = [
  {
    title: "Early Programming Exploration",
    company_name: "Self-learning Phase",
    icon: freelancing,
    iconBg: "#E6DEDD",
    date: "2019 - 2022",
    points: [
      "Started learning programming in an unstructured way while still in school, exploring different paths without a clear direction.",
      "Initially experimented with Java after randomly discovering it online, before shifting focus toward web development.",
      "Transitioned into frontend development after being guided by a software developer family member, which later led into full-stack development.",
    ],
  },
  {
    title: "Full-Stack Web Developer",
    company_name: "Freelance",
    icon: freelancing,
    iconBg: "#E6DEDD",
    date: "2022 - Present",
    points: [
      "Working independently as a freelance developer building web applications and custom software systems.",
      "Focused on React and NestJS ecosystems while continuously experimenting with modern tools like the TanStack ecosystem.",
      "Building real-world projects as a way to learn through practice rather than formal work experience, improving by solving actual problems.",
    ],
  },
  {
    title: "Self-Hosted Tools & Systems Builder",
    company_name: "Personal Projects",
    icon: selfhost,
    iconBg: "#E6DEDD",
    date: "Ongoing",
    points: [
      "Built and maintained personal tools focused on improving the way I use software in daily workflows.",
      "Created a self-hosted helper desktop application to simplify and automate parts of the self-hosting process.",
      "Most projects originate from practical problems I run into and a tendency to simplify or remove repetitive work.",
    ],
  },
  {
    title: "devRoot",
    company_name: "Independent Project",
    icon: DevRoots,
    iconBg: "#E6DEDD",
    date: "Present",
    points: [
      "Started devRoot as an independent initiative to push myself into real-world software development through responsibility and execution.",
      "Building and managing everything alone, from development to planning and execution, as a learning-driven environment.",
      "Expanding beyond coding into broader areas like product thinking and basic business understanding through hands-on experience.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "???? ??? ????? ????? ???? ????? ????? ???? ???? ????.",
    name: "Rox",
    designation: "CEO",
    company: "LEX Network",
    image:
      "https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg",
  },
  {
    testimonial:
      "Although Abo Tasneem is more experienced than me, he never got mad at me. He is the kind of person who cares and provides help when LLMs cannot find the issue. Overall, after working with him I gained a lot of experience. My best wishes for him.",
    name: "Potato",
    designation: "Junior JS developer",
    company: "devRoot",
    image: "https://i.postimg.cc/3rfhk8GH/vas-Cs-Mm-G3Acgy.png",
  },
  {
    testimonial:
      "?? ???? ????????? ???? ?????? ????. ????? ??????? ???????? ?????? ???? ??????? ?????? ???????? ?? ????? ???????? ???????? ???????? ????? ????? ?????? ????????. ??? ??????? ???? ????? ??????? ??????? ????. ????? ?? ?? ??????? ??????? ?? ??????.",
    name: "Khaton",
    designation: "CEO",
    company: "Vision Art Studio",
    image: "https://i.postimg.cc/BQJPmvGH/761ddea508fe5379a52801b7510399cb.png",
  },
];
const projects = [
  {
    name: "DevRoots Studio v2",
    description:
      "A production-ready, full-stack application powering an agency platform, user dashboard, and a Discord Bot Builder store. Features modular architecture with NestJS and React.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "NestJS",
        color: "green-text-gradient",
      },
      {
        name: "Prisma",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOStudios,
    source_code_link: "https://github.com/AboMeezO",
  },
  {
    name: "EV King V2",
    description:
      "A premium headless digital storefront for electric vehicles. Features custom inventory management, financial tools, and ultra-fast performance with React 19 and NestJS.",
    tags: [
      {
        name: "React19",
        color: "blue-text-gradient",
      },
      {
        name: "TailwindV4",
        color: "green-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/AboMeezO",
  },
  {
    name: "Sentinel (PayPal Bot)",
    description:
      "An enterprise financial orchestration layer for Discord. Handles PayPal invoices, real-time balance tracking, and secure transaction processing with AES-256 encryption.",
    tags: [
      {
        name: "Discord.js",
        color: "blue-text-gradient",
      },
      {
        name: "PayPal-API",
        color: "green-text-gradient",
      },
      {
        name: "Security",
        color: "pink-text-gradient",
      },
    ],
    image: backend,
    source_code_link: "https://github.com/AboMeezO",
  },
  {
    name: "SelfHost Helper",
    description:
      "A desktop cockpit for local development. Combines process management, resource monitoring, a VS Code-powered editor, and Cloudflare tunneling into one app.",
    tags: [
      {
        name: "Electron",
        color: "blue-text-gradient",
      },
      {
        name: "Monaco",
        color: "green-text-gradient",
      },
      {
        name: "Vite",
        color: "pink-text-gradient",
      },
    ],
    image: Electron,
    source_code_link: "https://github.com/DevRoots-Studio/SelfHost-Helper",
  },
  {
    name: "Bot-TV System",
    description:
      "High-fidelity media streaming platform for Discord. Overcomes platform constraints to deliver synchronized HD video and audio using FFmpeg and headless orchestration.",
    tags: [
      {
        name: "FFmpeg",
        color: "blue-text-gradient",
      },
      {
        name: "Puppeteer",
        color: "green-text-gradient",
      },
      {
        name: "Automation",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/AboMeezO",
  },
  {
    name: "D.js Starter Template",
    description:
      "A modern Discord.js starter template featuring CommandKit, built-in SQLite/Sequelize support, and a clean modular architecture for rapid bot development.",
    tags: [
      {
        name: "Discord.js",
        color: "blue-text-gradient",
      },
      {
        name: "CommandKit",
        color: "green-text-gradient",
      },
      {
        name: "SQLite",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/AboMeezO/D.js-Starter-Files",
  },
  {
    name: "MeezO System",
    description:
      "MeezO System is a free Discord bot that offers all the features you might need, including those never implemented in any other bot! Perfect for server management and engagement.",
    tags: [
      {
        name: "Discord",
        color: "blue-text-gradient",
      },
      {
        name: "Bot",
        color: "green-text-gradient",
      },
      {
        name: "Automation",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOSystem,
    source_code_link: "https://github.com/AboMeezO",
  },
  {
    name: "MeezO MC",
    description:
      "A unique Minecraft server custom-coded by MeezO Studios. Features custom plugins and special mechanics that enhance the gaming experience for a unique community.",
    tags: [
      {
        name: "Minecraft",
        color: "blue-text-gradient",
      },
      {
        name: "Java",
        color: "green-text-gradient",
      },
      {
        name: "Plugins",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOCraft,
    source_code_link: "https://discord.gg/pqbHtVm2Ne",
  },
];

export {
  services,
  technologies,
  technologyCategories,
  experiences,
  testimonials,
  projects,
};
