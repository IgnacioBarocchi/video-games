import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
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
    react(),
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
/*
import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin"; //"vite-plugin-electron/simple";
import { customStart, loadViteEnv } from "vite-electron-plugin/plugin";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });
  const soruceMap = command === "serve" || !!process.env.VSCODE_DEBUG;
  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    plugins: [
      react(),
      tsConfigPaths(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: "electron/main.ts",
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.join(__dirname, "electron/preload.ts"),
        },
        // Ployfill the Electron and Node.js built-in modules for Renderer process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {},
        plugins: [
          ...(!!process.env.VSCODE_DEBUG
            ? [
                customStart(() => {
                  debounce(() => console.log("[startup] Electron App"));
                }),
              ]
            : []),
          loadViteEnv(),
        ],
      }),
      renderer({ nodeIntegration: true }),
    ],
  };
});
*/
