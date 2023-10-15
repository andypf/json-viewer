import * as esbuild from "esbuild";

const args = process.argv.slice(2).reduce((map, item) => {
  if (item.startsWith("--")) {
    const [name, value] = item.replace(/^-+/, "").split("=");
    map[name] = value || true;
  }
  return map;
}, {});

console.log(args);

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  watch: true,
};

await esbuild.build({
  ...options,
  outfile: "dist/esm/index.mjs",
  format: "esm",
});

await esbuild.build({
  ...options,
  outfile: "dist/iife/index.js",
  format: "iife",
});

let ctx = await esbuild.context({
  ...options,
  outfile: "dist/iife/index.js",
  format: "iife",
});

let { host, port } = await ctx.serve({
  servedir: ".",
  host: "0.0.0.0",
  port: 3000,
});

console.log("server on " + host + ":" + port);
