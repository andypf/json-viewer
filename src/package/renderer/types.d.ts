export interface RendererOptions {
  data?: any
  expanded?: number | boolean
  indent?: number
  expandIconType?: "arrow" | "square" | "circle"
  showDataTypes?: boolean
  showCopy?: boolean
  showSize?: boolean
  searchTerm?: string
  onExpandLevelChange?: (level: number) => void
}

export interface DataRowOptions {
  key: string | number
  value: any
  expanded: number | boolean
  indent: number
  onToggleExpand?: (level: number) => void
  level?: number
  parentRow?: HTMLElement | null
}

export interface UpdateOptions {
  expanded?: number | boolean
  indent?: number
  searchTerm?: string
}

export type DataType =
  | "string"
  | "integer"
  | "float"
  | "boolean"
  | "null"
  | "undefined"
  | "object"
  | "array"
  | "nan"
  | "date"
