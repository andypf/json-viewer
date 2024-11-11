export const validateBoolean = (value) => {
  if (typeof value === "boolean") return value
  if (value === "true") return true
  else if (value === "false") return false

  throw new Error(`should be a boolean!`)
}

export const validateString = (value) => {
  if (typeof value === "string") return value

  throw new Error(`should be a string!`)
}

export const validatePositiveNumber = (value) => {
  if (typeof value === "number" && value >= 0) return value
  if (typeof value === "string") {
    value = parseFloat(value)
  }
  if (isNaN(value) || value < 0) {
    throw new Error(`should be a positive number!`)
  }
  return value
}

export const validateBooleanOrPositiveNumber = (value) => {
  if (typeof value === "boolean") return value
  if (typeof value === "number") return value
  if (value === "true") return true
  else if (value === "false") return false
  else if (typeof value === "string") {
    value = parseFloat(value)
    if (!isNaN(value) && value >= 0) return value
  }

  throw new Error(`should be a boolean or a positive number!`)
}

export const validateStringOrJson = (value) => {
  if (typeof value === "object") return value
  if (typeof value === "string") {
    try {
      return JSON.parse(value)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // console.debug(error)
      return value
    }
  }

  throw new Error(`should be a string or JSON!`)
}
