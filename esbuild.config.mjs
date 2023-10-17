import * as esbuild from "esbuild"
import { rmSync } from "node:fs"

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

const options = {
  entryPoints: ["src/index.js"],
  outfile: `${outdir}/index.js`,
  format: "iife",
  bundle: true,
  minify: isProduction,
  loader: {
    ".css": "text",
  },
}

await esbuild.build({
  ...options,
  entryPoints: ["src/themes.js"],
  outfile: `${outdir}/themes.js`,
  format: "esm",
})

await esbuild.build({
  ...options,
  outfile: `${outdir}/esm/index.mjs`,
  format: "esm",
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
    port: 3000,
  })

  console.log("server on " + host + ":" + port)
} else {
  await ctx.rebuild()
  await ctx.dispose()
}
