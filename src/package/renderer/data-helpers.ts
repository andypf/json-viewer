import { DataType } from "./types"

export function dataType(value: any): DataType {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (Array.isArray(value)) return "array"

  if (typeof value === "number") {
    if (isNaN(value)) return "nan"
    // int vs. float
    if (Number.isInteger(value)) return "integer"
    return "float"
  }

  if (typeof value === "string") {
    // Check if string looks like a date
    if (isDateString(value)) return "date"
    return "string"
  }

  if (typeof value === "object") return "object"
  return typeof value as DataType
}

export function formatValue(value: any, type: DataType): string {
  switch (type) {
    case "string":
      return `"${value}"`
    case "date":
      return `"${value}"` // Keep original string format but will show as date type
    case "integer":
      return String(value)
    case "float":
      return String(value)
    case "null":
      return "null"
    case "undefined":
      return "undefined"
    case "nan":
      return "NaN"
    case "boolean":
      return String(value)
    default:
      return String(value)
  }
}

export function getItemCount(value: any, type: DataType): number {
  if (type === "array") return value.length
  if (type === "object") return Object.keys(value).length
  return 0
}

export function getItems(value: any, type: DataType): Array<string | number> {
  if (type === "array") return value.map((_: any, i: number) => i)
  if (type === "object") return Object.keys(value)
  return []
}

// Helper function to detect date strings
function isDateString(value: string): boolean {
  // ISO 8601 date format (most common)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/

  // Additional date patterns you might want to detect
  const datePatterns = [
    iso8601Regex,
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
  ]

  // Check if it matches any date pattern
  if (datePatterns.some((pattern) => pattern.test(value))) {
    // Additional validation: try to parse as date
    const date = new Date(value)
    return !isNaN(date.getTime())
  }

  return false
}

// Optional: Helper function to get formatted date for display
export function getFormattedDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    // You can customize the format here
    return date.toLocaleString() // or date.toISOString(), etc.
  } catch {
    return dateString
  }
}
