// class JsonObject {
//   constructor(data, { expanded, indent }) {
//     this.data = data
//     this.expanded = expanded
//     this.indent = indent
// //     this.#element = document.createElement('div')
// //     this.#element = document.createElement('input');
// // Object.assign(colInput,{
// //     type: 'number',
// //     min: 1,
// //     value: this.config.cols,
// //     onchange: this.updateSetting
// // });
// //   }

//   render() {

//   }
// }
import { dataType } from "./helpers"

class Row {
  constructor(key, value, { expanded, indent, level = 0 }) {
    this.key = key
    this.value = value
    this.#expanded = expanded
    this.#indent = indent
    this.#level = level
    this.type = dataType(value).toLowerCase()
    this.#isExpanded = expanded === true || expanded >= level
    this.#render()
  }
  #element = null
  #indent = null
  #expanded = null
  #isExpanded = false
  #level = 0
  #children = []

  set expanded(expanded) {
    this.#expanded = expanded
  }
  set indent(indent) {
    this.#indent = indent
  }
  get element() {
    return this.#element
  }

  #setIsExpand(value) {
    this.#isExpanded = value
  }

  #render() {
    this.#element = document.createElement("div")
    this.#element.className = "object-row"
    const type = dataType(this.value).toLowerCase()

    // Render key (name) and colon
    if (this.key || this.key === 0) {
      const keyElem = Object.assign(document.createElement("span"), {
        className: "key",
        textContent: `"${this.key}"`,
      })
      const colonElem = Object.assign(document.createElement("span"), {
        className: "colon",
        textContent: ":",
      })

      this.#element.append(keyElem)
      this.#element.append(colonElem)
    }

    if (type === "object" || type === "array") {
      const braceOpenElem = Object.assign(document.createElement("span"), {
        className: "brace",
        textContent: type === "array" ? "[" : "{",
      })
      this.#element.append(braceOpenElem)

      if (this.#isExpanded) {
        //SUB ROWS if expanded
        const subRows =
          type === "array"
            ? this.value.map((item, index) => ({ key: index, value: item }))
            : Object.keys(this.value).map((key) => ({
                key,
                value: this.value[key],
              }))
        subRows.forEach(({ key, value }) => {
          const child = new Row(key, value, {
            expanded: this.expanded,
            indent: this.indent,
          })
          this.#children.push(child)
          this.#element.append(child.element)
        })
      }
      //################## END SUB ROWS

      if (!this.#isExpanded) {
        const ellipsisElement = Object.assign(document.createElement("span"), {
          className: "ellipsis",
          textContent: "...",
          onclick: () => {
            //alert("clicked")
          },
        })
        this.#element.appendChild(ellipsisElement)
      }
      // render closed brace
      const braceCloseElem = Object.assign(document.createElement("span"), {
        className: "brace",
        textContent: type === "array" ? "]" : "}",
      })
      this.#element.append(braceCloseElem)
    } else {
      // render value if not an object or array
      const typeElement = ["nan", "undefined", "null"].includes(type)
        ? ""
        : `<span class="type">${type}</span>`
      const valueElement = Object.assign(document.createElement("span"), {
        className: `value ${type}`,
        innerHTML: typeElement + `<span>${this.value}</span>`,
      })
      this.#element.append(valueElement)
    }
  }
}

class DataRenderer {
  constructor(containerElement) {
    this.containerElement = containerElement
  }
  update({ data, expanded, indent }) {
    if (
      !this.json ||
      (this.data && JSON.stringify(this.data) !== JSON.stringify(data))
    ) {
      this.data = data
      this.#render()
    }
    if (this.expanded !== expanded) {
      this.expanded = expanded
      if (this.json) this.json.expanded = expanded
    }

    if (this.indent !== indent) {
      this.indent = indent
      if (this.json) this.json.indent = indent
    }
  }

  #render() {
    if (!this.data) return
    this.json = new Row("root", this.data, {
      expanded: this.expanded,
      indent: this.indent,
    })

    this.containerElement.append(this.json.element)
  }
}

export default DataRenderer
