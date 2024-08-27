// /**
//  * This component supports three ways to pass the source JSON:
//  * 1. via the "json" attribute,
//  *    <andypf-json-viewer json='{"name": "test"}'></andypf-json-viewer>
//  * 2. via the "json" property,
//  *    const jsonViewer = document.createElement("json-viewer");
//  *    jsonViewer.json = {name: "test"}
//  * 3. via content,
//  *    <andypf-json-viewer>{"name": "test"}</andypf-json-viewer>
//  **/

//#########################################NEW
import styles from "./styles.css"
import { themeStyles } from "./themes"
import { isUrl } from "./data-helpers"
import {
  validateBoolean,
  validateBooleanOrPositiveNumber,
  validatePositiveNumber,
  validateStringOrJson,
  validateString,
} from "./validator"
import Renderer from "./renderer/container"

const DEFAULT_PARAMS = {
  indent: 2,
  expanded: 1,
  theme: "default-light",
  showDataTypes: true,
  showToolbar: false,
  expandIconType: "arrow",
  showCopy: true,
  showSize: true,
  data: null,
}

class JsonViewer extends HTMLElement {
  #themeStylesContainer
  #options
  #contentData
  #renderer

  constructor() {
    super()

    this.#options = { ...DEFAULT_PARAMS }

    this.#themeStylesContainer = document.createElement("style")

    // Attach a shadow DOM to encapsulate the component
    const shadowRoot = this.attachShadow({ mode: "open" })
    const basicStyles = document.createElement("style")
    basicStyles.textContent = `${styles}`

    shadowRoot.appendChild(basicStyles)
    shadowRoot.appendChild(this.#themeStylesContainer)

    // set default theme
    this.theme = this.#options.theme
    // initialize renderer
    this.#renderer = new Renderer(shadowRoot, this.#options)
  }

  // component attributes
  static get observedAttributes() {
    // convert camelCase to kebab-case
    return Object.keys(DEFAULT_PARAMS).map((k) => k.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())
  }

  static allowedAttributes = ["id"].concat(JsonViewer.observedAttributes)

  #warn = (...args) => {
    console.warn(`JsonViewer${this.id ? ` (${this.id})` : ""}:`, ...args)
  }

  #validateAndUpdate = (propName, value, validatorFunc, allowedValues) => {
    try {
      value = validatorFunc(value)
      if (allowedValues && !allowedValues.includes(value)) {
        throw new Error(`should be one of ${allowedValues.join(", ")}`)
      }
      if (this.#options[propName] === value) return

      this.#options[propName] = value
      this.#render()
    } catch (e) {
      this.#warn(`Attribute ${propName}: ${e.message}`)
    }
  }

  set showDataTypes(value) {
    this.#validateAndUpdate("showDataTypes", value, validateBoolean)
  }

  set showToolbar(value) {
    this.#validateAndUpdate("showToolbar", value, validateBoolean)
  }

  set indent(newIndent) {
    this.#validateAndUpdate("indent", newIndent, validatePositiveNumber)
  }

  set expandIconType(name) {
    this.#validateAndUpdate("expandIconType", name, validateString, ["arrow", "square", "circle"])
  }

  set expanded(newExpanded) {
    this.#validateAndUpdate("expanded", newExpanded, validateBooleanOrPositiveNumber)
  }

  set showSize(newShowSize) {
    this.#validateAndUpdate("showSize", newShowSize, validateBoolean)
  }

  set showCopy(showCopy) {
    this.#validateAndUpdate("showCopy", showCopy, validateBoolean)
  }

  // validate and set theme
  // theme can be a string or an object
  // validationg theme is more complex than other attributes
  set theme(newTheme) {
    try {
      newTheme = validateStringOrJson(newTheme)
      // do nothing if the theme is the same or theme container is empty
      if (this.#options.theme === newTheme && this.#themeStylesContainer.textContent !== "") return

      this.#themeStylesContainer.textContent = themeStyles(newTheme)
      this.#options.theme = newTheme
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
      this.#options.data = newDataString

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
    return this.#options
  }

  connectedCallback() {
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
    // console.log("====================RENDER");

    this.#renderer.update({
      data: this.#contentData,
      expanded: this.#options.expanded,
      expandIconType: this.#options.expandIconType,
      indent: this.#options.indent,
      showDataTypes: this.#options.showDataTypes,
      showToolbar: this.#options.showToolbar,
      showSize: this.#options.showSize,
      showCopy: this.#options.showCopy,
    })
  }
}

if (!customElements.get("andypf-json-viewer")) {
  customElements.define("andypf-json-viewer", JsonViewer)
}
