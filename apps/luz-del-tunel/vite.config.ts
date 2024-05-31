import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  assetsInclude: [
    "**/*.gltf",
    "**/*.glb",
    "/../src/assets/models/**/*.gltf",
    "/../src/assets/models/**/*.glb",
  ],
  define: {
    assetsInclude: [
      "**/*.gltf",
      "**/*.glb",
      "/../src/assets/models/**/*.gltf",
      "/../src/assets/models/**/*.glb",
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      buffer: "buffer",
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      // jsxRuntime: 'classic'
    }),
    tsConfigPaths(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: {},
    }),
  ],
});
