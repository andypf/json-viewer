const { readFileSync } = require("fs")
const { resolve } = require("path")

const cssText = readFileSync(resolve(__dirname, "../../src/styles.css"), "utf8")

module.exports = cssText
