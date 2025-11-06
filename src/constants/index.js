import {
  mobile,
  backend,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  threejs,
  MeezOStudios,
  MeezOCraft,
  MeezOSystem,
  freelancing,
  python,
  discord,
  Electron,
  aref,
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
    name: "HTML 5",
    icon: html,
    experience: "3+ years building semantic, accessible websites",
  },
  {
    name: "CSS 3",
    icon: css,
    experience: "3+ years crafting responsive layouts and animations",
  },
  {
    name: "JavaScript",
    icon: javascript,
    experience: "3+ years developing interactive web applications",
  },

  {
    name: "React JS",
    icon: reactjs,
    experience: "2+ years building dynamic SPAs and component libraries",
  },
  {
    name: "React Native",
    icon: reactjs,
    experience: "1+ years developing cross-platform mobile apps",
  },
  {
    name: "Discord JS",
    icon: discord,
    experience: "3+ years building scalable bot architectures",
  },
  {
    name: "Electron JS",
    icon: Electron,
    experience: "2+ years building cross-platform desktop applications",
  },

  {
    name: "Python",
    icon: python,
    experience: "3+ years developing scripts and automation tools",
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    experience: "2+ years building modern, utility-first interfaces",
  },
  {
    name: "Node JS",
    icon: nodejs,
    experience: "2+ years building REST APIs and microservices",
  },
  {
    name: "MongoDB",
    icon: mongodb,
    experience: "2+ years designing NoSQL database architectures",
  },
  {
    name: "Three JS",
    icon: threejs,
    experience: "1+ years creating 3D web experiences",
  },
  {
    name: "git",
    icon: git,
    experience: "3+ years using version control in team environments",
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

export { services, technologies, experiences, testimonials, projects };
