import * as esbuild from "esbuild"
import { rmSync } from "node:fs"
import { env } from "node:process"

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

const outdir = isProduction ? "dist" : "public/dist"
await rmSync(outdir, { recursive: true, force: true })

// default options
const options = {
  external: ["react"],
  entryPoints: {
    themes: "src/themes.js",
    index: "src/index.js",
    "react/JsonViewer": "src/react/JsonViewer.jsx",
  },
  outdir: `${outdir}/iife`,
  format: "iife",
  bundle: true,
  minify: isProduction,
  loader: {
    ".css": "text",
  },
}

// ESM
await esbuild.build({
  ...options,
  outdir: `${outdir}/esm/`,
  format: "esm",
})

// CommonJS
await esbuild.build({
  ...options,
  outdir: `${outdir}/cjs/`,
  format: "cjs",
})

let ctx = await esbuild.context({
  ...options,
  plugins: [
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
    servedir: "./public",
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || 3000),
  })

  console.log("server on " + host + ":" + port)
} else {
  await ctx.rebuild()
  await ctx.dispose()
}
