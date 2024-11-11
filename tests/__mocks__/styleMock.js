import { readFileSync } from "fs"
import { resolve } from "path"

const cssText = readFileSync(resolve(__dirname, "../../src/styles.css"), "utf8")

export default cssText
