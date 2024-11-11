import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import jest from "eslint-plugin-jest"

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // ######### JEST ##########
  // {
  //   files: ["**/*.test.js", "**/*.config.js", "__tests__/**", "test/__mocks__/**"],
  //   languageOptions: { sourceType: "commonjs" },
  // },
  {
    files: ["__tests__/**", "**/*.test.js", "__mocks__/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
      "jest/no-disabled-tests": "off",
    },
  },
  {
    ignores: ["**/dist/*", "demo/build/*", "coverage/*"],
  },
]
