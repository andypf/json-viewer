import { dataType } from "../data-helpers"

const DataRow = function ({ key, value, expanded, indent, level = 0 }) {
  const row = document.createElement("div")

  const thisDataType = dataType(value)
  const hasChildren = thisDataType === "array" || thisDataType === "object"
  let isExpanded = expanded === true || expanded > level
  let expandIcon, childrenRows

  // ROW CONTAINER
  row.className = `data-row ${isExpanded ? "expanded" : ""}`
  row.dataset.key = key
  row.dataset.level = level
  row.style.paddingLeft = `${indent * level}rem`

  const keyValueWrapper = document.createElement("span")
  keyValueWrapper.className = "key-value-wrapper"
  row.appendChild(keyValueWrapper)

  const toggleExpand = () => row.classList.toggle("expanded")

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

    expandIcon.addEventListener("click", () => toggleExpand())
  }

  // KEY VALUE WRAPPER
  if (key !== null && key !== "") {
    // KEY
    const keyDataType = typeof key
    const keyEl = document.createElement("span")
    keyEl.className = `key clickable ${
      keyDataType === "number" ? "number" : ""
    }`
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
    itemsSize.className = "items-size"
    itemsSize.textContent = `${
      thisDataType === "array" ? value.length : Object.keys(value).length
    } items`
    keyValueWrapper.appendChild(itemsSize)

    // CHILDREN ROWS
    childrenRows = []
    const items = thisDataType === "array" ? value : Object.keys(value)
    items.forEach((key) => {
      const subRow = new DataRow({ key, value: value[key], level: level + 1 })
      childrenRows.push(subRow)
      row.appendChild(subRow.element)
    })

    // EXPANDED CLOSING PARENTHESIS
    const expandedClosingParenthesis = document.createElement("span")
    expandedClosingParenthesis.className = "closing-parenthesis"
    expandedClosingParenthesis.textContent =
      thisDataType === "array" ? "]" : "}"
    row.appendChild(expandedClosingParenthesis)
  } else {
    // VALUE
    let valueType = ""
    if (!["nan", "NaN", "undefined", "null"].includes(thisDataType)) {
      valueType = `<span class="type">${thisDataType}</span>`
    }

    const valueEl = document.createElement("span")
    valueEl.className = `value ${thisDataType}`
    valueEl.innerHTML = `${valueType} ${value}`
    keyValueWrapper.appendChild(valueEl)
  }

  // COPY ICON
  const copyIcon = document.createElement("span")
  copyIcon.className = "copy icon"
  copyIcon.setAttribute("title", "Copy to clipboard")
  copyIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(JSON.stringify(value))
  })

  const copyIconWrapper = document.createElement("span")
  copyIconWrapper.className = "icon-wrapper"
  copyIconWrapper.appendChild(copyIcon)
  keyValueWrapper.appendChild(copyIconWrapper)

  // this function updates the icon based on the expanded state
  this.update = ({ expanded, indent }) => {
    if (indent !== undefined) {
      row.style.paddingLeft = `${indent * level}rem`
    }

    if (expanded !== undefined) {
      isExpanded = expanded === true || expanded > level
      row.classList.toggle("expanded", isExpanded)
      if (expandIcon) expandIcon.title = isExpanded ? "Collapse" : "Expand"
      if (childrenRows)
        childrenRows.forEach((r) => r.update({ expanded, indent }))
    }
  }

  this.element = row
}

export default DataRow