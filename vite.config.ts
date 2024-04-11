import { defineConfig, searchForWorkspaceRoot } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis", //<-- AWS SDK
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser", // <-- Fix from above
    },
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
