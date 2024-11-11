// This function checks if a string is a valid URL.
export const isUrl = (string) => {
  try {
    // Attempt to create a URL object from the input string
    return Boolean(new URL(string)) // Return true if successful
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.debug(error)
    // If an error occurs (invalid URL), return false
    return false
  }
}

// This function determines the type of data.
export const dataType = (data) => {
  if (Array.isArray(data)) return "array" // Check if data is an array
  if (data === null) return "null" // Check if data is null
  if (data instanceof RegExp) return "regexp" // Check if data is a regular expression

  const type = typeof data // Get the JavaScript type of data
  if (type === "number") {
    if (isNaN(data)) return "NaN" // Check if data is NaN
    if (!isFinite(data)) return "Infinity" // Check if data is Infinity
    return Number.isInteger(data) ? "int" : "float" // Check if data is integer or float
  }
  if (type === "boolean") return "bool" // Check if data is a boolean

  if (type === "object" && data instanceof Date) {
    return "date"
  }
  return type // Return the type of data as a string (e.g., "string", "object")
}

// This function parses a JSON string with custom handling for "NaN" and "undefined" strings.
export const parseJson = (jsonString) => {
  // Replace ": NaN" and ": undefined" with ": "NaN"" and ": "undefined"" for valid JSON syntax
  const fixedJsonString = jsonString
    // replace new lines
    .replace(/\n/gi, " ")
    // replace all NaN values with "NaN"
    .replace(/:\s*NaN/gi, ': "NaN"')
    // replace all undefined values with "undefined"
    .replace(/:\s*undefined/gi, ': "undefined"')
    // replace all NaN in arrays with "NaN"
    .replace(/\[(.*)NaN(.*)\]/gi, '[$1"NaN"$2]')
    // replace undefined in arrays with "undefined"
    .replace(/\[(.*)undefined(.*)\]/gi, '[$1"undefined"$2]')

  // Define a custom reviver function for JSON parsing
  const customReviver = (key, value) => {
    if (value === "NaN") {
      return NaN // Convert "NaN" to the actual NaN value
    } else if (Array.isArray(value)) {
      return value.map((v) => {
        if (v === "NaN") {
          return NaN // Convert "NaN" to the actual NaN value
        } else if (v === "undefined") {
          return undefined // Convert "undefined" to the undefined value
        }
        return v
      })
    } else if (value === "undefined") {
      return undefined // Convert "undefined" to the undefined value
    }

    return value
  }

  // Parse the modified JSON string using the custom reviver function
  return JSON.parse(fixedJsonString, customReviver)
}
