import { DataRowOptions, UpdateOptions, DataType } from "./types"
import { dataType, formatValue, getItemCount, getItems } from "./data-helpers"

export class DataRow {
  public element: HTMLElement
  public maxLevel: number
  private row: HTMLDivElement
  private isExpanded: boolean
  private hasChildren: boolean
  private thisDataType: DataType
  private childrenRows: DataRow[] = []
  private expandIcon?: HTMLElement
  private keyEl?: HTMLElement
  private valueEl?: HTMLElement
  private level: number
  private onToggleExpand?: (level: number) => void
  private parentRow?: HTMLElement | null

  constructor(options: DataRowOptions) {
    const { key, value, expanded, indent, onToggleExpand, level = 0, parentRow = null } = options

    this.level = level
    this.maxLevel = level
    this.onToggleExpand = onToggleExpand
    this.parentRow = parentRow
    this.thisDataType = dataType(value)
    this.hasChildren = this.thisDataType === "array" || this.thisDataType === "object"
    this.isExpanded = expanded === true || (typeof expanded === "number" && expanded > level)

    // Create main row element
    this.row = document.createElement("div")
    this.row.className = `data-row ${this.isExpanded ? "expanded" : ""}`
    this.row.dataset.key = String(key)
    this.row.dataset.level = String(level)

    if (level > 0) {
      this.row.style.paddingLeft = `${indent * 5}px`
    }

    // Create key-value wrapper
    const keyValueWrapper = document.createElement("span")
    keyValueWrapper.className = "key-value-wrapper"
    this.row.appendChild(keyValueWrapper)

    this.createExpandIcon(keyValueWrapper)
    this.createKey(keyValueWrapper, key)
    this.createValue(keyValueWrapper, value, expanded, indent)
    this.createCopyIcon(keyValueWrapper, value, indent)

    this.element = this.row
  }

  private toggleExpand = (): void => {
    this.row.classList.toggle("expanded")
    if (this.onToggleExpand) {
      if (this.row.classList.contains("expanded")) {
        this.onToggleExpand(this.level + 1)
      } else {
        this.onToggleExpand(this.level)
      }
    }
  }

  private createExpandIcon(parent: HTMLElement): void {
    if (!this.hasChildren) return

    const expandIconWrapper = document.createElement("span")
    expandIconWrapper.className = "icon-wrapper"
    parent.appendChild(expandIconWrapper)

    this.expandIcon = document.createElement("span")
    this.expandIcon.className = "expand icon clickable"
    this.expandIcon.setAttribute("title", this.isExpanded ? "Collapse" : "Expand")
    expandIconWrapper.appendChild(this.expandIcon)
    expandIconWrapper.addEventListener("click", this.toggleExpand)
  }
  private createKey(parent: HTMLElement, key: string | number): void {
    // Explizite Prüfung für Fälle, wo kein Key angezeigt werden soll
    // Für Root-Elemente (key === '') oder null/undefined
    if (key === null || key === undefined || (typeof key === "string" && key === "")) {
      return
    }

    const keyDataType = typeof key
    this.keyEl = document.createElement("span")
    this.keyEl.className = `key clickable ${keyDataType === "number" ? "number" : ""}`

    // Array-Indizes und Objekt-Keys richtig anzeigen
    this.keyEl.textContent = String(key)

    this.keyEl.addEventListener("click", this.toggleExpand)
    parent.appendChild(this.keyEl)

    // Add colon
    const colonEl = document.createElement("span")
    colonEl.classList.add("colon")
    colonEl.textContent = ":"
    parent.appendChild(colonEl)
  }

  private createValue(parent: HTMLElement, value: any, expanded: number | boolean, indent: number): void {
    if (this.hasChildren) {
      this.createComplexValue(parent, value, expanded, indent)
    } else {
      this.createSimpleValue(parent, value)
    }
  }

  private createComplexValue(parent: HTMLElement, value: any, expanded: number | boolean, indent: number): void {
    // Opening parenthesis
    const openingParenthesis = document.createElement("span")
    openingParenthesis.className = "opening-parenthesis"
    openingParenthesis.textContent = this.thisDataType === "array" ? "[" : "{"
    parent.appendChild(openingParenthesis)

    // Ellipsis
    const ellipsis = document.createElement("span")
    ellipsis.className = "ellipsis clickable"
    ellipsis.textContent = "..."
    ellipsis.addEventListener("click", this.toggleExpand)
    parent.appendChild(ellipsis)

    // Closing parenthesis
    const closingParenthesis = document.createElement("span")
    closingParenthesis.className = "closing-parenthesis"
    closingParenthesis.textContent = this.thisDataType === "array" ? "]" : "}"
    parent.appendChild(closingParenthesis)

    // Items size
    const itemsSize = document.createElement("span")
    const length = getItemCount(value, this.thisDataType)
    itemsSize.className = "items-size"
    itemsSize.textContent = `${length} item${length === 1 ? "" : "s"}`
    parent.appendChild(itemsSize)

    // Create children rows
    this.createChildrenRows(value, expanded, indent)

    // Expanded closing parenthesis
    const expandedClosingParenthesis = document.createElement("span")
    expandedClosingParenthesis.className = "closing-parenthesis"
    expandedClosingParenthesis.textContent = this.thisDataType === "array" ? "]" : "}"
    this.row.appendChild(expandedClosingParenthesis)
  }

  private createSimpleValue(parent: HTMLElement, value: any): void {
    let valueType: HTMLElement | null = null

    if (!["nan", "undefined", "null"].includes(this.thisDataType)) {
      valueType = document.createElement("span")
      valueType.className = "type"
      valueType.textContent = this.thisDataType.toLowerCase()
    }

    const valueWrapper = document.createElement("span")
    valueWrapper.className = `value ${this.thisDataType.toLowerCase()}`

    this.valueEl = document.createElement("span")
    this.valueEl.className = "value-data"
    this.valueEl.textContent = formatValue(value, this.thisDataType)

    if (valueType) valueWrapper.appendChild(valueType)
    valueWrapper.appendChild(this.valueEl)
    parent.appendChild(valueWrapper)
  }

  private createChildrenRows(value: any, expanded: number | boolean, indent: number): void {
    const items = getItems(value, this.thisDataType)

    items.forEach((key) => {
      const subRow = new DataRow({
        key,
        value: value[key],
        expanded,
        indent,
        onToggleExpand: this.onToggleExpand,
        level: this.level + 1,
        parentRow: this.row,
      })

      this.childrenRows.push(subRow)
      this.row.appendChild(subRow.element)
      this.maxLevel = Math.max(this.maxLevel, subRow.maxLevel)
    })
  }

  private createCopyIcon(parent: HTMLElement, value: any, indent: number): void {
    const copyIcon = document.createElement("span")
    copyIcon.className = "copy icon"
    copyIcon.setAttribute("title", "Copy to clipboard")

    const copyIconWrapper = document.createElement("span")
    copyIconWrapper.className = "icon-wrapper"
    copyIconWrapper.addEventListener("click", () => {
      navigator.clipboard
        .writeText(JSON.stringify(value, null, indent))
        .then(() => console.log("Copied to clipboard"))
        .catch((err) => console.error("Failed to copy:", err))
    })

    copyIconWrapper.appendChild(copyIcon)
    parent.appendChild(copyIconWrapper)
  }

  private search(searchTerm: string): void {
    const searchElements = [this.keyEl, this.valueEl].filter(Boolean) as HTMLElement[]
    let found = false

    searchElements.forEach((el) => {
      const originalText = el.dataset.originalText || el.textContent || ""

      // Store original text if not already stored
      if (!el.dataset.originalText) {
        el.dataset.originalText = originalText
      }

      // Always reset to original text first
      el.innerHTML = this.escapeHtml(originalText)

      // If no search term, just return after clearing
      if (!searchTerm || searchTerm.trim() === "") {
        return
      }

      // Perform search
      const regex = new RegExp(this.escapeRegExp(searchTerm), "gi")
      const matches = [...originalText.matchAll(regex)]

      if (matches.length > 0) {
        found = true
        let highlightedText = originalText

        // Replace matches with highlighted version (reverse order to maintain indices)
        matches.reverse().forEach((match) => {
          const start = match.index!
          const end = start + match[0].length
          highlightedText =
            highlightedText.substring(0, start) +
            `<span class="match">${this.escapeHtml(match[0])}</span>` +
            highlightedText.substring(end)
        })

        el.innerHTML = highlightedText
      }
    })

    // If found, expand this row and parent
    if (found && !this.row.classList.contains("expanded")) {
      this.toggleExpand()
      if (this.parentRow) {
        this.parentRow.classList.add("expanded")
      }
    }

    // Always update children with search term
    this.childrenRows.forEach((row) => row.update({ searchTerm }))
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  public update(options: UpdateOptions): void {
    const { expanded, indent, searchTerm } = options

    if (indent !== undefined && this.level > 0) {
      this.row.style.paddingLeft = `${indent * 5}px`
    }

    if (expanded !== undefined) {
      this.isExpanded = expanded === true || (typeof expanded === "number" && expanded > this.level)
      this.row.classList.toggle("expanded", this.isExpanded)
      if (this.expandIcon) {
        this.expandIcon.title = this.isExpanded ? "Collapse" : "Expand"
      }
    }

    if (searchTerm !== undefined) {
      this.search(searchTerm)
    }

    // Update children
    this.childrenRows.forEach((row) => row.update(options))
  }
}

export default DataRow
