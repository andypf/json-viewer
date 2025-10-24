import { DataParser } from "../utils/data-parser"
import styles from "../assets/styles.css?inline"
import { themeStyles, availableThemes } from "../assets/themes"
import { Toolbar } from "./toolbar"
import { Container } from "../renderer/container"

const ICON_TYPES = ["arrow", "square", "circle"] as const
const MAX_EXPAND_LEVEL = 12
const MAX_INDENT_LEVEL = 10

type IconType = (typeof ICON_TYPES)[number]

export class JsonViewer extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      "toolbar-show-copy",
      "toolbar-show-size",
      "toolbar-show-search",
      "toolbar-show-expand-controls",
      "toolbar-show-indent-controls",
      "toolbar-show-theme-select",
      "toolbar-show-infos",
      "show-toolbar",
      "show-data-types",
      "expand-icon-type",
      "show-copy",
      "show-size",
      "show-loading-status",
      "show-errors",
      "show-infos",
      "indent",
      "expanded",
      "theme",
      "search-term",
      "data",
    ]
  }

  // Private properties
  private dataParser: DataParser | null = null
  private stylesContainer: HTMLStyleElement | null = null
  private themeStyles: HTMLStyleElement | null = null
  private dataContainer: HTMLDivElement | null = null
  private toolbarContainer: HTMLDivElement | null = null
  private jsonDataContainer: HTMLDivElement | null = null
  private cachedThemeStyles: string | null = null
  private cachedData: string | null = null
  private toolbar: Toolbar | null = null
  private observer?: MutationObserver
  private isUpdatingFromToolbar = false
  private renderTimeout?: number
  private isInitialized = false

  private static readonly defaultTheme = "default-light"
  private static readonly defaultIconType: IconType = "arrow"

  private rendererContainer: Container | null = null

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  // All your getters and setters (keeping them as-is)
  get indent(): number {
    if (!this.hasAttribute("indent") || this.getAttribute("indent") === "false") return 0
    if (this.getAttribute("indent") === "true" || this.getAttribute("indent") === "") return MAX_INDENT_LEVEL
    let value = parseInt(this.getAttribute("indent") || "0")
    value = isNaN(value) ? 0 : value
    if (value < 0) return 0
    if (value > MAX_INDENT_LEVEL) return MAX_INDENT_LEVEL
    return value
  }

  set indent(value: number | boolean) {
    if (typeof value === "boolean") {
      this.setAttribute("indent", value ? MAX_INDENT_LEVEL.toString() : "0")
      return
    }
    if (typeof value === "number") {
      if (value < 0) value = 0
      if (value > MAX_INDENT_LEVEL) value = MAX_INDENT_LEVEL
      this.setAttribute("indent", value.toString())
      return
    }
    this.removeAttribute("indent")
  }

  get expanded(): number {
    if (!this.hasAttribute("expanded") || this.getAttribute("expanded") === "false") return 0
    if (this.getAttribute("expanded") === "true" || this.getAttribute("expanded") === "") return MAX_EXPAND_LEVEL
    let value = parseInt(this.getAttribute("expanded") || "0")
    value = isNaN(value) ? 0 : value
    if (value < 0) return 0
    if (value > MAX_EXPAND_LEVEL) return MAX_EXPAND_LEVEL
    return value
  }

  set expanded(value: number | boolean) {
    if (typeof value === "boolean") {
      this.setAttribute("expanded", value.toString())
      return
    }

    if (typeof value === "number") {
      if (value < 0) value = 0
      if (value > MAX_EXPAND_LEVEL) value = MAX_EXPAND_LEVEL
      this.setAttribute("expanded", value.toString())
      return
    }
    this.removeAttribute("expanded")
  }

  // ... (all your other getters/setters remain the same) ...
  get showDataTypes(): boolean {
    return this.hasAttribute("show-data-types") && this.getAttribute("show-data-types") !== "false"
  }
  set showDataTypes(value: boolean) {
    this.setAttribute("show-data-types", value.toString())
  }
  get showLoadingStatus(): boolean {
    return this.hasAttribute("show-loading-status") && this.getAttribute("show-loading-status") !== "false"
  }
  set showLoadingStatus(value: boolean) {
    this.setAttribute("show-loading-status", value.toString())
  }
  get showErrors(): boolean {
    return this.hasAttribute("show-errors") && this.getAttribute("show-errors") !== "false"
  }
  set showErrors(value: boolean) {
    this.setAttribute("show-errors", value.toString())
  }
  get showInfos(): boolean {
    return this.hasAttribute("show-infos") && this.getAttribute("show-infos") !== "false"
  }
  set showInfos(value: boolean) {
    this.setAttribute("show-infos", value.toString())
  }
  get showToolbar(): boolean {
    return this.hasAttribute("show-toolbar") && this.getAttribute("show-toolbar") !== "false"
  }
  set showToolbar(value: boolean) {
    this.setAttribute("show-toolbar", value.toString())
  }
  get showCopy(): boolean {
    return this.hasAttribute("show-copy") && this.getAttribute("show-copy") !== "false"
  }
  set showCopy(value: boolean) {
    this.setAttribute("show-copy", value.toString())
  }
  get showSize(): boolean {
    return this.hasAttribute("show-size") && this.getAttribute("show-size") !== "false"
  }
  set showSize(value: boolean) {
    this.setAttribute("show-size", value.toString())
  }
  // Toolbar attributes
  get toolbarShowCopy(): boolean {
    return this.getAttribute("toolbar-show-copy") !== "false"
  }
  set toolbarShowCopy(value: boolean) {
    this.setAttribute("toolbar-show-copy", value.toString())
  }
  get toolbarShowSize(): boolean {
    return this.getAttribute("toolbar-show-size") !== "false"
  }
  set toolbarShowSize(value: boolean) {
    this.setAttribute("toolbar-show-size", value.toString())
  }
  get toolbarShowSearch(): boolean {
    return this.getAttribute("toolbar-show-search") !== "false"
  }
  set toolbarShowSearch(value: boolean) {
    this.setAttribute("toolbar-show-search", value.toString())
  }
  get toolbarShowExpandControls(): boolean {
    return this.getAttribute("toolbar-show-expand-controls") !== "false"
  }
  set toolbarShowExpandControls(value: boolean) {
    this.setAttribute("toolbar-show-expand-controls", value.toString())
  }
  get toolbarShowIndentControls(): boolean {
    return this.getAttribute("toolbar-show-indent-controls") !== "false"
  }
  set toolbarShowIndentControls(value: boolean) {
    this.setAttribute("toolbar-show-indent-controls", value.toString())
  }
  get toolbarShowThemeSelect(): boolean {
    return this.getAttribute("toolbar-show-theme-select") !== "false"
  }
  set toolbarShowThemeSelect(value: boolean) {
    this.setAttribute("toolbar-show-theme-select", value.toString())
  }
  get toolbarShowInfos(): boolean {
    return this.getAttribute("toolbar-show-infos") !== "false"
  }
  set toolbarShowInfos(value: boolean) {
    this.setAttribute("toolbar-show-infos", value.toString())
  }
  // String attributes
  get theme(): string {
    return this.getAttribute("theme") ?? JsonViewer.defaultTheme
  }
  set theme(value: string) {
    this.setAttribute("theme", value)
  }
  get expandIconType(): IconType {
    const value = this.getAttribute("expand-icon-type")
    return (ICON_TYPES.includes(value as IconType) ? value : JsonViewer.defaultIconType) as IconType
  }
  set expandIconType(value: IconType) {
    if (!ICON_TYPES.includes(value)) {
      console.warn(`Invalid expand-icon-type: ${value}. Defaulting to "arrow".`)
      value = JsonViewer.defaultIconType
      this.removeAttribute("expand-icon-type")
      return
    }
    this.setAttribute("expand-icon-type", value)
  }
  get searchTerm(): string {
    return this.getAttribute("search-term") ?? ""
  }
  set searchTerm(value: string) {
    if (this.searchTerm === value) return
    this.setAttribute("search-term", value)
  }
  // Data attribute
  get data(): string {
    const attrData = this.getAttribute("data")
    if (attrData) {
      return attrData
    }

    // Get content data and validate it
    const contentData = this.getContentData()
    if (contentData) {
      try {
        // Test if it's valid JSON
        JSON.parse(contentData)
        // If valid, clear content and set as attribute
        this.clearContent()
        this.setAttribute("data", contentData)
        return contentData
      } catch (error) {
        console.warn("Invalid JSON in element content:", error)
        // Return the content anyway, let the parser handle the error
        return contentData
      }
    }

    return "{}"
  }
  set data(value: string | object) {
    if (this.data === value) return
    if (typeof value === "string") {
      this.setAttribute("data", value)
    } else {
      this.setAttribute("data", JSON.stringify(value))
    }
    this.textContent = ""
  }

  // Private methods
  private getContentData(): string {
    // Get all text content, including from child text nodes
    const content = this.textContent?.trim() || ""

    // Remove any extra whitespace and normalize
    if (content) {
      try {
        // Try to parse and re-stringify to normalize the JSON
        const parsed = JSON.parse(content)
        return JSON.stringify(parsed)
      } catch {
        // If parsing fails, return the raw content
        return content
      }
    }

    return ""
  }

  private clearContent(): void {
    this.textContent = ""
  }

  // Lifecycle methods
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this.isInitialized) return

    if (this.isUpdatingFromToolbar) {
      // Even when updating from toolbar, we need to re-render for some changes
      if (["indent", "expanded", "theme", "search-term"].includes(name)) {
        // Force re-render for these critical attributes
        this.isUpdatingFromToolbar = false
        this.debouncedRender()
        return
      }
      return
    }

    if (oldValue !== newValue) {
      this.debouncedRender()
    }
  }

  private debouncedRender(): void {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout)
    }
    this.renderTimeout = window.setTimeout(() => {
      this.render()
    }, 10)
  }

  connectedCallback(): void {
    this.render().then(() => {
      this.isInitialized = true
    })

    this.observer = new MutationObserver(() => {
      if (!this.hasAttribute("data") && this.isInitialized) {
        this.debouncedRender()
      }
    })

    this.observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

  disconnectedCallback(): void {
    this.isInitialized = false

    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout)
      this.renderTimeout = undefined
    }

    if (this.observer) {
      this.observer.disconnect()
    }

    if (this.toolbar) {
      this.toolbar.remove()
      this.toolbar = null
    }
  }

  private renderToolbar(): void {
    if (!this.toolbarContainer) return

    if (!this.toolbar) {
      this.toolbar = new Toolbar({
        parent: this.toolbarContainer,
        onCopyAll: () => {
          try {
            // Get the original data and stringify it cleanly
            const dataParser = this.dataParser
            if (dataParser) {
              dataParser.getParsedData().then((result) => {
                if (result.data) {
                  const cleanJson = JSON.stringify(result.data, null, this.indent || 2)
                  navigator.clipboard
                    .writeText(cleanJson)
                    .then(() => {
                      console.log("Copied clean JSON to clipboard:", cleanJson.length)
                    })
                    .catch((err) => {
                      console.error("Failed to copy to clipboard:", err)
                    })
                }
              })
            } else {
              // Fallback: try to parse the original data attribute
              const rawData = this.data
              const parsedData = JSON.parse(rawData)
              const cleanJson = JSON.stringify(parsedData, null, this.indent || 2)
              navigator.clipboard.writeText(cleanJson)
            }
          } catch (error) {
            console.error("Failed to copy JSON:", error)
            // Ultimate fallback
            navigator.clipboard.writeText(this.data)
          }
        },
        onStateChange: (changes) => {
          console.log("Toolbar state changed:", changes)

          this.isUpdatingFromToolbar = true

          try {
            Object.entries(changes).forEach(([key, value]) => {
              switch (key) {
                case "searchTerm":
                  if (this.searchTerm !== value) {
                    this.setAttribute("search-term", value as string)
                  }
                  break
                case "expandLevel":
                  if (this.expanded !== value) {
                    this.setAttribute("expanded", (value || 0).toString())
                  }
                  break
                case "indent":
                  if (this.indent !== value) {
                    this.setAttribute("indent", (value || 0).toString())
                  }
                  break
                case "infosEnabled":
                  if (this.showInfos !== value) {
                    this.setAttribute("show-infos", (value || false).toString())
                    // Also update the individual show flags
                    this.setAttribute("show-data-types", (value || false).toString())
                    this.setAttribute("show-copy", (value || false).toString())
                    this.setAttribute("show-size", (value || false).toString())
                  }
                  break
                case "theme":
                  if (this.theme !== value) {
                    this.setAttribute("theme", (value as string) || JsonViewer.defaultTheme)
                  }
                  break
              }
            })
          } finally {
            // Clear the flag and force a render for toolbar changes
            setTimeout(() => {
              this.isUpdatingFromToolbar = false

              // Force immediate update for info changes
              if (changes.infosEnabled !== undefined) {
                console.log("Info state changed, updating renderer")
                if (this.rendererContainer) {
                  this.rendererContainer.update({
                    expanded: this.expanded,
                    indent: this.indent,
                    showDataTypes: this.showInfos, // Use showInfos for all info displays
                    showCopy: this.showInfos,
                    showSize: this.showInfos,
                    expandIconType: this.expandIconType,
                    searchTerm: this.searchTerm,
                  })
                }
                // Also update container classes immediately
                if (this.dataContainer) {
                  this.dataContainer.classList.toggle("show-data-types", this.showInfos)
                  this.dataContainer.classList.toggle("show-copy", this.showInfos)
                  this.dataContainer.classList.toggle("show-size", this.showInfos)
                }
              }

              // Force render for other changes
              this.forceRender()
            }, 0)
          }
        },
        config: {
          showCopy: this.toolbarShowCopy,
          showSize: this.toolbarShowSize,
          showSearch: this.toolbarShowSearch,
          showExpandControls: this.toolbarShowExpandControls,
          showIndentControls: this.toolbarShowIndentControls,
          showThemeSelect: this.toolbarShowThemeSelect,
          showInfos: this.toolbarShowInfos,
          maxExpandLevel: MAX_EXPAND_LEVEL,
          maxIndentLevel: MAX_INDENT_LEVEL,
          availableThemes: availableThemes,
        },
        initialState: {
          expandLevel: this.expanded,
          indent: this.indent,
          theme: this.theme,
          searchTerm: this.searchTerm,
          dataSize: new TextEncoder().encode(this.data).length,
          infosEnabled: this.showInfos,
        },
      })
    } else {
      this.toolbar.updateConfig({
        showCopy: this.toolbarShowCopy,
        showSize: this.toolbarShowSize,
        showSearch: this.toolbarShowSearch,
        showExpandControls: this.toolbarShowExpandControls,
        showIndentControls: this.toolbarShowIndentControls,
        showThemeSelect: this.toolbarShowThemeSelect,
        showInfos: this.toolbarShowInfos,
      })

      this.toolbar.updateState({
        searchTerm: this.searchTerm,
        expandLevel: this.expanded,
        indent: this.indent,
        theme: this.theme,
        infosEnabled: this.showInfos,
        dataSize: new TextEncoder().encode(this.data).length,
      })
    }
  }

  // Add method to force re-render (bypasses cache)
  private forceRender(): void {
    this.cachedData = null
    this.rendererContainer = null // Clear renderer cache
    this.render()
  }

  private async render(): Promise<void> {
    if (!this.shadowRoot) return

    // Initialize styles
    if (!this.stylesContainer) {
      this.stylesContainer = document.createElement("style")
      this.shadowRoot.appendChild(this.stylesContainer)
      this.stylesContainer.textContent = styles
    }

    if (!this.themeStyles) {
      this.themeStyles = document.createElement("style")
      this.shadowRoot.appendChild(this.themeStyles)
    }

    // Update theme styles
    if (this.cachedThemeStyles !== this.theme) {
      this.cachedThemeStyles = this.theme
      this.themeStyles.textContent = themeStyles(this.theme)
    }

    // Initialize main container
    if (!this.dataContainer) {
      this.dataContainer = document.createElement("div")
      this.dataContainer.className = "container"
      this.shadowRoot.appendChild(this.dataContainer)
    }

    // Initialize toolbar container
    if (!this.toolbarContainer) {
      this.toolbarContainer = document.createElement("div")
      this.toolbarContainer.className = "toolbar-container"
      this.dataContainer.appendChild(this.toolbarContainer)
    }

    // Initialize JSON data container
    if (!this.jsonDataContainer) {
      this.jsonDataContainer = document.createElement("div")
      this.jsonDataContainer.className = "json-container"
      this.dataContainer.appendChild(this.jsonDataContainer)
    }

    // Update container classes
    this.dataContainer.classList.toggle("show-data-types", this.showDataTypes)
    this.dataContainer.classList.toggle("show-size", this.showSize)
    this.dataContainer.classList.toggle("show-copy", this.showCopy)
    this.dataContainer.classList.toggle("show-loading-status", this.showLoadingStatus)
    this.dataContainer.classList.toggle("show-errors", this.showErrors)

    // Handle toolbar visibility
    if (this.showToolbar) {
      this.toolbarContainer.style.display = "block"
      this.renderToolbar()
    } else {
      this.toolbarContainer.style.display = "none"
      if (this.toolbar) {
        this.toolbar.remove()
        this.toolbar = null
      }
    }

    // Always update toolbar state if it exists
    if (this.showToolbar && this.toolbar) {
      this.toolbar.updateState({
        searchTerm: this.searchTerm,
        expandLevel: this.expanded,
        indent: this.indent,
        theme: this.theme,
        infosEnabled: this.showInfos,
        dataSize: new TextEncoder().encode(this.data).length,
      })
    }

    // Check if we need to re-render JSON (either data changed OR toolbar actions)
    const needsJsonRerender = this.cachedData !== this.data || this.isUpdatingFromToolbar

    if (!needsJsonRerender) {
      // Even if we don't re-render, update the existing renderer with new settings
      if (this.rendererContainer) {
        this.rendererContainer.update({
          expanded: this.expanded,
          indent: this.indent,
          showDataTypes: this.showDataTypes,
          showCopy: this.showCopy,
          showSize: this.showSize,
          expandIconType: this.expandIconType,
          searchTerm: this.searchTerm,
        })
      }
      return
    }

    // Render JSON data
    let jsonData = this.jsonDataContainer.querySelector(".json-data")
    if (!jsonData) {
      jsonData = document.createElement("div")
      jsonData.className = "json-data"
      this.jsonDataContainer.appendChild(jsonData)
    }

    // Create or update parser
    if (!this.dataParser) {
      this.dataParser = new DataParser(this.data)
    } else {
      this.dataParser.updateData(this.data)
    }

    if (this.dataParser.isUrlData && this.showLoadingStatus) {
      jsonData.innerHTML = `
      <div class="spinner">
        <div class="spinner-dot1"></div>
        <div class="spinner-dot2"></div>
        <div class="spinner-dot3"></div>
      </div>
    `
    }

    try {
      const result = await this.dataParser.getParsedData()

      if (this.showErrors && (result.error || !result.data)) {
        jsonData.innerHTML = `
        <div class="error-container">
          Invalid JSON data
          <details>
            <summary>Raw data:</summary>
            <pre>${this.escapeHtml(this.data)}</pre>
            <p>Error: ${result.error || "Unknown error"}</p>
          </details>
        </div>
      `
        this.cachedData = this.data
        this.rendererContainer = null // Clear renderer on error
        return
      }

      const parsedData = result.data
      jsonData.innerHTML = ""

      // Use the new renderer
      const renderedElement = this.renderJson(parsedData)
      jsonData.appendChild(renderedElement)

      this.cachedData = this.data
    } catch (error) {
      console.error("Error rendering JSON:", error)
      this.rendererContainer = null // Clear renderer on error

      if (this.showErrors) {
        jsonData.innerHTML = `
        <div class="error-container">
          Error rendering JSON data
          <p>Error: ${error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      `
      }
      this.cachedData = this.data
    }
  }

  private renderJson(data: any): HTMLElement {
    const container = document.createElement("div")
    container.className = "json-data"
    try {
      this.rendererContainer = new Container(container, {
        data: data,
        expanded: this.expanded,
        indent: this.indent,
        showDataTypes: this.showDataTypes,
        showCopy: this.showCopy,
        showSize: this.showSize,
        expandIconType: this.expandIconType,
        searchTerm: this.searchTerm,
      })
      return container
    } catch (error) {
      console.error("Error creating renderer:", error)
      this.rendererContainer = null
      // Fallback to simple pre element
      const pre = document.createElement("pre")
      pre.className = "json-data"
      pre.textContent = "Error: Unable to render JSON data"
      return pre
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

export default JsonViewer
