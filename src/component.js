// /**
//  * This component supports three ways to pass the source JSON:
//  * 1. via the "json" attribute,
//  *    <json-viewer json='{"name": "test"}'></json-viewer>
//  * 2. via the "json" property,
//  *    const jsonViewer = document.createElement("json-viewer");
//  *    jsonViewer.json = {name: "test"}
//  * 3. via content,
//  *    <json-viewer>{"name": "test"}</json-viewer>
//  **/

//#########################################NEW
import styles from "./styles.css"
import { availableThemes, themeStyles, customThemeStyles } from "./themes"
import { parseJson, isUrl } from "./data-helpers"
import {
  validateBoolean,
  validateBooleanOrPositiveNumber,
  validatePositiveNumber,
  validateStringOrJson,
} from "./validator"
import Renderer from "./renderer"

const DEFAULT_PARAMS = {
  indent: 2,
  expanded: 1,
  showDataTypes: true,
  showRoot: false,
  toolbar: false,
  theme: null,
  data: null,
}

class JsonViewer extends HTMLElement {
  #themeStylesContainer
  #dataContainer
  #options
  #contentData
  #renderer

  constructor() {
    super()

    this.#options = { ...DEFAULT_PARAMS }

    this.#themeStylesContainer = document.createElement("style")
    this.#dataContainer = document.createElement("div")

    // Attach a shadow DOM to encapsulate the component
    const shadowRoot = this.attachShadow({ mode: "closed" })
    const basicStyles = document.createElement("style")
    basicStyles.textContent = `${styles}`

    shadowRoot.appendChild(basicStyles)
    shadowRoot.appendChild(this.#themeStylesContainer)
    shadowRoot.appendChild(this.#dataContainer)

    // set default initial theme
    this.theme = "default-light"

    // initialize renderer
    this.#renderer = new Renderer(this.#dataContainer)
  }

  // component attributes
  static get observedAttributes() {
    // convert camelCase to kebab-case
    return Object.keys(DEFAULT_PARAMS).map((k) =>
      k.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
    )
  }

  static allowedAttributes = ["id"].concat(JsonViewer.observedAttributes)

  #warn = (...args) => {
    console.warn(`JsonViewer ${this.id ? `(${this.id})` : ""}:`, ...args)
  }

  #validateAndUpdate = (propName, value, validatorFunc) => {
    try {
      value = validatorFunc(value)
      if (this.#options[propName] === value) return

      this.#options[propName] = value
      this.#render()
    } catch (e) {
      this.#warn(`Attribute ${propName}: ${e.message}`)
    }
  }

  set toolbar(value) {
    this.#validateAndUpdate("toolbar", value, validateBoolean)
  }

  set showDataTypes(value) {
    this.#validateAndUpdate("showDataTypes", value, validateBoolean)
  }

  set showRoot(value) {
    this.#validateAndUpdate("showRoot", value, validateBoolean)
  }

  set indent(newIndent) {
    this.#validateAndUpdate("indent", newIndent, validatePositiveNumber)
  }

  set expanded(newExpanded) {
    this.#validateAndUpdate(
      "expanded",
      newExpanded,
      validateBooleanOrPositiveNumber
    )
  }

  // validate and set theme
  // theme can be a string or an object
  // validationg theme is more complex than other attributes
  set theme(newTheme) {
    try {
      newTheme = validateStringOrJson(newTheme)
      // build a string from the value to compare with the current theme
      const newThemeString = JSON.stringify(newTheme)
      // do nothing if the theme is the same
      if (this.#options.theme === newThemeString) return

      let cssClass = newTheme
      let styles
      // check if the theme is a custom theme
      if (typeof newTheme === "string") {
        if (availableThemes.indexOf(newTheme) < 0) {
          this.#warn(
            `Theme ${newTheme} is not supported! Supported themes are: 
              availableThemes ${availableThemes}`
          )
          return
        }
        styles = themeStyles(newTheme)
      } else if (typeof newTheme === "object") {
        styles = customThemeStyles(newTheme, "custom")
        cssClass = "custom"
      }

      this.#options.theme = newThemeString
      this.#themeStylesContainer.textContent = styles
      this.#dataContainer.className = `container ${cssClass}`
    } catch (e) {
      this.#warn(`Attribute theme: ${e.message}`)
    }
  }

  // validate and set data
  // data can be a string or an object
  // validating data is more complex than other attributes
  set data(newData) {
    try {
      newData = validateStringOrJson(newData)
      // build a string from the value to compare with the current data
      const newDataString = JSON.stringify(newData)
      // do nothing if the data is the same
      if (this.#options.data === newDataString) return

      if (isUrl(newData)) {
        fetch(newData)
          .then((r) => r.json())
          .then((data) => {
            this.#contentData = data
            this.#render()
          })
      } else {
        this.#contentData = newData
        this.#render()
      }
    } catch (e) {
      this.#warn(`Attribute data: ${e.message}`)
    }
  }

  get options() {
    return this.#options.options
  }

  connectedCallback() {
    console.log("=====Connected=====")

    window.addEventListener("DOMContentLoaded", () => {
      const data = this.textContent
      this.textContent = ""
      if (data) this.data = data
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log("=====Changed=====")
    // console.log(name, oldValue, newValue)
    // filter out not allowed attributes
    if (JsonViewer.allowedAttributes.indexOf(name) > -1) {
      // convert kebab-case to camelCase
      const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      this[propName] = newValue
    } else {
      this.#warn(`Attribute ${name} is not supported and will be ignored!`)
      this.removeAttribute(name)
    }
  }

  #render = () => {
    console.log("====================RENDER")
    // // console.log("theme", this.#options.theme);
    // console.log("data", this.#options.data)
    // console.log("indent", this.#options.indent)
    // console.log("expanded", this.#options.expanded)
    // console.log("showDataTypes", this.#options.showDataTypes)
    // console.log("toolbar", this.#options.toolbar)
    // console.log("content", this.#contentData)
    // console.log(JsonViewer.allowedAttributes)
    if (!this.#contentData) return

    this.#renderer.update({
      data: this.#contentData,
      expanded: this.#options.expanded,
      indent: this.#options.indent,
      showDataTypes: this.#options.showDataTypes,
      showRoot: this.#options.showRoot,
    })
  }
}

customElements.define("json-viewer", JsonViewer)
