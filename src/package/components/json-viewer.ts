import { DataParser } from "../utils/data-parser"
import styles from "../assets/styles.css?inline"
import { themeStyles, availableThemes } from "../assets/themes"
import { Toolbar } from "./toolbar"

const ICON_TYPES = ["arrow", "square", "circle"]
const MAX_EXPAND_LEVEL = 12
const MAX_INDENT_LEVEL = 10
export class JsonViewer extends HTMLElement {
  static get observedAttributes() {
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

  private dataParser: DataParser | null = null
  private stylesContainer: HTMLStyleElement | null = null
  private themeSyteles: HTMLStyleElement | null = null
  private dataContainer: HTMLDivElement | null = null
  private cachedThemeStyles: string | null = null
  private cachedData: string | null = null
  private toolbar: Toolbar | null = null
  private static readonly defaultTheme = "default-light"
  private static readonly defaultIconType = "arrow"

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  // Number attributes
  get indent(): number {
    if (!this.hasAttribute("indent") || this.getAttribute("indent") === "false") return 0
    if (this.getAttribute("indent") === "true") return MAX_INDENT_LEVEL

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

  // Boolean attributes
  get expanded(): number {
    if (!this.hasAttribute("expanded") || this.getAttribute("expanded") === "false") return 0
    if (this.getAttribute("expanded") === "true") return MAX_EXPAND_LEVEL
    let value = parseInt(this.getAttribute("expanded") || "0")
    value = isNaN(value) ? 0 : value
    if (value < 0) return 0
    if (value > MAX_EXPAND_LEVEL) return MAX_EXPAND_LEVEL
    return value
  }
  set expanded(value: number | boolean) {
    console.log("Setting expanded to:", value)
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
  set toolbarThemeSelect(value: boolean) {
    this.setAttribute("toolbar-show-theme-select", value.toString())
  }
  get toolbarShowThemeSelect(): boolean {
    return this.getAttribute("toolbar-show-theme-select") !== "false"
  }

  set toolbarShowInfos(value: boolean) {
    this.setAttribute("toolbar-show-infos", value.toString())
  }
  get toolbarShowInfos(): boolean {
    return this.getAttribute("toolbar-show-infos") !== "false"
  }

  // String attributes
  get theme(): string {
    return this.getAttribute("theme") ?? JsonViewer.defaultTheme
  }
  set theme(value: string) {
    this.setAttribute("theme", value)
  }

  get expandIconType(): string {
    return this.getAttribute("expand-icon-type") ?? JsonViewer.defaultIconType
  }
  set expandIconType(value: string) {
    if (!ICON_TYPES.includes(value)) {
      console.warn(`Invalid expand-icon-type: ${value}. Defaulting to "arrow".`)
      value = JsonViewer.defaultIconType
      this.removeAttribute("expand-icon-type") // Remove old attribute to avoid conflicts
      return
    }
    this.setAttribute("expand-icon-type", value)
  }
  get searchTerm(): string {
    return this.getAttribute("search-term") ?? ""
  }
  set searchTerm(value: string) {
    if (this.searchTerm === value) return // Avoid unnecessary updates
    this.setAttribute("search-term", value)
  }

  // Data attribute - with fallback to content
  get data(): string {
    // Priority: attribute > textContent > default
    const attrData = this.getAttribute("data")
    if (attrData) {
      return attrData
    }

    const contentData = this.getContentData()
    if (contentData) {
      this.clearContent() // Clear content after reading
      this.setAttribute("data", contentData) // Set as attribute for future use
    }
    return contentData || "{}"
  }

  set data(value: string | object) {
    if (this.data === value) return // Avoid unnecessary updates
    if (typeof value === "string") {
      this.setAttribute("data", value)
    } else {
      this.setAttribute("data", JSON.stringify(value))
    }
    // Clear content when setting via property/attribute
    this.textContent = ""
  }

  // Get JSON from element content
  private getContentData(): string {
    const content = this.textContent?.trim()
    return content || ""
  }

  // Clear content after reading
  private clearContent(): void {
    this.textContent = ""
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    console.log(`Attribute changed: ${_name}, oldValue: ${oldValue}, newValue: ${newValue}`)
    if (oldValue !== newValue) {
      this.render()
    }
  }

  connectedCallback() {
    this.render()

    // Watch for content changes
    this.observer = new MutationObserver(() => {
      // Only react to content changes if no data attribute is set
      if (!this.hasAttribute("data")) {
        this.render()
      }
    })

    this.observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
  private observer?: MutationObserver

  private renderToolbar() {
    if (!this.dataContainer) return

    if (!this.toolbar) {
      this.toolbar = new Toolbar({
        parent: this.dataContainer,
        onCopyAll: () => {
          const json = this.dataContainer?.querySelector(".json-data")?.textContent || ""
          navigator.clipboard.writeText(json).then(() => {
            console.log("Copied to clipboard:", json.length)
          })
        },
        onStateChange: (changes) => {
          console.log("Toolbar state changed:", changes)
          switch (Object.keys(changes)[0]) {
            case "searchTerm":
              this.searchTerm = changes.searchTerm!
              break
            case "expandLevel":
              this.expanded = changes.expandLevel || 0
              break
            case "indent":
              this.indent = changes.indent || 0
              break
            case "infosEnabled":
              this.showInfos = changes.infosEnabled || false
              break
            case "theme":
              this.theme = changes.theme || JsonViewer.defaultTheme
              break
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
          searchTerm: "",
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
      console.log("Updating toolbar state with current attributes", this.showInfos)
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

  private async render() {
    if (!this.shadowRoot) return

    if (!this.stylesContainer) {
      this.stylesContainer = document.createElement("style")
      this.shadowRoot.appendChild(this.stylesContainer)
      this.stylesContainer.textContent = styles
    }
    if (!this.themeSyteles) {
      this.themeSyteles = document.createElement("style")
      this.shadowRoot.appendChild(this.themeSyteles)
    }
    if (this.cachedThemeStyles !== this.theme) {
      this.cachedThemeStyles = this.theme
      this.themeSyteles.textContent = themeStyles(this.theme)
    }

    if (!this.dataContainer) {
      this.dataContainer = document.createElement("div")
      this.dataContainer.className = "container"

      this.shadowRoot.appendChild(this.dataContainer)
    }

    // Update data container styles based on attributes

    this.dataContainer.classList.toggle("show-data-types", this.showDataTypes)
    this.dataContainer.classList.toggle("show-size", this.showSize)
    this.dataContainer.classList.toggle("show-copy", this.showCopy)
    this.dataContainer.classList.toggle("show-loading-status", this.showLoadingStatus)
    this.dataContainer.classList.toggle("show-errors", this.showErrors)

    if (this.cachedData === this.data) {
      // If data hasn't changed, no need to re-render
      return
    }

    // Render toolbar if enabled
    if (this.showToolbar) this.renderToolbar()
    else this.toolbar?.remove()

    let jsonData = this.dataContainer.querySelector(".json-data")
    if (!jsonData) {
      jsonData = document.createElement("div")
      jsonData.className = "json-data"
      this.dataContainer.appendChild(jsonData)
    }

    // Create or update parser
    if (!this.dataParser) {
      this.dataParser = new DataParser(this.data)
    } else {
      this.dataParser.updateData(this.data)
    }

    if (this.dataParser.isUrlData && this.showLoadingStatus) {
      //Show spinner
      jsonData.innerHTML = `
        <div class="spinner>>
          <div class="spinner-dot1"></div>
          <div class="spinner-dot2"></div>
          <div class="spinner-dot3"></div>
        </div>
      `
    }
    const result = await this.dataParser.getParsedData()

    if (this.showErrors && (result.error || !result.data)) {
      jsonData.innerHTML = `
        <div class="error-container">
          Invalid JSON data
          <details>
            <summary>Raw data:</summary>
            <pre >${this.data}</pre>
            <p>Error: ${result.error || "Unknown error"}</p>
          </details>
        </div>
      `
      return
    }

    const parsedData = result.data

    jsonData.innerHTML = "" // Clear previous content
    jsonData.appendChild(this.renderJson(parsedData))
  }

  private renderJson(data: any): HTMLElement {
    const pre = document.createElement("pre")
    pre.className = "json-data"
    pre.innerHTML = JSON.stringify(data, null, this.indent)
    return pre
  }
}
