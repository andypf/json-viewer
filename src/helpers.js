// This function generates a custom CSS style based on the provided name and theme JSON object.
export const customThemeStyle = (name, customThemeJson) => {
  // Initialize the style string with a CSS class selector and a comment
  const style =
    Object.keys(customThemeJson).reduce((css, key) => {
      // Add each custom CSS property and its value to the style string
      return `${css}  --${key}: ${customThemeJson[key]};\n`;
    }, `\n/* custom theme */\n.${name} {\n`) + "}\n"; // Complete the CSS block

  return style; // Return the generated CSS style string
};

// This function checks if a string is a valid URL.
export const isUrl = (string) => {
  try {
    // Attempt to create a URL object from the input string
    return Boolean(new URL(string)); // Return true if successful
  } catch (e) {
    // If an error occurs (invalid URL), return false
    return false;
  }
};

// This function determines the type of data.
export const dataType = (data) => {
  if (Array.isArray(data)) return "array"; // Check if data is an array
  if (data === null) return "null"; // Check if data is null
  if (data instanceof RegExp) return "regexp"; // Check if data is a regular expression

  const type = typeof data; // Get the JavaScript type of data
  if (type === "number") {
    if (isNaN(data)) return "NaN"; // Check if data is NaN
    return Number.isInteger(data) ? "int" : "float"; // Check if data is integer or float
  }
  if (type === "boolean") return "bool"; // Check if data is a boolean

  if (type === "object" && data instanceof Date) {
    return "date";
  }
  return type; // Return the type of data as a string (e.g., "string", "object")
};

// This function parses a JSON string with custom handling for "NaN" and "undefined" strings.
export const parseJson = (jsonString) => {
  // Replace ": NaN" and ": undefined" with ": "NaN"" and ": "undefined"" for valid JSON syntax
  const fixedJsonString = jsonString
    .replace(/:\s*NaN/gi, ': "NaN"')
    .replace(/:\s*undefined/gi, ': "undefined"');

  // Define a custom reviver function for JSON parsing
  const customReviver = (key, value) => {
    if (value === "NaN") {
      return NaN; // Convert "NaN" to the actual NaN value
    }
    if (value === "undefined") {
      return undefined; // Convert "undefined" to the undefined value
    }

    return value;
  };

  console.log("===", fixedJsonString);

  // Parse the modified JSON string using the custom reviver function
  return JSON.parse(fixedJsonString, customReviver);
};
