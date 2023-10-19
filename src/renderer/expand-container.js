// this function creates an array of elements representing the expanded tree
// [oppeningBrace, sizeSpan, ...children, closingBrace]
const createExpandedTree = ({ type, size, children }) => {
  const oppeningBrace = document.createElement("span")
  oppeningBrace.className = "brace"
  oppeningBrace.textContent = type === "array" ? "[" : "{"

  const sizeSpan = document.createElement("span")
  sizeSpan.className = "size"
  sizeSpan.textContent = `${size} item${size === 1 ? "" : "s"}`

  const closingBrace = document.createElement("span")
  closingBrace.className = "brace"
  closingBrace.textContent = type === "array" ? "]" : "}"

  return [oppeningBrace, sizeSpan, ...children, closingBrace]
}

// this function creates an array of elements representing the collapsed tree
// [oppeningBrace, ellipsis, closingBrace, sizeSpan]
const createCollapsedTree = ({ type, size, onExpand }) => {
  const oppeningBrace = document.createElement("span")
  oppeningBrace.className = "brace"
  oppeningBrace.textContent = type === "array" ? "[" : "{"

  const ellipsis = document.createElement("span")
  ellipsis.className = "ellipsis"
  ellipsis.textContent = "..."
  ellipsis.onclick = () => {
    onExpand && onExpand()
  }

  const closingBrace = document.createElement("span")
  closingBrace.className = "brace"
  closingBrace.textContent = type === "array" ? "]" : "}"

  const sizeSpan = document.createElement("span")
  sizeSpan.className = "size"
  sizeSpan.textContent = `${size} item${size === 1 ? "" : "s"}`

  return [oppeningBrace, ellipsis, closingBrace, sizeSpan]
}

function ExpandContainer({ expanded, type, children, onExpand }) {
  this.size = children.length
  this.element = document.createElement("span")
  this.expandedTree = createExpandedTree({
    type,
    size: this.size,
    children,
  })
  this.collpsedTree = createCollapsedTree({
    type,
    size: this.size,
    onExpand,
  })

  this.update = ({ expanded }) => {
    this.element.innerHTML = ""
    console.log("======expanded", expanded)
    if (expanded) {
      this.element.append(...this.expandedTree)
    } else {
      this.element.append(...this.collpsedTree)
    }
  }

  this.update(expanded)
}

export default ExpandContainer
