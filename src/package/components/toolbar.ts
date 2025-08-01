export interface ToolbarConfig {
  showCopy: boolean
  showSize: boolean
  showSearch: boolean
  showExpandControls: boolean
  showIndentControls: boolean
  showThemeSelect: boolean
  showInfos?: boolean // Optional, for backward compatibility
  maxExpandLevel?: number
  maxIndentLevel?: number
  availableThemes?: string[]
}

export interface ToolbarState {
  searchTerm: string
  expandLevel: number
  indent: number
  dataSize: number
  infosEnabled: boolean
  theme: string
}

// eslint-disable-next-line no-unused-vars
export type OnStateChangeCallback = (changes: Partial<ToolbarState>) => void
export type OnCopyAllCallback = () => void

export class Toolbar {
  private config: ToolbarConfig = {
    showCopy: true,
    showSize: true,
    showSearch: true,
    showExpandControls: true,
    showIndentControls: true,
    showThemeSelect: true,
    maxExpandLevel: 12, // Default max expand level
    maxIndentLevel: 12, // Default max indent level
  }
  private state: ToolbarState = {
    searchTerm: "",
    expandLevel: 0,
    indent: 2,
    infosEnabled: true,
    dataSize: 0,
    theme: "default-ligth",
  }

  private onStateChange: OnStateChangeCallback
  private onCopyAll?: OnCopyAllCallback
  private container: HTMLDivElement
  private leftGroup: HTMLDivElement
  private rightGroup: HTMLDivElement
  private actions: Map<string, HTMLElement> = new Map()
  private searchTimeout?: number

  constructor({
    parent,
    config,
    initialState,
    onStateChange,
    onCopyAll,
  }: {
    parent: HTMLElement
    config: Partial<ToolbarConfig>
    initialState: Partial<ToolbarState>
    onStateChange: OnStateChangeCallback
    onCopyAll?: OnCopyAllCallback
  }) {
    this.onStateChange = onStateChange
    this.onCopyAll = onCopyAll
    this.state = {
      ...this.state,
      ...initialState,
    }
    this.config = {
      ...this.config,
      ...config,
    }
    this.container = document.createElement("div")
    this.container.className = "toolbar"
    parent.appendChild(this.container)

    this.leftGroup = document.createElement("div")
    this.leftGroup.className = "options"
    this.container.appendChild(this.leftGroup)

    this.rightGroup = document.createElement("div")
    this.rightGroup.className = "search-wrapper"
    this.container.appendChild(this.rightGroup)

    this.createActions()
  }

  private createActions(): void {
    // Create all groups
    this.createExpandElements()
    this.createIndentElements()
    this.createThemeElements()
    this.createInfosElements()
    this.createCopyElement()
    this.createSearchElement()
    this.createSizeElement()
  }

  // Create individual action elements
  // Highly efficient element creation - only create if not already present

  // Create expand and collapse buttons
  private createExpandElements(): void {
    const isVisibleCss = this.config.showExpandControls ? "" : "hidden"
    const expandButton = this.createElement("div", `icon-wrapper clickable ${isVisibleCss}`)
    const currentValue = this.createElement("span", `display-value ${isVisibleCss}`)
    const collapseButton = this.createElement("div", `icon-wrapper clickable ${isVisibleCss}`)

    const expandIcon = this.createElement("span", "icon plus")
    expandButton.addEventListener("click", () => {
      const newExpandLevel = Math.min(this.config.maxExpandLevel!, this.state.expandLevel + 1)
      this.onStateChange({ expandLevel: newExpandLevel })
    })
    expandButton.appendChild(expandIcon)

    currentValue.innerText = this.state.expandLevel.toString()

    const collapseIcon = this.createElement("span", "icon minus")
    collapseButton.addEventListener("click", () => {
      const newExpandLevel = Math.max(0, this.state.expandLevel - 1)
      this.onStateChange({ expandLevel: newExpandLevel })
    })
    collapseButton.appendChild(collapseIcon)

    this.actions.set("collapseButton", collapseButton)
    this.actions.set("expandButton", expandButton)
    this.actions.set("expandLevelDisplay", currentValue)
    this.leftGroup.appendChild(expandButton)
    this.leftGroup.appendChild(currentValue)
    this.leftGroup.appendChild(collapseButton)
  }

  // Create indent and outdent buttons
  private createIndentElements(): void {
    const isVisibleCss = this.config.showIndentControls ? "" : "hidden"

    const indentButton = this.createElement("div", `icon-wrapper clickable ${isVisibleCss}`)
    const indentIcon = this.createElement("span", "icon indent")

    indentButton.addEventListener("click", () => {
      const newIndent = Math.min(this.config.maxIndentLevel || 12, this.state.indent + 1)
      this.onStateChange({ indent: newIndent })
    })

    const currentValue = this.createElement("span", `display-value ${isVisibleCss}`)
    currentValue.textContent = this.state.indent.toString()

    const outdentButton = this.createElement("div", `icon-wrapper clickable ${isVisibleCss}`)
    const outdentIcon = this.createElement("span", "icon outdent")
    outdentButton.addEventListener("click", () => {
      const newIndent = Math.max(0, this.state.indent - 1)
      this.onStateChange({ indent: newIndent })
    })

    indentButton.appendChild(indentIcon)
    this.actions.set("indentButton", indentButton)
    outdentButton.appendChild(outdentIcon)
    this.actions.set("outdentButton", outdentButton)
    this.actions.set("indentDisplay", currentValue)

    this.leftGroup.appendChild(indentButton)
    this.leftGroup.appendChild(currentValue)
    this.leftGroup.appendChild(outdentButton)
  }

  // Create theme selection dropdown
  private createThemeElements(): void {
    const isVisibleCss = this.config.showThemeSelect && this.config.availableThemes ? "" : "hidden"
    const themeButton = this.createElement("select", `theme-select clickable ${isVisibleCss}`)
    const themeIcon = this.createElement("span", "icon theme")

    this.config.availableThemes?.forEach((theme) => {
      const option = this.createElement("option") as HTMLOptionElement
      option.value = theme
      option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1)
      themeButton.appendChild(option)
    })

    themeButton.addEventListener("change", (event: Event) => {
      const selectElement = event.target as HTMLSelectElement
      const selectedTheme = selectElement.value
      this.onStateChange({ theme: selectedTheme })
    })

    themeButton.appendChild(themeIcon)
    this.actions.set("themeButton", themeButton)
    this.leftGroup.appendChild(themeButton)
  }

  // Create info button to toggle additional information
  private createInfosElements(): void {
    const isVisibleCss = this.config.showInfos ? "" : "hidden"
    const infosButton = this.createElement("div", `icon-wrapper clickable ${isVisibleCss}`)
    const infosIcon = this.createElement("span", `icon info ${this.state.infosEnabled ? "active" : ""}`)

    infosButton.addEventListener("click", () => {
      const newState = !this.state.infosEnabled
      this.onStateChange({ infosEnabled: newState })
    })

    infosButton.appendChild(infosIcon)
    this.actions.set("infosButton", infosButton)
    this.leftGroup.appendChild(infosButton)
  }

  private createCopyElement(): void {
    const isVisibleCss = this.config.showCopy && this.onCopyAll ? "" : "hidden"

    const copyButton = this.createElement("div", `clickable copy-icon-wrapper ${isVisibleCss}`)
    const copyIcon = this.createElement("span", "icon copy")
    copyButton.addEventListener("click", () => {
      this.onCopyAll?.()
    })
    copyButton.appendChild(copyIcon)
    this.actions.set("copyButton", copyButton)
    this.leftGroup.appendChild(copyButton)
  }

  private createSizeElement(): void {
    const isVisibleCss = this.config.showSize ? "" : "hidden"

    const sizeDisplay = this.createElement("span", `display-value ${isVisibleCss}`)
    sizeDisplay.textContent = this.formatSize(this.state.dataSize)

    this.actions.set("sizeDisplay", sizeDisplay)
    this.rightGroup.appendChild(sizeDisplay)
  }

  private createSearchElement(): void {
    const isVisibleCss = this.config.showSearch ? "" : "hidden"
    // Search input
    const searchIcon = document.createElement("span")
    searchIcon.className = "icon search " + isVisibleCss
    const searchInput = this.createElement("input", `search-input ${isVisibleCss}`) as HTMLInputElement
    searchInput.type = "text"
    searchInput.setAttribute("placeholder", "...")

    // searchInput.placeholder = "Search JSON..."
    searchInput.value = this.state.searchTerm || ""

    // Debounced input handler - more efficient than before
    searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = window.setTimeout(() => {
        const searchTerm = (e.target as HTMLInputElement).value
        if (this.state.searchTerm !== searchTerm) {
          this.state.searchTerm = searchTerm
          this.onStateChange({ searchTerm })
        }
      }, 300)
    })

    this.actions.set("searchIcon", searchIcon)
    this.actions.set("searchInput", searchInput)
    this.rightGroup.appendChild(searchIcon)
    this.rightGroup.appendChild(searchInput)
  }

  public remove(): void {
    this.container.remove()
    this.actions.clear()
  }

  // Update functions
  // Highly efficient updates - only change what's needed
  public updateConfig(newConfig: Partial<ToolbarConfig>): void {
    const changed = Object.keys(newConfig).some(
      (key) => this.config[key as keyof ToolbarConfig] !== newConfig[key as keyof ToolbarConfig]
    )

    if (!changed) return
    this.actions.get("searchInput")?.classList.toggle("hidden", !newConfig.showSearch)
    this.actions.get("sizeDisplay")?.classList.toggle("hidden", !newConfig.showSize)
    this.actions.get("copyButton")?.classList.toggle("hidden", !newConfig.showCopy)
    this.actions.get("collapseButton")?.classList.toggle("hidden", !newConfig.showExpandControls)
    this.actions.get("expandButton")?.classList.toggle("hidden", !newConfig.showExpandControls)
    this.actions.get("indentButton")?.classList.toggle("hidden", !newConfig.showIndentControls)
    this.actions.get("themeButton")?.classList.toggle("hidden", !newConfig.showThemeSelect)
    this.actions.get("infosButton")?.classList.toggle("hidden", !newConfig.showInfos)

    // Update all elements
    this.updateState(this.state)
  }

  // Highly efficient element updates - only change what's needed
  public updateState(changes: Partial<ToolbarState>): void {
    if ("searchTerm" in changes) {
      const searchInput = this.actions.get("searchInput") as HTMLInputElement
      if (searchInput && searchInput.value !== changes.searchTerm) {
        searchInput.value = changes.searchTerm || ""
      }
    }

    if ("expandLevel" in changes) {
      const expandButton = this.actions.get("expandButton")
      if (expandButton) {
        let newValue = Math.max(0, changes.expandLevel || 0)
        if (newValue > this.config.maxExpandLevel!) {
          newValue = this.config.maxExpandLevel!
        }
        this.state.expandLevel = newValue
        const expandLevelDisplay = this.actions.get("expandLevelDisplay")
        if (expandLevelDisplay) {
          expandLevelDisplay.innerHTML = `<span class="expand-level">${changes.expandLevel}</span>`
        }
      }
    }

    if ("indent" in changes) {
      const indentDisplay = this.actions.get("indentDisplay")
      let newIndent = Math.max(0, changes.indent || 0)
      if (newIndent > (this.config.maxIndentLevel || 12)) {
        newIndent = this.config.maxIndentLevel || 12
      }
      this.state.indent = newIndent
      if (indentDisplay) {
        indentDisplay.textContent = this.state.indent.toString()
      }
    }

    if ("theme" in changes) {
      const newTheme = changes.theme || "default-light"
      this.state.theme = newTheme
      const themeButton = this.actions.get("themeButton") as HTMLSelectElement
      if (themeButton) {
        themeButton.value = newTheme
      }
    }

    if ("dataSize" in changes) {
      const newSize = changes.dataSize || 0
      this.state.dataSize = newSize
      const sizeDisplay = this.actions.get("sizeDisplay")
      if (sizeDisplay) {
        sizeDisplay.textContent = this.formatSize(newSize)
      }
    }

    if ("infosEnabled" in changes) {
      const newValue = changes.infosEnabled === true
      this.state.infosEnabled = newValue
      const infosButton = this.actions.get("infosButton")
      if (infosButton) {
        const infosIcon = infosButton.querySelector(".icon") as HTMLElement
        if (infosIcon) {
          infosIcon.classList.toggle("active", newValue)
        }
      }
    }
  }

  // Helper methods
  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag)
    if (className) element.className = className
    return element
  }

  private formatSize(bytes: number): string {
    if (bytes === 0) return "0B"
    const k = 1024
    const sizes = ["B", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + "" + sizes[i]
  }
}
