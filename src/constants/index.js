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
      ].includes(technology.name)
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
      ].includes(technology.name)
    ),
  },
  {
    name: "Data",
    items: technologies.filter((technology) =>
      ["SQLite", "PostgreSQL"].includes(technology.name)
    ),
  },
  {
    name: "Deployments",
    items: technologies.filter((technology) =>
      ["Docker", "Railway", "GitHub CI", "Vercel", "ReviveNode"].includes(
        technology.name
      )
    ),
  },
  {
    name: "Tooling",
    items: technologies.filter((technology) =>
      ["Electron.js", "Git", "TypeScript", "Java"].includes(technology.name)
    ),
  },
];

const experiences = [
  {
    title: "Web Development",
    company_name: "X-Tag",
    icon: freelancing,
    iconBg: "#E6DEDD",
    date: "2018 - 2019",
    points: [
      "Began my journey in web development at X-Tag, a small company where I honed my skills in creating responsive and visually engaging websites.",
      "Gained hands-on experience with the basics of web technology while working alongside a team, laying the foundation for my future in the field.",
    ],
  },
  {
    title: "Web Development (Freelance)",
    company_name: "Freelance",
    icon: freelancing,
    iconBg: "#E6DEDD",
    date: "2019 - 2022",
    points: [
      "Worked independently as a freelance front-end developer, managing projects and connecting directly with clients.",
      "Expanded my expertise in front-end technologies and adapted to various project requirements, mastering essential tools and frameworks.",
    ],
  },
  {
    title: "Game Development",
    company_name: "Freelance",
    icon: MeezOCraft,
    iconBg: "#E6DEDD",
    date: "2022 - 2024",
    points: [
      "Specialized in creating and optimizing Minecraft servers and custom plugins during my venture into game development.",
      "Blended creativity with technical skills to build unique gaming experiences and enhance server functionality for players.",
    ],
  },
  {
    title: "The Dream Came True",
    company_name: "MeezO Studios",
    icon: MeezOStudios,
    iconBg: "#E6DEDD",
    date: "2022 - Present",
    points: [
      "Established MeezO Studios, a software company exploring diverse fields like web development, mobile apps, game development, and AI-driven projects.",
      "Tackled innovative projects, pushing boundaries, and bringing ideas to life across different tech landscapes.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial: "طاقم عمل ممتاز وا سرعه الرد مذهله ايضا شكرا لابو ميزو",
    name: "Rox",
    designation: "CEO",
    company: "LEX Network",
    image:
      "https://cdn.discordapp.com/avatars/1045257962568032326/711278a13ff894fe5d06b4a713c948d1.webp?size=1024",
  },
  {
    testimonial:
      "Although Abo Tasneem is more experienced than me, he never got mad on me, he was the kind of person that cares and provide help when LLMs didn't know the issue 🙂, Overall after working with him I gained alot of experience, my best wishes for him 🤍. ",
    name: "𝐏𝐨𝐭𝐚𝐭𝐨 ",
    designation: "Junior JS developer",
    company: "devRoot",
    image: "https://i.postimg.cc/3rfhk8GH/vas-Cs-Mm-G3Acgy.png",
  },
  {
    testimonial:
      "من افضل المبرمجين اللي تعاملت معهم يتميز بلمساته المختلفه وتنظيم رهيب للملفات وطريقة احترافية في إدارة الاكواد تضمن ان المشروع يطلع بأفضل اداء ممكن. صحيح احيانا ياخذ وقت في بعض المشاريع المعقدة بس النتيجة النهائيه دائما مبهره وتستحق الانتظار..زبدة الرأي شخص متعاون، فاهم شغله، ويتعامل باحتراف عالي اتمنى له كل التوفيق والنجاح في مسيرته.",
    name: "Khaton",
    designation: "CEO",
    company: "Vision Art Studio",
    image: "https://i.postimg.cc/BQJPmvGH/761ddea508fe5379a52801b7510399cb.png",
  },
];

const projects = [
  {
    name: "MeezO MC",
    description:
      " MeezO MC is a unique Minecraft server custom-coded by MeezO Studios. It features custom plugins and special features that enhance the gaming experience and make it fun and unique. ",
    tags: [
      {
        name: "minecraft",
        color: "blue-text-gradient",
      },
      {
        name: "plugins",
        color: "green-text-gradient",
      },
      {
        name: "gaming",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOCraft,
    source_code_link: "https://discord.gg/pqbHtVm2Ne",
  },
  {
    name: "MeezO System",
    description:
      "MeezO System is a free Discord bot that offers all the features you might need, including those never implemented in any other bot! If you're looking for a way to manage your server or engage users more efficiently, this bot is the perfect solution.",
    tags: [
      {
        name: "discord",
        color: "blue-text-gradient",
      },
      {
        name: "bot",
        color: "green-text-gradient",
      },
      {
        name: "automation",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOSystem,
    source_code_link: "", // Source code link not available yet
  },
  {
    name: "MeezO Studios",
    description:
      "MeezO Studios is an online store offering a variety of gaming-related products. Here you can find all the unique merchandise you need. ",
    tags: [
      {
        name: "store",
        color: "blue-text-gradient",
      },
      {
        name: "gaming",
        color: "green-text-gradient",
      },
      {
        name: "merchandise",
        color: "pink-text-gradient",
      },
    ],
    image: MeezOStudios,
    source_code_link: "https://discord.gg/eqcHfpDAC3",
  },
];

export { services, technologies, technologyCategories, experiences, testimonials, projects };
