import { buildCollection } from "./contentCollection";

const projectModules = import.meta.glob("../content/projects/*.mdx", {
  eager: true,
});

const allAssets = import.meta.glob(
  [
    "../assets/*.{png,jpg,jpeg,gif,svg,webp}",
    "../assets/**/*.{png,jpg,jpeg,gif,svg,webp}",
  ],
  { eager: true, import: "default" },
);

const resolveAsset = (src) => {
  if (!src || src.startsWith("http") || src.startsWith("/assets/")) return src;

  if (src.startsWith("/src/assets/")) {
    const key = src.replace("/src/assets/", "../assets/");
    return allAssets[key] || src;
  }

  return src;
};

export const projects = buildCollection(projectModules, "project", resolveAsset);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
