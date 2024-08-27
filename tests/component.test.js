import "../src/component.js"

globalThis.console.warn = jest.fn()

describe("JsonViewer", () => {
  it("should be defined", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    expect(jsonViewer).toBeDefined()
  })

  it("should contain shadow root", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    expect(jsonViewer.shadowRoot).toBeDefined()
  })

  it("should contain styles", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    expect(jsonViewer.shadowRoot.querySelector("style")).toBeDefined()
  })

  it("should set theme", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.theme = "default-light"
    expect(jsonViewer.options.theme).toEqual("default-light")
  })

  it("should log warning for invalid theme", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.theme = "test"
    expect(jsonViewer.options.theme).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(expect.anything(), expect.stringContaining("test not found"))
  })

  it("should set indent", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.indent = 4
    expect(jsonViewer.options.indent).toEqual(4)
  })
  it("should set indent as string", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.indent = "4"
    expect(jsonViewer.options.indent).toEqual(4)
  })
  it("should warn for invalid indent", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.indent = "test"
    expect(jsonViewer.options.indent).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(expect.anything(), expect.stringContaining("should be a positive number"))
  })

  it("should set expanded as number", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expanded = 2
    expect(jsonViewer.options.expanded).toEqual(2)
  })

  it("should set expanded as boolean", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expanded = true
    expect(jsonViewer.options.expanded).toEqual(true)
  })
  it("should set expanded number as string", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expanded = "2"
    expect(jsonViewer.options.expanded).toEqual(2)
  })
  it("should set expanded boolean as string", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expanded = "true"
    expect(jsonViewer.options.expanded).toEqual(true)
  })

  it("should warn for invalid expanded", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expanded = "test"
    expect(jsonViewer.options.expanded).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be a boolean or a positive number")
    )
  })

  it("should set showDataTypes", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showDataTypes = false
    expect(jsonViewer.options.showDataTypes).toEqual(false)
  })
  it("should set showDataTypes as string", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showDataTypes = "false"
    expect(jsonViewer.options.showDataTypes).toEqual(false)
  })
  it("should warn for invalid showDataTypes", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showDataTypes = "test"
    expect(jsonViewer.options.showDataTypes).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(expect.anything(), expect.stringContaining("should be a boolean"))
  })

  it("should set expandIconType", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expandIconType = "arrow"
    expect(jsonViewer.options.expandIconType).toEqual("arrow")
  })
  it("should warn for invalid expandIconType", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.expandIconType = "test"
    expect(jsonViewer.options.expandIconType).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be one of arrow, square, circle")
    )
  })

  it("should set showCopy", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showCopy = false
    expect(jsonViewer.options.showCopy).toEqual(false)
  })

  it("should set showCopy as string", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showCopy = "false"
    expect(jsonViewer.options.showCopy).toEqual(false)
  })

  it("should warn for invalid showCopy", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.showCopy = "test"
    expect(jsonViewer.options.showCopy).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(expect.anything(), expect.stringContaining("should be a boolean"))
  })

  // It seems that the showDetails button is always in the active state by default,
  // even when json-viewer is initialized with show-data-types="false" and
  // show-size="false". In that scenario the button then requires two clicks
  // before it has the expected toggling effect.
  it("should not show details if show-data-types and show.size are false", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.setAttribute("show-toolbar", "true")
    jsonViewer.setAttribute("show-data-types", "false")
    jsonViewer.setAttribute("show-size", "false")
    expect(jsonViewer.shadowRoot.querySelector(".icon.info").classList).not.toContain("active")
  })

  it("should show details if show-data-types is true and show.size is false", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.setAttribute("show-toolbar", "true")
    jsonViewer.setAttribute("show-data-types", "true")
    jsonViewer.setAttribute("show-size", "false")
    expect(jsonViewer.shadowRoot.querySelector(".icon.info").classList).toContain("active")
  })

  it("should show details if show-data-types is false and show.size is true", () => {
    const jsonViewer = document.createElement("andypf-json-viewer")
    jsonViewer.setAttribute("show-toolbar", "true")
    jsonViewer.setAttribute("show-data-types", "false")
    jsonViewer.setAttribute("show-size", "true")
    expect(jsonViewer.shadowRoot.querySelector(".icon.info").classList).toContain("active")
  })
})
