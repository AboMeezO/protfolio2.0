import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { parse } from "yaml";

const mdxFrontmatter = () => ({
  name: "mdx-frontmatter-export",
  enforce: "pre",
  transform(code, id) {
    if (!id.endsWith(".mdx")) return null;

    const match = code.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const frontmatter = match ? parse(match[1]) || {} : {};

    return {
      code: `${code}\n\nexport const frontmatter = ${JSON.stringify(frontmatter)};`,
      map: null,
    };
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // base: mode === "production" ? "/abomeezo/" : "/",
  base: "/",
  plugins: [
    mdxFrontmatter(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      rehypePlugins: [rehypeHighlight],
      providerImportSource: "@mdx-js/react",
    }),
    react(),
  ],
  server: {
    host: true,
    port: 5163,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 5174,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("maath")
          ) {
            return "three-vendor";
          }
          if (id.includes("@mdx-js") || id.includes("react-markdown")) {
            return "markdown-vendor";
          }
          if (id.includes("react-router-dom")) return "router-vendor";
          if (id.includes("react-dom") || id.includes("react")) return "react-vendor";
          if (id.includes("framer-motion") || id.includes("gsap")) {
            return "motion-vendor";
          }
          if (id.includes("simple-icons")) return "icons-vendor";
          if (id.includes("@barba")) return "transition-vendor";
        },
      },
    },
    chunkSizeWarningLimit: 1100,
  },
}));
