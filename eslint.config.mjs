import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import globals from "globals"

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        // Web Components globals
        ...globals.browser,
        customElements: "readonly",
        HTMLElement: "readonly",
        CustomEvent: "readonly",
        ShadowRoot: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
  },
  {
    ignores: ["**/dist/*"],
  },
]
