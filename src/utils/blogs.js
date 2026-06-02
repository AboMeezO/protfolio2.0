import { buildCollection } from "./contentCollection";

const blogModules = import.meta.glob("../content/blogs/*.mdx", { eager: true });

export const blogs = buildCollection(blogModules, "blog");

export const getBlogBySlug = (slug) => blogs.find((blog) => blog.slug === slug);
