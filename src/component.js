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

  // validate and set theme
  set theme(newTheme) {
    let styles
    if (typeof newTheme === "string") {
      if (this.#options.theme === newTheme) return
      if (availableThemes.indexOf(newTheme) < 0) {
        this.#warn(
          `Theme ${newTheme} is not supported! Supported themes are: 
            availableThemes ${availableThemes}`
        )
        return
      }
      styles = themeStyles(newTheme)
      this.#options.theme = newTheme
    } else if (typeof newTheme === "object") {
      const newThemeString = JSON.stringify(newTheme)
      if (this.#options.theme === newThemeString) return
      styles = customThemeStyles(newTheme, "custom")
      this.#options.theme = newThemeString
      newValue = "custom"
    } else {
      this.#warn(`Attribute theme should be a string or an object!`)
      return
    }

    if (styles) {
      this.#themeStylesContainer.textContent = styles
      this.#dataContainer.className = `container ${newTheme}`
    }
  }

  set toolbar(value) {
    if (value === "true") value = true
    else if (value === "false") value = false

    if (typeof value !== "boolean") {
      this.#warn(`Attribute toolbar should be a boolean!`)
      return
    }

    if (this.#options.toolbar === value) return

    this.#options.toolbar = value
    this.#render()
  }

  set showDataTypes(value) {
    if (value === "true") value = true
    else if (value === "false") value = false
    if (typeof value !== "boolean") {
      this.#warn(`Attribute showDataTypes should be a boolean!`)
      return
    }

    if (this.#options.showDataTypes === value) return

    this.#options.showDataTypes = value
    this.#render()
  }

  set showRoot(value) {
    if (value === "true") value = true
    else if (value === "false") value = false
    if (typeof value !== "boolean") {
      this.#warn(`Attribute showRoot should be a boolean!`)
      return
    }

    if (this.#options.showRoot === value) return

    this.#options.showRoot = value
    this.#render()
  }

  set indent(newIndent) {
    if (typeof newIndent === "string") {
      newIndent = parseInt(newIndent)
    }
    if (isNaN(newIndent) || newIndent < 0) {
      this.#warn(`Attribute indent should be a positive number!`)
      return
    }

    if (this.#options.indent === newIndent) return
    this.#options.indent = newIndent
    this.#render()
  }

  set expanded(newExpanded) {
    if (typeof newExpanded !== "boolean") {
      if (newExpanded === "true") newExpanded = true
      else if (newExpanded === "false") newExpanded = false
      else {
        newExpanded = parseInt(newExpanded)
        if (isNaN(newExpanded) || newExpanded < 0) {
          this.#warn(
            `Attribute expanded should be a boolean or a positive number!`
          )
          return
        }
      }
    }
    if (this.#options.expanded === newExpanded) return
    this.#options.expanded = newExpanded
    this.#render()
  }

  set data(newData) {
    const getDataPromise = new Promise((resolve, reject) => {
      if (typeof newData === "string") {
        if (this.#options.data === newData) return
        this.#options.data = newData

        if (isUrl(newData)) {
          fetch(newData)
            .then((r) => r.json())
            .then((data) => resolve(data))
            .catch((e) => reject(e))
        } else {
          resolve(parseJson(newData))
        }
      } else if (typeof newData === "object") {
        const newDataString = JSON.stringify(newData)
        if (this.#options.data === newDataString) return
        this.#options.data = newDataString
        resolve(newData)
      } else {
        reject(`Attribute data should be a string or an object!`)
      }
    })

    getDataPromise
      .then((data) => {
        this.#contentData = data //buildContent(data);
        this.#render()
      })
      .catch((e) => {
        this.#warn(e)
      })
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
