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
    if (isNaN(data)) return "NaN"
    return Number.isInteger(data) ? "int" : "float"
  }
  if (type === "boolean") return "bool"
  return type
}

export const parseJson = (jsonString) => {
  jsonString = jsonString
    .replace(/:\s*NaN/gi, ': "NaN"')
    .replace(/:\s*undefined/gi, ': "undefined"')

  return JSON.parse(jsonString, (key, value) => {
    if (value === null || value === "NaN" || value === "undefined") {
      return eval(value)
    }
    return value
  })
}
