export const customThemeStyle = (name, customThemeJson) => {
  const colorValues = Object.keys(customThemeJson).map(
    (key) => `  --${key}: ${customThemeJson[key]};`
  )
  const style = `\n/* custom theme */\n.${name} {\n${colorValues.join(
    "\n"
  )}\n}\n`

  return style
}

export const isUrl = (string) => {
  try {
    return Boolean(new URL(string))
  } catch (e) {
    return false
  }
}

export const dataType = (data) => {
  if (Array.isArray(data)) return "array"
  if (data === null) return "null"
  if (data && data instanceof RegExp) return "regexp"
  const type = typeof data
  if (type === "number") {
    return Number.isInteger(data) ? "integer" : "float"
  }
  return type
}
