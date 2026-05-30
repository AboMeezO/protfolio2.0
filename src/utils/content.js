const blogModules = import.meta.glob("../content/blogs/*.mdx", { eager: true });
const projectModules = import.meta.glob("../content/projects/*.mdx", {
  eager: true,
});

const allAssets = import.meta.glob([
  "../assets/*.{png,jpg,jpeg,gif,svg,webp}",
  "../assets/**/*.{png,jpg,jpeg,gif,svg,webp}"
], { eager: true, import: 'default' });

const slugFromPath = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.mdx.*$/, "");

const resolveAsset = (src) => {
  if (!src || src.startsWith("http") || src.startsWith("/assets/")) return src;
  
  // Handle paths like "/src/assets/..." from MDX frontmatter
  if (src.startsWith("/src/assets/")) {
    const key = src.replace("/src/assets/", "../assets/");
    return allAssets[key] || src;
  }
  
  return src;
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
