export const slugFromPath = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.mdx.*$/, "");

export const normalizeGallery = (gallery = [], resolveAsset = (src) => src) =>
  gallery.map((item) => ({
    ...item,
    src: resolveAsset(item.src),
  }));

export const buildCollection = (modules, type, resolveAsset = (src) => src) =>
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
      entry.gallery = normalizeGallery(entry.gallery, resolveAsset);

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
