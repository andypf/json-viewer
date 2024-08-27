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

  // REFRESH ICON
  const refreshIconWrapper = document.createElement("div")
  refreshIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(refreshIconWrapper)
  const refreshIcon = document.createElement("span")
  refreshIcon.className = "icon refresh"
  refreshIconWrapper.onclick = () => this.refresh()
  refreshIconWrapper.appendChild(refreshIcon)

  // EXPAND ICON
  const expandIconWrapper = document.createElement("div")
  expandIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(expandIconWrapper)
  const expandIcon = document.createElement("span")
  expandIcon.className = "icon plus"
  expandIconWrapper.appendChild(expandIcon)
  expandIconWrapper.onclick = () => {
    if (this.expanded < this.maxExpandLevel) this.expanded += 1
    onChange({ expanded: this.expanded })
  }

  // COLLAPSE ICON
  const collapseIconWrapper = document.createElement("div")
  collapseIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(collapseIconWrapper)

  const collapseIcon = document.createElement("span")
  collapseIcon.className = "icon minus"
  collapseIconWrapper.appendChild(collapseIcon)
  collapseIconWrapper.onclick = () => {
    if (this.expanded > this.maxExpandLevel) this.expanded = this.maxExpandLevel
    if (this.expanded > 0) this.expanded -= 1
    onChange({ expanded: this.expanded })
  }

  // INDENT ICON
  const indentIconWrapper = document.createElement("div")
  indentIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(indentIconWrapper)
  const indentIcon = document.createElement("span")
  indentIcon.className = "icon indent"
  indentIconWrapper.onclick = () => {
    this.indent += 1
    onChange({ indent: this.indent })
  }
  indentIconWrapper.appendChild(indentIcon)

  // OUTDENT ICON
  const outdentIconWrapper = document.createElement("div")
  outdentIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(outdentIconWrapper)
  const outdentIcon = document.createElement("span")
  outdentIcon.className = "icon outdent"
  outdentIconWrapper.onclick = () => {
    this.indent -= 1
    onChange({ indent: this.indent })
  }
  outdentIconWrapper.appendChild(outdentIcon)

  // INFO ICON
  const infoIconWrapper = document.createElement("div")
  infoIconWrapper.className = "icon-wrapper clickable"
  options.appendChild(infoIconWrapper)
  const infoIcon = document.createElement("span")
  infoIcon.className = `icon info ${this.showDetails ? "active" : ""}`
  infoIconWrapper.onclick = () => {
    infoIcon.classList.toggle("active")
    this.showDetails = !this.showDetails
    onChange({
      showDetails: this.showDetails,
    })
  }
  infoIconWrapper.appendChild(infoIcon)

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
    if (this.showDetails) {
      infoIcon.classList.add("active")
    } else {
      infoIcon.classList.remove("active")
    }
  }
  this.element = toolbar
}

export default Toolbar
