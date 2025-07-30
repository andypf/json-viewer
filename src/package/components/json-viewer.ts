import { DataParser } from "../utils/data-parser"
import { Toolbar } from "./toolbar"

export class JsonViewer extends HTMLElement {
  static get observedAttributes() {
    return [
      "indent",
      "expanded",
      "theme",
      "show-data-types",
      "show-toolbar",
      "expand-icon-type",
      "show-copy",
      "show-size",
      "show-loading-status",
      "show-errors",
      "data",
    ]
  }

  private dataParser: DataParser | null = null
  private toolbar: Toolbar | null = null

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  // Number attributes
  get indent(): number {
    return parseInt(this.getAttribute("indent") ?? "2")
  }
  set indent(value: number) {
    this.setAttribute("indent", value.toString())
  }

  // Boolean attributes
  get expanded(): boolean {
    return this.hasAttribute("expanded") && this.getAttribute("expanded") !== "false"
  }
  set expanded(value: boolean) {
    if (value) {
      this.setAttribute("expanded", "")
    } else {
      this.removeAttribute("expanded")
    }
  }

  get showDataTypes(): boolean {
    return this.hasAttribute("show-data-types") && this.getAttribute("show-data-types") !== "false"
  }
  set showDataTypes(value: boolean) {
    this.setAttribute("show-data-types", value.toString())
  }

  get showLoadingStatus(): boolean {
    return this.hasAttribute("show-loading-status") && this.getAttribute("show-loading-status") !== "false"
  }
  set showLoadingStatus(value: boolean) {
    this.setAttribute("show-loading-status", value.toString())
  }
  get showErrors(): boolean {
    return this.hasAttribute("show-errors") && this.getAttribute("show-errors") !== "false"
  }
  set showErrors(value: boolean) {
    this.setAttribute("show-errors", value.toString())
  }

  get showToolbar(): boolean {
    return this.hasAttribute("show-toolbar") && this.getAttribute("show-toolbar") !== "false"
  }
  set showToolbar(value: boolean) {
    this.setAttribute("show-toolbar", value.toString())
  }

  get showCopy(): boolean {
    return this.hasAttribute("show-copy") && this.getAttribute("show-copy") !== "false"
  }
  set showCopy(value: boolean) {
    this.setAttribute("show-copy", value.toString())
  }

  get showSize(): boolean {
    return this.hasAttribute("show-size") && this.getAttribute("show-size") !== "false"
  }
  set showSize(value: boolean) {
    this.setAttribute("show-size", value.toString())
  }

  // String attributes
  get theme(): string {
    return this.getAttribute("theme") ?? "default-light"
  }
  set theme(value: string) {
    this.setAttribute("theme", value)
  }

  get expandIconType(): string {
    return this.getAttribute("expand-icon-type") ?? "arrow"
  }
  set expandIconType(value: string) {
    this.setAttribute("expand-icon-type", value)
  }

  // Data attribute - with fallback to content
  get data(): string {
    // Priority: attribute > textContent > default
    const attrData = this.getAttribute("data")
    if (attrData) {
      return attrData
    }

    const contentData = this.getContentData()
    return contentData || "{}"
  }

  set data(value: string | object) {
    if (typeof value === "string") {
      this.setAttribute("data", value)
    } else {
      this.setAttribute("data", JSON.stringify(value))
    }
    // Clear content when setting via property/attribute
    this.textContent = ""
  }

  // Get JSON from element content
  private getContentData(): string {
    const content = this.textContent?.trim()
    return content || ""
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  connectedCallback() {
    this.render()

    // Watch for content changes
    this.observer = new MutationObserver(() => {
      // Only react to content changes if no data attribute is set
      if (!this.hasAttribute("data")) {
        this.render()
      }
    })

    this.observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  private observer?: MutationObserver

  private async render() {
    if (!this.shadowRoot) return

    // Create or update parser
    if (!this.dataParser) {
      this.dataParser = new DataParser(this.data)
    } else {
      this.dataParser.updateData(this.data)
    }

    if (this.dataParser.isUrlData && this.showLoadingStatus) {
      this.shadowRoot.innerHTML = `
        <div style="color: gray; padding: 8px;">
          Loading data from URL...
        </div>
      `
    }
    const result = await this.dataParser.getParsedData()

    if (this.showErrors && (result.error || !result.data)) {
      this.shadowRoot.innerHTML = `
        <div style="color: red; padding: 8px;">
          Invalid JSON data
          <details style="margin-top: 8px;">
            <summary>Raw data:</summary>
            <pre style="background: #f5f5f5; padding: 8px; margin-top: 4px;">${this.data}</pre>
            <p>Error: ${result.error || "Unknown error"}</p>
          </details>
        </div>
      `
      return
    }

    const parsedData = result.data

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Courier New', monospace;
        }
        
        :host([theme="dark"]) {
          background: #1e1e1e;
          color: #d4d4d4;
        }
        
        .json-viewer {
          padding: ${this.indent * 4}px;
        }
        
        .toolbar {
          display: ${this.showToolbar ? "flex" : "none"};
          gap: 8px;
          margin-bottom: 8px;
          padding: 8px;
          background: #f5f5f5;
          border-radius: 4px;
        }
        
        .copy-button {
          display: ${this.showCopy ? "inline-block" : "none"};
        }
        
        .size-info {
          display: ${this.showSize ? "inline-block" : "none"};
          font-size: 0.9em;
          color: #666;
        }

        .data-source {
          font-size: 0.8em;
          color: #888;
          font-style: italic;
        }
      </style>
      
      <div class="json-viewer" data-theme="${this.theme}">
        ${this.renderJson(parsedData)}
      </div>
    `
  }

  private renderJson(data: any): string {
    return `<pre>${JSON.stringify(data, null, this.indent)}</pre>`
  }
}
