import "../src/component.js"

globalThis.console.warn = jest.fn()

describe("JsonViewer", () => {
  it("should be defined", () => {
    const jsonViewer = document.createElement("json-viewer")
    expect(jsonViewer).toBeDefined()
  })

  it("should contain shadow root", () => {
    const jsonViewer = document.createElement("json-viewer")
    expect(jsonViewer.shadowRoot).toBeDefined()
  })

  it("should contain styles", () => {
    const jsonViewer = document.createElement("json-viewer")
    expect(jsonViewer.shadowRoot.querySelector("style")).toBeDefined()
  })

  it("should set theme", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.theme = "default-light"
    expect(jsonViewer.options.theme).toEqual("default-light")
  })

  it("should log warning for invalid theme", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.theme = "test"
    expect(jsonViewer.options.theme).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("test not found")
    )
  })

  it("should set indent", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.indent = 4
    expect(jsonViewer.options.indent).toEqual(4)
  })
  it("should set indent as string", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.indent = "4"
    expect(jsonViewer.options.indent).toEqual(4)
  })
  it("should warn for invalid indent", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.indent = "test"
    expect(jsonViewer.options.indent).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be a positive number")
    )
  })

  it("should set expanded as number", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expanded = 2
    expect(jsonViewer.options.expanded).toEqual(2)
  })

  it("should set expanded as boolean", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expanded = true
    expect(jsonViewer.options.expanded).toEqual(true)
  })
  it("should set expanded number as string", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expanded = "2"
    expect(jsonViewer.options.expanded).toEqual(2)
  })
  it("should set expanded boolean as string", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expanded = "true"
    expect(jsonViewer.options.expanded).toEqual(true)
  })

  it("should warn for invalid expanded", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expanded = "test"
    expect(jsonViewer.options.expanded).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be a boolean or a positive number")
    )
  })

  it("should set showDataTypes", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showDataTypes = false
    expect(jsonViewer.options.showDataTypes).toEqual(false)
  })
  it("should set showDataTypes as string", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showDataTypes = "false"
    expect(jsonViewer.options.showDataTypes).toEqual(false)
  })
  it("should warn for invalid showDataTypes", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showDataTypes = "test"
    expect(jsonViewer.options.showDataTypes).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be a boolean")
    )
  })

  // it("should set showToolbar", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.showToolbar = true
  //   expect(jsonViewer.options.showToolbar).toEqual(true)
  // })
  // it("should set showToolbar as string", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.showToolbar = "true"
  //   expect(jsonViewer.options.showToolbar).toEqual(true)
  // })
  // it("should warn for invalid showToolbar", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.showToolbar = "test"
  //   expect(jsonViewer.options.showToolbar).not.toEqual("test")
  //   expect(console.warn).toHaveBeenCalledWith(
  //     expect.anything(),
  //     expect.stringContaining("should be a boolean")
  //   )
  // })

  it("should set expandIconType", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expandIconType = "arrow"
    expect(jsonViewer.options.expandIconType).toEqual("arrow")
  })
  it("should warn for invalid expandIconType", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.expandIconType = "test"
    expect(jsonViewer.options.expandIconType).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be one of arrow, square, circle")
    )
  })

  it("should set showCopy", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showCopy = false
    expect(jsonViewer.options.showCopy).toEqual(false)
  })

  it("should set showCopy as string", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showCopy = "false"
    expect(jsonViewer.options.showCopy).toEqual(false)
  })

  it("should warn for invalid showCopy", () => {
    const jsonViewer = document.createElement("json-viewer")
    jsonViewer.showCopy = "test"
    expect(jsonViewer.options.showCopy).not.toEqual("test")
    expect(console.warn).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("should be a boolean")
    )
  })

  // it("should contain container div", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   expect(jsonViewer.shadowRoot.querySelector("div.container")).toBeDefined()
  // })

  // it("should not contain key element", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   expect(jsonViewer.shadowRoot.querySelector("span.key")).toBeNull()
  // })
  // it("should contain key element", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   expect(
  //     jsonViewer.shadowRoot.querySelector("span.key").textContent
  //   ).toContain("name")
  // })
  // it("should contain value element", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   expect(
  //     jsonViewer.shadowRoot.querySelector("span.value").textContent
  //   ).toContain("test")
  // })

  // it("should contain 1 expand icon", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll("span.icon.expand").length
  //   ).toEqual(1)
  // })
  // it("should contain 2 expand icons", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test", sub: ["test"] }
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll("span.icon.expand").length
  //   ).toEqual(2)
  // })

  // it("should contain 0 expanded icons", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test", sub: ["test"] }
  //   jsonViewer.expanded = 0
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll("span.icon.expand.expanded").length
  //   ).toEqual(0)
  // })
  // it("should contain 1 expanded icon", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test", sub: ["test"] }
  //   jsonViewer.expanded = 1
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll("span.icon.expand.expanded").length
  //   ).toEqual(1)
  // })
  // it("should contain 2 expanded icons", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test", sub: ["test"] }
  //   jsonViewer.expanded = 2
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll("span.icon.expand.expanded").length
  //   ).toEqual(2)
  // })

  // it("should contain show-copy", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showCopy = true
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-copy").length
  //   ).toEqual(1)
  // })
  // it("should not contain show-copy", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showCopy = false
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-copy").length
  //   ).toEqual(0)
  // })
  // it("should contain show-data-types", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showDataTypes = true
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-data-types")
  //       .length
  //   ).toEqual(1)
  // })
  // it("should not contain show-data-types", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showDataTypes = false
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-data-types")
  //       .length
  //   ).toEqual(0)
  // })
  // it("should contain show-size", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showSize = true
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-size").length
  //   ).toEqual(1)
  // })
  // it("should not contain show-size", () => {
  //   const jsonViewer = document.createElement("json-viewer")
  //   jsonViewer.data = { name: "test" }
  //   jsonViewer.showSize = false
  //   expect(
  //     jsonViewer.shadowRoot.querySelectorAll(".container.show-size").length
  //   ).toEqual(0)
  // })
})
