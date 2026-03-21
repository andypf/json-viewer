const Toolbar = function ({ expanded, indent, onChange, onSearch, showDetails }) {
  this.indent = indent || 2
  this.expanded = typeof expanded === "number" ? expanded : 2
  this.showDetails = showDetails !== false
  this.maxExpandLevel = 0

  let searchInput

  const toolbar = document.createElement("div")
  toolbar.className = "toolbar"

  // OPTIONS
  const options = document.createElement("div")
  options.className = "options"
  toolbar.appendChild(options)

  // SEARCH WRAPPER
  const searchWrapper = document.createElement("div")
  searchWrapper.className = "search-wrapper"
  toolbar.appendChild(searchWrapper)

  // REFRESH BUTTON
  const refreshButton = document.createElement("button")
  refreshButton.type = "button"
  refreshButton.className = "icon-wrapper"
  refreshButton.setAttribute("title", "Reset to defaults")
  refreshButton.setAttribute("aria-label", "Reset to defaults")
  options.appendChild(refreshButton)
  const refreshIcon = document.createElement("span")
  refreshIcon.className = "icon refresh"
  refreshIcon.setAttribute("aria-hidden", "true")
  refreshButton.onclick = () => this.refresh()
  refreshButton.appendChild(refreshIcon)

  // EXPAND BUTTON
  const expandButton = document.createElement("button")
  expandButton.type = "button"
  expandButton.className = "icon-wrapper"
  expandButton.setAttribute("title", "Expand")
  expandButton.setAttribute("aria-label", "Expand one level")
  options.appendChild(expandButton)
  const expandIcon = document.createElement("span")
  expandIcon.className = "icon plus"
  expandIcon.setAttribute("aria-hidden", "true")
  expandButton.appendChild(expandIcon)
  expandButton.onclick = () => {
    if (this.expanded < this.maxExpandLevel) this.expanded += 1
    onChange({ expanded: this.expanded })
  }

  // COLLAPSE BUTTON
  const collapseButton = document.createElement("button")
  collapseButton.type = "button"
  collapseButton.className = "icon-wrapper"
  collapseButton.setAttribute("title", "Collapse")
  collapseButton.setAttribute("aria-label", "Collapse one level")
  options.appendChild(collapseButton)

  const collapseIcon = document.createElement("span")
  collapseIcon.className = "icon minus"
  collapseIcon.setAttribute("aria-hidden", "true")
  collapseButton.appendChild(collapseIcon)
  collapseButton.onclick = () => {
    if (this.expanded > this.maxExpandLevel) this.expanded = this.maxExpandLevel
    if (this.expanded > 0) this.expanded -= 1
    onChange({ expanded: this.expanded })
  }

  // INDENT BUTTON
  const indentButton = document.createElement("button")
  indentButton.type = "button"
  indentButton.className = "icon-wrapper"
  indentButton.setAttribute("title", "Increase indent")
  indentButton.setAttribute("aria-label", "Increase indent")
  options.appendChild(indentButton)
  const indentIcon = document.createElement("span")
  indentIcon.className = "icon indent"
  indentIcon.setAttribute("aria-hidden", "true")
  indentButton.onclick = () => {
    this.indent += 1
    onChange({ indent: this.indent })
  }
  indentButton.appendChild(indentIcon)

  // OUTDENT BUTTON
  const outdentButton = document.createElement("button")
  outdentButton.type = "button"
  outdentButton.className = "icon-wrapper"
  outdentButton.setAttribute("title", "Decrease indent")
  outdentButton.setAttribute("aria-label", "Decrease indent")
  options.appendChild(outdentButton)
  const outdentIcon = document.createElement("span")
  outdentIcon.className = "icon outdent"
  outdentIcon.setAttribute("aria-hidden", "true")
  outdentButton.onclick = () => {
    this.indent -= 1
    onChange({ indent: this.indent })
  }
  outdentButton.appendChild(outdentIcon)

  // INFO BUTTON
  const infoButton = document.createElement("button")
  infoButton.type = "button"
  infoButton.className = "icon-wrapper"
  infoButton.setAttribute("title", "Toggle details")
  infoButton.setAttribute("aria-label", "Toggle details")
  infoButton.setAttribute("aria-pressed", this.showDetails ? "true" : "false")
  options.appendChild(infoButton)
  const infoIcon = document.createElement("span")
  infoIcon.className = `icon info ${this.showDetails ? "active" : ""}`
  infoIcon.setAttribute("aria-hidden", "true")
  infoButton.onclick = () => {
    infoIcon.classList.toggle("active")
    this.showDetails = !this.showDetails
    infoButton.setAttribute("aria-pressed", this.showDetails ? "true" : "false")
    onChange({
      showDetails: this.showDetails,
    })
  }
  infoButton.appendChild(infoIcon)

  // SEARCH INPUT
  const searchIcon = document.createElement("span")
  searchIcon.className = "icon search"
  searchWrapper.appendChild(searchIcon)
  searchInput = document.createElement("input")
  searchInput.className = "search-input"
  searchInput.placeholder = "Search"
  searchInput.oninput = (e) => {
    onSearch(e.target.value)
  }
  searchWrapper.appendChild(searchInput)

  this.refresh = () => {
    this.expanded = 1
    this.indent = 2
    if (searchInput) searchInput.value = ""
    onChange({ indent: 2, expanded: 1 })
    onSearch("")
  }

  this.updateShowDetails = (value) => {
    this.showDetails = value
    infoButton.setAttribute("aria-pressed", this.showDetails ? "true" : "false")
    if (this.showDetails) {
      infoIcon.classList.add("active")
    } else {
      infoIcon.classList.remove("active")
    }
  }
  this.element = toolbar
}

export default Toolbar
