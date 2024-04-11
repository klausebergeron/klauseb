import { defineConfig, searchForWorkspaceRoot } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import path from "path";
import glob from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  root: path.join(__dirname, ""),
  build: {
    outDir: path.join(__dirname, "build"),
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, "", "*.html")),
    },
  },
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
    ],
  },
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: "dev", // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      overrides: {
        // Since `fs` is not supported in browsers
        fs: "memfs",
      },
    }),
  ],
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: [searchForWorkspaceRoot(process.cwd()), "/"],
    },
  },
});
