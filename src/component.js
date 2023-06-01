/**
 * This component supports three ways to pass the source JSON:
 * 1. via the "json" attribute,
 *    <json-viewer json='{"name": "test"}'></json-viewer>
 * 2. via the "json" property,
 *    const jsonViewer = document.createElement("json-viewer");
 *    jsonViewer.json = {name: "test"}
 * 3. via content,
 *    <json-viewer>{"name": "test"}</json-viewer>
 **/

import styles from "./styles.css"
import themes from "./themes.css"
import { customThemeStyle, isUrl, parseJson } from "./helpers"
import DataRenderer from "./data-renderer"

class JsonViewer extends HTMLElement {
  constructor() {
    super()
    this.indent = 2
    this.expanded = 1
    this.toolbar = false
    this.theme = "default-light"

    this.#stylesContainer = document.createElement("style")
    this.#jsonContainer = document.createElement("div")
    this.#renderer = new DataRenderer(this.#jsonContainer)
  }

  #stylesContainer = null
  #jsonContainer = null
  #renderer = null
  #customThemeStyle = ""
  #data = null
  #error = null
  #container = null

  // component attributes
  static get observedAttributes() {
    return ["src", "theme", "data", "indent", "expanded", "toolbar"]
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return
    this[property] = newValue

    if (property === "theme" && newValue && newValue.indexOf("base") >= 0) {
      try {
        const themeProps = JSON.parse(newValue)
        this.#customThemeStyle = customThemeStyle("custom", themeProps)
        this.theme = "default-light custom"
      } catch (e) {}
    }

    this.update()
  }

  set data(data) {
    this.#data = data
  }

  // load json source code via attribute, property, or content
  #loadJsonData = async () => {
    // #data is already presented
    if (this.#data) return
    // src is unset, probably textContent icontains the json data
    if (!this.src) {
      await new Promise((resolve) =>
        window.addEventListener("DOMContentLoaded", resolve)
      )
      if (this.textContent) {
        try {
          this.data = parseJson(
            this.textContent
              .replace(/(?:\r\n|\r|\n)/g, " ")
              .replace(/\s+/g, " ")
          )
        } catch (e) {
          console.warn(e)
          this.#error = e.message
        }
      }

      return
    }

    // src is URL
    if (isUrl(this.src)) {
      this.data = await fetch(this.src)
        .then((r) => r.json())
        .catch((e) => (this.#error = e.message))
      return
    }

    // src is json string
    try {
      this.data = parseJson(this.src)
    } catch (e) {
      console.warn(e)
      this.#error = e.message
    }
  }

  // connect component
  async connectedCallback() {
    // console.log("---connected", this.data, this.theme, this.textContent)
    await this.#loadJsonData()

    this.#container = this.attachShadow({ mode: "closed" })
    this.textContent = null

    this.#container.append(this.#stylesContainer)
    this.#container.append(this.#jsonContainer)

    this.update()
  }

  update = () => {
    this.#stylesContainer.textContent = `${themes} ${
      this.#customThemeStyle
    } ${styles}`
    this.#jsonContainer.className = `container ${this.theme}`

    this.#renderer.update({
      data: this.#data,
      indent: this.indent,
      expanded: this.expanded,
    })
  }
}

customElements.define("json-viewer", JsonViewer)
