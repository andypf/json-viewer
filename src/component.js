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

// import styles from "./styles.css";
// import themes from "./themes.css";
// import { customThemeStyle, isUrl, parseJson } from "./helpers";
// import DataRenderer from "./data-renderer";

// class JsonViewer extends HTMLElement {
//   constructor() {
//     super();
//     this.indent = 2;
//     this.expanded = 1;
//     this.toolbar = false;
//     this.theme = "default-light";

//     this.#stylesContainer = document.createElement("style");
//     this.#jsonContainer = document.createElement("div");
//     this.#renderer = new DataRenderer(this.#jsonContainer);
//   }

//   #stylesContainer = null;
//   #jsonContainer = null;
//   #renderer = null;
//   #customThemeStyle = "";
//   #data = null;
//   #error = null;
//   #container = null;

//   // component attributes
//   static get observedAttributes() {
//     return ["src", "theme", "data", "indent", "expanded", "toolbar"];
//   }

//   // attribute change
//   attributeChangedCallback(property, oldValue, newValue) {
//     if (oldValue === newValue) return;
//     this[property] = newValue;

//     if (property === "theme" && newValue && newValue.indexOf("base") >= 0) {
//       try {
//         const themeProps = JSON.parse(newValue);
//         this.#customThemeStyle = customThemeStyle("custom", themeProps);
//         this.theme = "default-light custom";
//       } catch (e) {}
//     }

//     this.update();
//   }

//   set data(data) {
//     this.#data = data;
//   }

//   // load json source code via attribute, property, or content
//   #loadJsonData = async () => {
//     // #data is already presented
//     if (this.#data) return;
//     // src is unset, probably textContent icontains the json data
//     if (!this.src) {
//       await new Promise((resolve) =>
//         window.addEventListener("DOMContentLoaded", resolve)
//       );
//       if (this.textContent) {
//         try {
//           this.data = parseJson(
//             this.textContent
//               .replace(/(?:\r\n|\r|\n)/g, " ")
//               .replace(/\s+/g, " ")
//           );
//         } catch (e) {
//           console.warn(e);
//           this.#error = e.message;
//         }
//       }

//       return;
//     }

//     // src is URL
//     if (isUrl(this.src)) {
//       this.data = await fetch(this.src)
//         .then((r) => r.json())
//         .catch((e) => (this.#error = e.message));
//       return;
//     }

//     // src is json string
//     try {
//       this.data = parseJson(this.src);
//     } catch (e) {
//       console.warn(e);
//       this.#error = e.message;
//     }
//   };

//   // connect component
//   async connectedCallback() {
//     // console.log("---connected", this.data, this.theme, this.textContent)
//     await this.#loadJsonData();

//     this.#container = this.attachShadow({ mode: "closed" });
//     this.textContent = null;

//     this.#container.append(this.#stylesContainer);
//     this.#container.append(this.#jsonContainer);

//     this.update();
//   }

//   update = () => {
//     this.#stylesContainer.textContent = `${themes} ${
//       this.#customThemeStyle
//     } ${styles}`;
//     this.#jsonContainer.className = `container ${this.theme}`;

//     this.#renderer.update({
//       data: this.#data,
//       indent: this.indent,
//       expanded: this.expanded,
//     });
//   };
// }

// customElements.define("json-viewer", JsonViewer);

import styles from "./styles.css"
import { availableThemes, themeStyles, customThemeStyles } from "./themes"
import { isUrl, buildContent, parseJson } from "./data-helpers"

const DEFAULT_PARAMS = {
  indent: 2,
  expanded: 1,
  toolbar: false,
  theme: "default-light",
  data: null,
}

class JsonViewerOptions {
  #options
  #themeStyles
  #jsonData

  constructor(initialOptions = {}) {
    this.#options = { ...DEFAULT_PARAMS }
    Object.keys(initialOptions).forEach((key) => {
      this.#options[key] = initialOptions[key]
    })

    // this properties are calculated every time the data or theme is updated
    this.themeStyles = null
    this.jsonData = null

    if (this.#options.theme) {
      if (typeof this.#options.theme === "string") {
        this.themeStyles = themeStyles(this.#options.theme)
      } else {
        this.themeStyles = customThemeStyles(this.#options.theme)
      }
    }

    if (this.#options.data) {
      this.jsonData = buildContent(this.#options.data)
    }
  }

  get options() {
    return this.#options
  }

  get themeStyles() {
    return this.#themeStyles
  }

  get jsonData() {
    return this.#jsonData
  }

  static validate(key, value) {
    let parsedValue = value
    switch (key) {
      case "indent": {
        parsedValue = parseInt(value)
        //check if newParameters[key] is a number
        if (isNaN(parsedValue) || parsedValue < 0) {
          throw new Error(`Attribute ${key} should be a positive number!`)
        }

        return parsedValue
      }
      case "expanded": {
        if (value === "true") {
          parsedValue = true
        } else if (value === "false") {
          parsedValue = false
        } else {
          parsedValue = parseInt(parsedValue)
          if (isNaN(parsedValue) || parsedValue < 0) {
            throw new Error(
              `Attribute ${key} should be a boolean or a positive number!`
            )
          }
        }
        return parsedValue
      }
      case "toolbar": {
        if (value === "true") {
          parsedValue = true
        } else if (value === "false") {
          parsedValue = false
        } else {
          throw new Error(`Attribute ${key} should be a boolean!`)
        }
        return parsedValue
      }
      case "theme": {
        if (typeof value === "string") {
          if (availableThemes.indexOf(value) === -1) {
            throw new Error(
              `Attribute ${key} should be one of ${availableThemes.join(", ")}!`
            )
          }
        } else if (typeof value !== "object") {
          throw new Error(`Attribute ${key} should be a string or an object!`)
        }
        return parsedValue
      }
      case "data": {
        if (
          !isUrl(parsedValue) &&
          typeof parsedValue !== "object" &&
          typeof parsedValue !== "string"
        ) {
          throw new Error(
            `Attribute ${key} should be a string, an object or a URL!`
          )
        }
        return parsedValue
      }
      default: {
        throw new Error(`Attribute ${key} is not supported!`)
      }
    }
  }

  update(key, value) {
    const currentValue = this.#options[key]
    const newValue = JsonViewerOptions.validate(key, value)
    if (currentValue === newValue) return false

    this.#options[key] = newValue
    return newValue
  }
}

const parseAndValidateAttribute = (key, value) => {
  let parsedValue = value

  switch (key) {
    case "indent": {
      parsedValue = parseInt(value)
      //check if newParameters[key] is a number
      if (isNaN(parsedValue) || parsedValue < 0) {
        throw new Error(`Attribute ${key} should be a positive number!`)
      }
      return parsedValue
    }
    case "expanded": {
      if (value === "true") {
        parsedValue = true
      } else if (value === "false") {
        parsedValue = false
      } else {
        parsedValue = parseInt(parsedValue)
        if (isNaN(parsedValue) || parsedValue < 0) {
          throw new Error(
            `Attribute ${key} should be a boolean or a positive number!`
          )
        }
      }
      return parsedValue
    }
    case "toolbar": {
      if (value === "true") {
        parsedValue = true
      } else if (value === "false") {
        parsedValue = false
      } else {
        throw new Error(`Attribute ${key} should be a boolean!`)
      }
      return parsedValue
    }
    case "theme": {
      if (typeof value === "string") {
        if (availableThemes.indexOf(value) === -1) {
          throw new Error(
            `Attribute ${key} should be one of ${availableThemes.join(", ")}!`
          )
        }
      } else if (typeof value !== "object") {
        throw new Error(`Attribute ${key} should be a string or an object!`)
      }
      return parsedValue
    }
    case "data": {
      if (
        !isUrl(parsedValue) &&
        typeof parsedValue !== "object" &&
        typeof parsedValue !== "string"
      ) {
        throw new Error(
          `Attribute ${key} should be a string, an object or a URL!`
        )
      }
      return parsedValue
    }
    default: {
      return parsedValue
    }
  }
}

class JsonViewer extends HTMLElement {
  #themeStyles
  #container
  #params

  constructor() {
    super()

    this.#params = { ...DEFAULT_PARAMS }

    this.#themeStyles = document.createElement("style")
    this.#container = document.createElement("div")

    // Attach a shadow DOM to encapsulate the component
    const shadowRoot = this.attachShadow({ mode: "closed" })
    const basicStyles = document.createElement("style")
    basicStyles.textContent = `${styles}`

    shadowRoot.appendChild(basicStyles)
    shadowRoot.appendChild(this.#themeStyles)
    shadowRoot.appendChild(this.#container)
  }

  // component attributes
  static get observedAttributes() {
    return Object.keys(DEFAULT_PARAMS)
  }

  static get allowedAttributes() {
    return ["id"].concat(JsonViewer.observedAttributes)
  }

  #warn = (...args) => {
    console.warn(`JsonViewer ${this.id ? `(${this.id})` : ""}:`, ...args)
  }

  #updateParam = async (key, value) => {
    try {
      value = parseAndValidateAttribute(key, value)
      const oldValue = this.#params[key]

      if (oldValue === value) return

      if (key === "theme") {
        if (typeof value === "string") {
          this.#themeStyles.textContent = themeStyles(value)
        } else {
          this.#themeStyles.textContent = customThemeStyles(JSON.parse(value))
        }
      } else if (key === "data") {
        let content = value

        if (isUrl(value)) {
          content = await fetch(value).then((r) => r.json())
        } else if (typeof value === "string") {
          content = parseJson(value)
        }

        this.#params.content = buildContent(content)
        console.log("================content", this.#params.content)
      }
      this.#params = { ...this.#params, [key]: value }

      this.#render()
    } catch (e) {
      this.#warn(e.message)
    }
  }

  set theme(v) {
    this.#updateParam("theme", v)
  }
  set toolbar(v) {
    this.#updateParam("toolbar", v)
  }
  set indent(v) {
    this.#updateParam("indent", v)
  }
  set expanded(v) {
    this.#updateParam("expanded", v)
  }
  set data(v) {
    this.#updateParam("data", v)
  }

  get params() {
    return this.#params
  }

  connectedCallback() {
    console.log("=====Connected=====")

    window.addEventListener("DOMContentLoaded", () => {
      this.#updateParam("data", this.textContent)
      this.textContent = ""
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("=====Changed=====")
    console.log(name, oldValue, newValue)
    // filter out not allowed attributes
    if (JsonViewer.allowedAttributes.indexOf(name) > -1) {
      this.#updateParam(name, newValue)
    } else {
      this.#warn(`Attribute ${name} is not supported and will be ignored!`)
      this.removeAttribute(name)
    }
  }

  #render = () => {
    console.log("====================RENDER")
    console.log(this.#params)
  }
}

customElements.define("json-viewer", JsonViewer)
