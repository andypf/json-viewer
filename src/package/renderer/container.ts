import { RendererOptions } from "./types"
import { DataRow } from "./data-row"

interface ContainerCache {
  dataCompareString?: string
  expanded?: number | boolean
  indent?: number
  showCopy?: boolean
  showSize?: boolean
  showDataTypes?: boolean
  expandIconType?: string
  searchTerm?: string
}

export class Container {
  private containerElem: HTMLDivElement
  private dataRow: DataRow | null = null
  private cache: ContainerCache = {}
  private onExpandLevelChange?: (level: number) => void

  constructor(root: HTMLElement, options: RendererOptions = {}) {
    this.containerElem = document.createElement("div")
    this.containerElem.className = "json-renderer"
    root.appendChild(this.containerElem)

    this.onExpandLevelChange = options.onExpandLevelChange

    this.update(options)
  }

  public update(options: RendererOptions): void {
    const {
      data,
      expanded,
      indent,
      expandIconType,
      showDataTypes,
      showSize,
      showCopy,
      searchTerm,
      onExpandLevelChange,
    } = options

    // Update callback if provided
    if (onExpandLevelChange) {
      this.onExpandLevelChange = onExpandLevelChange
    }

    // Handle data updates
    if (data !== undefined) {
      const newDataCompareString = JSON.stringify(data)

      if (this.cache.dataCompareString !== newDataCompareString) {
        this.cache.dataCompareString = newDataCompareString

        this.dataRow = new DataRow({
          key: "",
          value: data,
          expanded: expanded ?? 0,
          indent: indent ?? 2,
          onToggleExpand: (level) => {
            this.cache.expanded = level
            // You might want to trigger an event here to update the toolbar
          },
        })

        this.containerElem.replaceChildren(this.dataRow.element)
      }
    }

    // Collect props that need to be updated on dataRow
    const propsToUpdate: any = {}

    // Handle expanded updates
    if (expanded !== undefined && this.cache.expanded !== expanded) {
      this.cache.expanded = expanded
      propsToUpdate.expanded = expanded
    }

    // Handle indent updates
    if (indent !== undefined && this.cache.indent !== indent) {
      this.cache.indent = indent
      propsToUpdate.indent = indent
    }

    // Handle search term updates
    if (searchTerm !== undefined && this.cache.searchTerm !== searchTerm) {
      this.cache.searchTerm = searchTerm
      propsToUpdate.searchTerm = searchTerm
    }

    // Update dataRow if there are changes
    if (Object.keys(propsToUpdate).length > 0 && this.dataRow) {
      this.dataRow.update(propsToUpdate)
    }

    // Handle CSS class updates
    if (showCopy !== undefined && this.cache.showCopy !== showCopy) {
      this.cache.showCopy = showCopy
      this.containerElem.classList.toggle("show-copy", showCopy)
    }

    if (showSize !== undefined && this.cache.showSize !== showSize) {
      this.cache.showSize = showSize
      this.containerElem.classList.toggle("show-size", showSize)
    }

    if (showDataTypes !== undefined && this.cache.showDataTypes !== showDataTypes) {
      this.cache.showDataTypes = showDataTypes
      this.containerElem.classList.toggle("show-data-types", showDataTypes)
    }

    if (expandIconType !== undefined && this.cache.expandIconType !== expandIconType) {
      if (this.cache.expandIconType) {
        this.containerElem.classList.remove(`expand-icon-${this.cache.expandIconType}`)
      }
      this.containerElem.classList.add(`expand-icon-${expandIconType}`)
      this.cache.expandIconType = expandIconType
    }
  }

  public getElement(): HTMLElement {
    return this.containerElem
  }

  public getMaxLevel(): number {
    return this.dataRow?.maxLevel ?? 0
  }
}

export default Container
