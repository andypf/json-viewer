import { dataType } from "./data-helpers"

class ExpandIcon {
  #icon
  constructor({ expanded = false, onToggle }) {
    const className = expanded ? "arrow-down" : "arrow-right"
    let isExpanded = expanded

    this.#icon = Object.assign(document.createElement("i"), {
      className: `icon ${className}`,
    })

    this.element = Object.assign(document.createElement("span"), {
      className: "icon-wrapper",
      onclick: function (e) {
        icon.classList.toggle("arrow-down")
        icon.classList.toggle("arrow-right")
        isExpanded = !isExpanded
        if (onToggle) onToggle(isExpanded)
      },
    })

    this.element.append(this.#icon)
  }

  set expanded(boolean) {
    if (boolean) {
      this.#icon.classList.add("arrow-down")
      this.#icon.classList.remove("arrow-right")
    } else {
      this.#icon.classList.remove("arrow-down")
      this.#icon.classList.add("arrow-right")
    }
  }
}

class Expandable {
  constructor({ expanded, type, children, onExpand }) {
    this.#expanded = expanded
    const size = children.length
    this.element = document.createElement("span")

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

  constructor(key, value, { expanded, indent, showDataTypes, level = 0 }) {
    this.key = key
    this.value = value
    this.#expanded = typeof expanded === "boolean" ? expanded : expanded > level
    this.#indent = indent
    this.showDataTypes = showDataTypes
    this.level = level
    this.type = dataType(value).toLowerCase()
    this.#isExpandable = this.type === "object" || this.type === "array"
    this.#render()
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
        this.#expandIcon.expanded = expanded
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

    // Exampnd Icon
    if (this.#isExpandable) {
      this.#expandIcon = new ExpandIcon({
        expanded: this.#expanded,
        onToggle: (bool) => {
          if (this.#expandable) this.#expandable.expanded = bool
        },
      })
      this.element.append(this.#expandIcon.element)
    }

    // Render key (name) and colon
    if (this.key || this.key === undefined || this.key === 0) {
      const keyElem = Object.assign(document.createElement("span"), {
        className: `key ${typeof this.key === "number" ? "number" : ""}`,
        textContent: typeof this.key === "number" ? this.key : `"${this.key}"`,
      })
      const colonElem = Object.assign(document.createElement("span"), {
        className: "colon",
        textContent: ":",
      })

      this.element.append(keyElem)
      this.element.append(colonElem)
    }

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
          showDataTypes: this.showDataTypes,
          level: this.level + 1,
        })
      })

      this.#expandable = new Expandable({
        expanded: this.#expanded,
        children: this.#children.map((child) => child.element),
        type: this.type,
        onExpand: () => {
          this.#expandable.expanded = true
        },
      })

      this.element.append(this.#expandable.element)
    } else {
      let valueType = ""
      if (this.showDataTypes) {
        // render value if not an object or array
        valueType = ["nan", "NaN", "undefined", "null"].includes(this.type)
          ? ""
          : `<span class="type">${this.type}</span>`
      }

      const valueElement = Object.assign(document.createElement("span"), {
        className: `value ${this.type}`,
        innerHTML: valueType + `<span>${this.value}</span>`,
      })
      this.element.append(valueElement)
    }
  }
}

class DataRenderer {
  constructor(containerElement) {
    this.containerElement = containerElement
  }
  update({ data, expanded, indent, showDataTypes, showRoot }) {
    this.expanded = expanded
    this.indent = indent
    this.showDataTypes = showDataTypes
    this.showRoot = showRoot

    if (
      !this.json ||
      (this.data && JSON.stringify(this.data) !== JSON.stringify(data))
    ) {
      this.data = data
      this.#render()
    }
    if (this.json) {
      this.json.expanded = expanded
      this.json.indent = indent
    }
  }

  #render() {
    if (!this.data) return
    this.json = new Row(this.showRoot ? "Root" : "", this.data, {
      expanded: this.expanded,
      indent: this.indent,
      showDataTypes: this.showDataTypes,
    })

    this.containerElement.append(this.json.element)
  }
}

export default DataRenderer
