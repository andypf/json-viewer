import { dataType } from "../data-helpers"
import ExpandIcon from "./expand-icon"

class Expandable {
  constructor({ expanded, type, children, onExpand }) {
    this.#expanded = expanded
    const size = children.length
    this.element = document.createElement("span")
    this.element.className = "expandable"

    this.#expandedTree = Expandable.createExpandedTree({
      type,
      size,
      children,
    })
    this.#collapsedTree = Expandable.createCollapsedTree({
      type,
      size,
      onExpand,
    })
    this.#render()
  }
  #expanded
  #expandedTree
  #collapsedTree

  set expanded(boolean) {
    if (this.#expanded !== boolean) {
      this.#expanded = boolean
      this.#render()
    }
  }

  static createExpandedTree = ({ type, size, children }) => [
    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "[" : "{",
    }),

    Object.assign(document.createElement("span"), {
      className: "size",
      textContent: `${size} item${size === 1 ? "" : "s"}`,
    }),

    ...children,

    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "]" : "}",
    }),
  ]

  static createCollapsedTree = ({ type, size, onExpand }) => [
    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "[" : "{",
    }),

    Object.assign(document.createElement("span"), {
      className: "ellipsis",
      textContent: "...",
      onclick: () => {
        onExpand && onExpand()
      },
    }),

    Object.assign(document.createElement("span"), {
      className: "brace",
      textContent: type === "array" ? "]" : "}",
    }),

    Object.assign(document.createElement("span"), {
      className: "size",
      textContent: `${size} item${size === 1 ? "" : "s"}`,
    }),
  ]

  #render() {
    this.element.innerHTML = ""
    if (this.#expanded) {
      this.element.append(...this.#expandedTree)
    } else {
      this.element.append(...this.#collapsedTree)
    }
  }
}

class Row {
  #isExpandable = false
  #expanded = false
  #indent = 2
  #expandable = null
  #expandIcon = null
  #children = null
  #isExpanded = false
  #keyElem
  #colonElem

  constructor(key, value, { expanded, indent, level = 0 }) {
    this.key = key
    this.value = value
    this.#expanded = expanded
    this.#isExpanded =
      typeof expanded === "boolean" ? expanded : expanded > level
    this.#indent = indent
    this.level = level
    this.type = dataType(value).toLowerCase()
    this.#isExpandable = this.type === "object" || this.type === "array"
    this.#render()
  }

  update({ expanded, indent }) {
    if (this.indent !== indent) this.indent = indent
    if (this.expanded !== expanded) this.expanded = expanded
  }

  set expanded(newValue) {
    const expanded =
      typeof newValue === "boolean" ? newValue : newValue > this.level

    if (this.#expanded !== expanded) {
      this.#expanded = expanded

      if (this.#expandable) {
        this.#expandable.expanded = expanded
      }
      if (this.#expandIcon) {
        this.#expandIcon.update({ expanded })
      }
    }
    if (Array.isArray(this.#children)) {
      this.#children.forEach((child) => {
        child.expanded = newValue
      })
    }
  }

  set indent(newIndent) {
    if (this.#indent === newIndent) return
    this.#indent = newIndent

    if (this.level > 0)
      this.element.style.paddingLeft = `${this.#indent * 10}px`
    if (Array.isArray(this.#children)) {
      this.#children.forEach((child) => {
        child.indent = newIndent
      })
    }
  }

  #render() {
    this.element = document.createElement("div")
    this.element.className = "object-row"
    if (this.level > 0)
      this.element.style.paddingLeft = `${this.#indent * 10}px`

    const keyWrapper = Object.assign(document.createElement("span"), {
      className: "key-wrapper",
    })
    keyWrapper.addEventListener("click", (e) => {
      this.expanded = !this.#expanded
    })

    this.element.append(keyWrapper)

    // Exampnd Icon
    if (this.#isExpandable) {
      this.#expandIcon = new ExpandIcon({
        expanded: this.#isExpanded,
      })
      keyWrapper.append(this.#expandIcon.element)
    }

    // Render key (name) and colon
    if (this.key || this.key === undefined || this.key === 0) {
      this.#keyElem = Object.assign(document.createElement("span"), {
        className: `key ${typeof this.key === "number" ? "number" : ""}`,
        textContent: typeof this.key === "number" ? this.key : `"${this.key}"`,
      })
      this.#colonElem = Object.assign(document.createElement("span"), {
        className: `colon`,
        textContent: ":",
      })

      keyWrapper.append(this.#keyElem)
      keyWrapper.append(this.#colonElem)
    }

    const copyIcon = Object.assign(document.createElement("span"), {
      className: "copy icon",
      title: "Copy to clipboard",
      onclick: () => {
        navigator.clipboard.writeText(JSON.stringify(this.value, null, 2))
        copyIcon.classList.add("copied")
        setTimeout(() => {
          copyIcon.classList.remove("copied")
        }, 200)
      },
    })
    const copyIconWrapper = Object.assign(document.createElement("span"), {
      className: "copy-icon-wrapper",
    })

    copyIconWrapper.append(copyIcon)

    if (this.#isExpandable) {
      const subRows =
        this.type === "array"
          ? this.value.map((item, index) => ({ key: index, value: item }))
          : Object.keys(this.value).map((key) => ({
              key,
              value: this.value[key],
            }))

      this.#children = subRows.map(({ key, value }) => {
        return new Row(key, value, {
          expanded: this.#expanded,
          indent: this.#indent,
          level: this.level + 1,
        })
      })

      this.#expandable = new Expandable({
        expanded: this.#isExpanded,
        children: [copyIconWrapper].concat(
          this.#children.map((child) => child.element)
        ),

        type: this.type,
        onExpand: () => {
          this.expanded = !this.#isExpanded
        },
      })

      this.element.append(this.#expandable.element)
    } else {
      // render value if not an object or array
      const valueType = ["nan", "NaN", "undefined", "null"].includes(this.type)
        ? ""
        : `<span class="type">${this.type}</span>`

      const valueElement = Object.assign(document.createElement("span"), {
        className: `value ${this.type}`,
        innerHTML: valueType + `<span class="content">${this.value}</span>`,
      })
      this.element.append(valueElement)
      this.element.append(copyIconWrapper)
    }
  }
}

class Container {
  constructor({
    data,
    expanded,
    indent,
    showDataTypes,
    showToolbar,
    showSize,
  }) {
    this.element = document.createElement("div")
    this.element.className = "container"
    this.update({
      data,
      expanded,
      indent,
      showDataTypes,
      showToolbar,
      showSize,
    })
  }

  update({
    data,
    expanded,
    indent,
    showDataTypes,
    showToolbar,
    expandIconType,
    showCopy,
    showSize,
  }) {
    if (this.showSize !== showSize) {
      this.showSize = showSize
      if (this.showSize) this.element.classList.add("show-size")
      else this.element.classList.remove("show-size")
    }

    if (this.expandIconType !== expandIconType) {
      this.element.classList.add(`expand-icon-${expandIconType}`)
      this.element.classList.remove(`expand-icon-${this.expandIconType}`)
      this.expandIconType = expandIconType
    }

    if (this.showCopy !== showCopy) {
      if (showCopy) this.element.classList.add(`show-copy`)
      else this.element.classList.remove(`show-copy`)
      this.showCopy = showCopy
    }

    if (this.showDataTypes !== showDataTypes) {
      this.showDataTypes = showDataTypes
      if (this.showDataTypes) this.element.classList.add("show-data-types")
      else this.element.classList.remove("show-data-types")
    }

    const dataString = JSON.stringify(data)
    if (this.dataString !== dataString) {
      this.expanded = expanded
      this.indent = indent

      console.log("====expanded1", expanded)

      this.row = new Row("", data, {
        expanded,
        indent,
      })
      this.element.replaceChildren(this.row.element)
      this.dataString = dataString
      return
    }

    let propsToBeUpdated = {}
    if (this.indent !== indent) {
      this.indent = indent
      propsToBeUpdated.indent = indent
    }
    if (this.expanded !== expanded) {
      console.log("====expanded", expanded)
      this.expanded = expanded
      propsToBeUpdated.expanded = expanded
    }

    if (Object.keys(propsToBeUpdated).length > 0) {
      this.row.update(propsToBeUpdated)
    }
  }
}

export default Container
