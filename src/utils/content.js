import {
  AboMeezO,
  MeezOCraft,
  MeezOStudios,
  MeezOSystem,
} from "../assets";
import heroBackground from "../assets/herobg.png";

const blogModules = import.meta.glob("../content/blogs/*.mdx", { eager: true });
const projectModules = import.meta.glob("../content/projects/*.mdx", {
  eager: true,
});
const assetUrls = {
  "../assets/AboMeezO.jpg": AboMeezO,
  "../assets/MeezOCraft.jpg": MeezOCraft,
  "../assets/MeezoStudios.gif": MeezOStudios,
  "../assets/MeezOSystem.jpg": MeezOSystem,
  "../assets/herobg.png": heroBackground,
};

const slugFromPath = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.mdx.*$/, "");

const resolveAsset = (src) => {
  if (!src || src.startsWith("http") || src.startsWith("/assets/")) return src;
  if (!src.startsWith("/src/assets/")) return src;

  const key = src.replace("/src/assets/", "../assets/");
  return assetUrls[key] || src;
};

const normalizeGallery = (gallery = []) =>
  gallery.map((item) => ({
    ...item,
    src: resolveAsset(item.src),
  }));

const buildCollection = (modules, type) =>
  Object.entries(modules)
    .map(([path, module]) => {
      const slug = slugFromPath(path);
      const frontmatter = module.frontmatter || {};
      const entry = {
        slug,
        type,
        Component: module.default,
        ...frontmatter,
      };
      entry.cover = resolveAsset(entry.cover);
      entry.gallery = normalizeGallery(entry.gallery);

      if (import.meta.env.DEV && type === "project") {
        ["title", "description", "cover"].forEach((field) => {
          if (!entry[field]) {
            console.warn(`Project "${slug}" is missing required "${field}".`);
          }
        });
      }

      return entry;
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

export const blogs = buildCollection(blogModules, "blog");
export const projects = buildCollection(projectModules, "project");

export const getBlogBySlug = (slug) => blogs.find((blog) => blog.slug === slug);
export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
