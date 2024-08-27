const defaultTheme = "monokai"
const defaultIndent = 2
const defaultExpanded = 2
const defaultShowDataTypes = true
const defaultShowToolbar = true
const defaultShowSize = true
const defaultShowCopy = true
const defaultExpandIconType = "square"

const jsonViewer = document.getElementById("andypf-json-viewer")
jsonViewer.id = "json"
jsonViewer.expanded = defaultExpanded
jsonViewer.indent = defaultIndent
jsonViewer.showDataTypes = defaultShowDataTypes
jsonViewer.theme = defaultTheme
jsonViewer.showToolbar = defaultShowToolbar
jsonViewer.showSize = defaultShowSize
jsonViewer.showCopy = defaultShowCopy
jsonViewer.expandIconType = defaultExpandIconType
jsonViewer.data = {
  string: "this is a test",
  integer: 42,
  array: [1, 2, 3, "test", NaN],
  float: 3.14159,
  undefined: undefined,
  object: {
    "first-child": true,
    "second-child": false,
    "last-child": null,
    strings: {
      veryLong:
        "The 'json-viewer' is a powerful tool designed specifically for displaying and analyzing JSON data. JSON (JavaScript Object Notation) is a widely used data format for transmission and storage. It's easy to understand and write, but when it comes to visualizing extensive or complex JSON data, it can be a challenge.",
    },
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  string_number: "1234",
  date: new Date(),
}

const output = document.getElementById("output")
const updateOutput = () => {
  const json = JSON.parse(jsonViewer.options.data)
  if (json?.object?.strings?.veryLong) json.object.strings.veryLong = json?.object.strings.veryLong.slice(0, 50) + "..."
  output.innerText = `
<andypf-json-viewer 
  ${Object.keys(jsonViewer.options)
    .filter((k) => k !== "data")
    .map((k) => `${k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}="${jsonViewer.options[k]}"`)
    .join("\n  ")}>
${JSON.stringify(json, null, 2)}
</andypf-json-viewer>`
}

// select theme
const select = document.getElementById("theme")
const loadingOption = document.createElement("option")
loadingOption.value = "loading"
loadingOption.innerText = "loading..."
select.append(loadingOption)

// Load available themes
import("./build/themes.js").then((module) => {
  loadingOption.remove()
  module.availableThemes.forEach((theme) => {
    const option = document.createElement("option")
    option.value = theme
    option.innerText = theme
    if (theme === defaultTheme) option.selected = true
    select.append(option)
  })
  // add event listener
  select.addEventListener("change", function () {
    jsonViewer.setAttribute("theme", this.value)
    updateOutput()
  })
})

// expanded
const expandedSelect = document.getElementById("expanded")
const expandedValues = ["true", "false", 0, 1, 2, 3]
expandedValues.forEach((v) => {
  const option = document.createElement("option")
  option.value = v
  option.innerText = v
  if (v === defaultExpanded) option.selected = true
  expandedSelect.append(option)
})
expandedSelect.addEventListener("change", function () {
  jsonViewer.expanded = this.value
  updateOutput()
})

// indent
const indentSelect = document.getElementById("indent")
Array.from({ length: 10 }, (_, i) => i).forEach((v) => {
  const option = document.createElement("option")
  option.value = v
  option.innerText = v
  if (v === defaultIndent) option.selected = true
  indentSelect.append(option)
})
indentSelect.addEventListener("change", function () {
  jsonViewer.indent = this.value
  updateOutput()
})

// expand icon
const expandIconSelect = document.getElementById("expand-icon-type")
const expandIconValues = ["arrow", "square", "circle"]
expandIconValues.forEach((v) => {
  const option = document.createElement("option")
  option.value = v
  option.innerText = v
  if (v === defaultExpandIconType) option.selected = true
  expandIconSelect.append(option)
})
expandIconSelect.addEventListener("change", function () {
  jsonViewer.expandIconType = this.value
  updateOutput()
})

// show data types
const showDataTypesCheckbox = document.getElementById("show-data-types")
showDataTypesCheckbox.checked = defaultShowDataTypes
showDataTypesCheckbox.addEventListener("change", function () {
  jsonViewer.showDataTypes = this.checked
  updateOutput()
})

// show toolbar
const showToolbarCheckbox = document.getElementById("show-toolbar")
showToolbarCheckbox.checked = defaultShowToolbar
showToolbarCheckbox.addEventListener("change", function () {
  jsonViewer.showToolbar = this.checked
  updateOutput()
})

const showSizeCheckbox = document.getElementById("show-size")
showSizeCheckbox.checked = defaultShowSize
showSizeCheckbox.addEventListener("change", function () {
  jsonViewer.showSize = this.checked
  updateOutput()
})

const showCopyCheckbox = document.getElementById("show-copy")
showCopyCheckbox.checked = defaultShowCopy
showCopyCheckbox.addEventListener("change", function () {
  jsonViewer.showCopy = this.checked
  updateOutput()
})

const showCodeBox = document.getElementById("show-code")
showCodeBox.checked = false
showCodeBox.addEventListener("change", function () {
  document.getElementById("html-code").classList.toggle("hidden")
})

const showSourceBox = document.getElementById("show-source")
showSourceBox.checked = false
showSourceBox.addEventListener("change", function () {
  document.getElementById("source-code").classList.toggle("hidden")
})

const sourceCode = document.getElementById("source-code")
sourceCode.value = JSON.stringify(JSON.parse(jsonViewer.options.data), null, 2)
sourceCode.addEventListener("input", function () {
  try {
    const newData = JSON.parse(this.value)
    jsonViewer.data = newData
    jsonViewer.expanded = true
    updateOutput()
  } catch (e) {
    console.warn(e)
  }
})
updateOutput()
