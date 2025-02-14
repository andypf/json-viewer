import * as esbuild from "esbuild"
import { rmSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import postcss from "postcss"
import postcssMinify from "postcss-minify"
import fs from "fs"

const licenseText = fs.readFileSync("LICENSE.md", "utf-8")

// helpers for console log
const green = "\x1b[32m%s\x1b[0m"
const yellow = "\x1b[33m%s\x1b[0m"
const clear = "\x1B[2J"

const isProduction = process.env.NODE_ENV === "production"
const args = process.argv.slice(2).reduce((map, item) => {
  if (item.startsWith("--")) {
    let [name, value] = item.replace(/^-+/, "").split("=")
    if (value === "true") value = true
    else if (value === "false") value = false
    map[name] = value || true
  }
  return map
}, {})

await rmSync("demo/build", { recursive: true, force: true })

let cssPlugin = {
  name: "minify-css",
  setup(build) {
    build.onResolve({ filter: /^.*\.css$/ }, (args) => {
      return {
        path: resolve(args.resolveDir, args.path),
        namespace: "minify-css",
      }
    })

    build.onLoad({ filter: /.*/, namespace: "minify-css" }, async (args) => {
      const source = readFileSync(args.path, "utf-8")
      const css = await postcss(postcssMinify())
        .process(source, { from: undefined })
        .then((result) => result.css)

      return {
        contents: css,
        loader: "text",
      }
    })
  },
}
// default options
const options = {
  external: isProduction ? ["react"] : [],
  bundle: true,
  minify: isProduction,
  loader: {
    ".css": "text",
  },
  plugins: [cssPlugin],
  banner: {
    js: `
/*
${licenseText}
*/
    `,
  },
}

if (isProduction) {
  await rmSync("dist", { recursive: true, force: true })
  const prodOptions = {
    ...options,
    entryPoints: {
      index: "src/index.js",
      "react/JsonViewer": "src/react/JsonViewer.jsx",
    },
  }
  // ESM
  await esbuild.build({
    ...prodOptions,
    outdir: `dist/esm/`,
    format: "esm",
  })

  // CommonJS
  await esbuild.build({
    ...prodOptions,
    outdir: `dist/cjs/`,
    format: "cjs",
  })

  // IIFE
  await esbuild.build({
    ...prodOptions,
    entryPoints: {
      index: "src/index.js",
    },
    outdir: `dist/iife/`,
    format: "iife",
  })
}

// Themse
await esbuild.build({
  ...options,
  entryPoints: ["src/themes.js"],
  outfile: `demo/build/themes.js`,
  format: "esm",
})

let ctx = await esbuild.context({
  ...options,
  entryPoints: ["src/index.js"],
  outfile: `demo/build/index.js`,
  format: "iife",
  plugins: [
    cssPlugin,
    {
      name: "start/end",
      setup(build) {
        build.onStart(() => {
          console.log(clear)
          console.log(yellow, "Compiling...")
        })
        build.onEnd(() => console.log(green, "Done!"))
      },
    },
  ],
})

if (args.watch) {
  let { host, port } = await ctx.serve({
    servedir: "./demo",
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || 3000),
  })

  console.log("server on " + host + ":" + port)
} else {
  await ctx.rebuild()
  await ctx.dispose()
}
