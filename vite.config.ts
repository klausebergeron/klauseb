import { defineConfig, searchForWorkspaceRoot } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
        //we can use the `memfs` package to polyfill it.
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
