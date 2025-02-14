import { dataType } from "../data-helpers"

const DataRow = function ({ key, value, expanded, indent, onToggleExpand, level = 0, parentRow }) {
  const row = document.createElement("div")
  this.maxLevel = level

  const thisDataType = dataType(value)
  const hasChildren = thisDataType === "array" || thisDataType === "object"
  let isExpanded = expanded === true || expanded > level
  let expandIcon, childrenRows, keyEl, valueEl

  // ROW CONTAINER
  row.className = `data-row ${isExpanded ? "expanded" : ""}`
  row.dataset.key = key
  row.dataset.level = level
  if (level > 0) row.style.paddingLeft = `${indent * 5}px`

  const keyValueWrapper = document.createElement("span")
  keyValueWrapper.className = "key-value-wrapper"
  row.appendChild(keyValueWrapper)

  const toggleExpand = () => {
    row.classList.toggle("expanded")

    if (onToggleExpand) {
      if (row.classList.contains("expanded")) {
        onToggleExpand(level + 1)
      } else {
        onToggleExpand(level)
      }
    }
  }

  // EXPAND ICON
  if (hasChildren) {
    const expandIconWrapper = document.createElement("span")
    expandIconWrapper.className = "icon-wrapper"
    keyValueWrapper.appendChild(expandIconWrapper)

    // create the icon (i tag) using the DOM API
    expandIcon = document.createElement("span")
    expandIcon.className = `expand icon clickable`
    expandIcon.setAttribute("title", isExpanded ? "Collapse" : "Expand")
    expandIconWrapper.appendChild(expandIcon)

    expandIconWrapper.addEventListener("click", () => toggleExpand())
  }

  // KEY VALUE WRAPPER
  if (key !== null && key !== "") {
    // KEY
    const keyDataType = typeof key
    keyEl = document.createElement("span")
    keyEl.className = `key clickable ${keyDataType === "number" ? "number" : ""}`
    keyEl.textContent = keyDataType === "number" ? key : `"${key}"`
    keyEl.addEventListener("click", () => toggleExpand())
    keyValueWrapper.appendChild(keyEl)

    // COLON
    const colonEl = document.createElement("span")
    colonEl.classList.add("colon")
    colonEl.textContent = ":"
    keyValueWrapper.appendChild(colonEl)
  }

  if (hasChildren) {
    // OPENING PARENTHESIS
    const openingParenthesis = document.createElement("span")
    openingParenthesis.className = "opening-parenthesis"
    openingParenthesis.textContent = thisDataType === "array" ? "[" : "{"
    keyValueWrapper.appendChild(openingParenthesis)

    // ELLIPSIS
    const ellipsis = document.createElement("span")
    ellipsis.className = "ellipsis clickable"
    ellipsis.textContent = "..."
    ellipsis.addEventListener("click", () => toggleExpand())
    keyValueWrapper.appendChild(ellipsis)

    // CLOSING PARENTHESIS
    const closingParenthesis = document.createElement("span")
    closingParenthesis.className = "closing-parenthesis"
    closingParenthesis.textContent = thisDataType === "array" ? "]" : "}"
    keyValueWrapper.appendChild(closingParenthesis)

    // ITEMS SIZE
    const itemsSize = document.createElement("span")
    const length = thisDataType === "array" ? value.length : Object.keys(value).length
    itemsSize.className = "items-size"
    itemsSize.textContent = `${length} item${length === 1 ? "" : "s"}`
    keyValueWrapper.appendChild(itemsSize)

    // CHILDREN ROWS
    childrenRows = []

    const items = thisDataType === "array" ? value.map((v, i) => i) : Object.keys(value)
    items.forEach((key) => {
      const subRow = new DataRow({
        key,
        value: value[key],
        expanded,
        indent,
        onToggleExpand,
        level: level + 1,
        parentRow: row,
      })
      childrenRows.push(subRow)
      row.appendChild(subRow.element)
      this.maxLevel = Math.max(this.maxLevel, subRow.maxLevel)
    })

    // EXPANDED CLOSING PARENTHESIS
    const expandedClosingParenthesis = document.createElement("span")
    expandedClosingParenthesis.className = "closing-parenthesis"
    expandedClosingParenthesis.textContent = thisDataType === "array" ? "]" : "}"
    row.appendChild(expandedClosingParenthesis)
  } else {
    // VALUE
    let valueType = null
    if (!["nan", "NaN", "undefined", "null"].includes(thisDataType)) {
      valueType = document.createElement("span")
      valueType.className = `type`
      valueType.textContent = thisDataType.toLowerCase()
    }

    const valueWrapper = document.createElement("span")
    valueWrapper.className = `value ${thisDataType.toLowerCase()}`
    valueEl = document.createElement("span")
    valueEl.className = "value-data"
    valueEl.textContent = thisDataType === "string" ? `"${value}"` : value
    if (valueType) valueWrapper.appendChild(valueType)
    valueWrapper.appendChild(valueEl)
    keyValueWrapper.appendChild(valueWrapper)
  }

  // COPY ICON
  const copyIcon = document.createElement("span")
  copyIcon.className = "copy icon"
  copyIcon.setAttribute("title", "Copy to clipboard")

  const copyIconWrapper = document.createElement("span")
  copyIconWrapper.className = "icon-wrapper"
  copyIconWrapper.addEventListener("click", () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, indent))
  })
  copyIconWrapper.appendChild(copyIcon)
  keyValueWrapper.appendChild(copyIconWrapper)

  // this function highlights the search term
  const search = (searchTerm) => {
    // create a regular expression from the search term
    const regex = new RegExp(searchTerm, "gi")
    // initialize an array of elements to search
    const searchElements = []
    // add the key and value elements to the array if they exist
    if (keyEl) searchElements.push(keyEl)
    if (valueEl) searchElements.push(valueEl)

    let found = false
    // loop through the elements and highlight the matches
    searchElements.forEach((el) => {
      const string = el.textContent
      // remove any existing matches (RESETTING THE OLD SEARCH)
      el.innerHTML = string

      // if the search term is empty, return
      if (!searchTerm || searchTerm === "") return
      // find all the indexes of the search term in the string
      const indexes = [...string.matchAll(regex)].map((m) => m.index)
      // if there are matches, expand the row
      const newHtml = []
      let lastIndex = 0
      indexes.forEach((index) => {
        found = true
        newHtml.push(string.slice(lastIndex, index))
        newHtml.push(`<span class="match">${searchTerm}</span>`)
        lastIndex = index + searchTerm.length
      })
      newHtml.push(string.slice(lastIndex))
      el.innerHTML = newHtml.join("")
    })

    // if the search term was found, expand the row
    if (found && !row.classList.contains("expanded")) {
      toggleExpand()
      // if the row has a parent, expand it too
      if (parentRow) parentRow.classList.add("expanded")
    }
  }

  // this function updates the icon based on the expanded state
  this.update = ({ expanded, indent, searchTerm }) => {
    if (indent !== undefined && level > 0) {
      row.style.paddingLeft = `${indent * 5}px`
    }

    if (expanded !== undefined) {
      isExpanded = expanded === true || expanded > level
      row.classList.toggle("expanded", isExpanded)
      if (expandIcon) expandIcon.title = isExpanded ? "Collapse" : "Expand"
    }
    if (searchTerm !== undefined && searchTerm !== null) {
      search(searchTerm)
    }

    if (childrenRows) childrenRows.forEach((r) => r.update({ expanded, indent, searchTerm }))
  }

  this.element = row
}

export default DataRow
