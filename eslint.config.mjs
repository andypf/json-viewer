import pluginJs from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescript,
    },

    ignores: ["**/dist/*"],
  },
]
