import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig(({ mode }) => {
  // Detect which build mode we're in
  const isLibBuild = mode === "lib"
  const isDemoBuild = mode === "demo"

  if (isLibBuild) {
    console.log("Building library...")
    return {
      build: {
        lib: {
          entry: resolve(__dirname, "src/package/index.ts"),
          name: "AndypfJsonViewer",
          fileName: (format) => `${format}/index.js`,
          formats: ["es", "iife"], // ESM and IIFE formats
        },
        outDir: "dist",
        emptyOutDir: true,
      },
    }
  } else if (isDemoBuild) {
    console.log("Building demo...")
    return {
      root: resolve(__dirname, "src/demo"),
      build: {
        outDir: "../../dist/demo",
        emptyOutDir: true,
      },
    }
  } else {
    console.log("Starting development server for demo...")
    return {
      root: resolve(__dirname, "src/demo"),
      server: {
        open: true,
        host: "0.0.0.0",
      },
    }
  }
})
