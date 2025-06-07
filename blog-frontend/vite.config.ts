// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  server: {
    host: "frontend.youssefmalek.blog",
    port: 5173,
  },
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMath, [remarkMdxFrontmatter, { name: "frontmatter" }]],
      rehypePlugins: [rehypeKatex],
    }),
  ],
});
