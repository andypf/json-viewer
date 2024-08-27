import Container from "../../src/renderer/container"

describe("Container", () => {
  it("should be defined", () => {
    const renderer = new Container(document.createElement("div"))
    expect(renderer).toBeDefined()
  })
  it("should render the container node", () => {
    let root = document.createElement("div")
    const spy = jest.spyOn(root, "appendChild")
    new Container(root)
    expect(spy).toHaveBeenCalled()
  })

  it("should re-render the container node if data has changes", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "John" } })
    expect(spy).toHaveBeenCalled()
  })

  it("should not re-render the container node if data has not changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ data: { name: "Johny" } })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should not re-render the container node if only expanded has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ expanded: true })
    expect(spy).toHaveBeenCalledTimes(1)
  })
  it("should not re-render the container node if only indent has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ indent: 2 })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should not re-render the container node if only expandIconType has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")
    renderer.update({ data: { name: "Johny" } })
    renderer.update({ expandIconType: "square" })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should not re-render the container node if only showDataTypes has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ showDataTypes: true })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should not re-render the container node if only showCopy has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ showCopy: true })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should not re-render the container node if only showSize has changed", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    const container = root.children[0]
    const spy = jest.spyOn(container, "replaceChildren")

    renderer.update({ data: { name: "Johny" } })
    renderer.update({ showSize: true })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should add the class 'show-copy'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ showCopy: true })
    expect(root.children[0].classList.contains("show-copy")).toBe(true)
  })
  it("should remove the class 'show-copy'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    root.children[0].classList.add("show-copy")
    renderer.update({ showCopy: false })
    expect(root.children[0].classList.contains("show-copy")).toBe(false)
  })
  it("should add the class 'show-data-types'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ showDataTypes: true })
    expect(root.children[0].classList.contains("show-data-types")).toBe(true)
  })
  it("should remove the class 'show-data-types'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    root.children[0].classList.add("show-data-types")
    renderer.update({ showDataTypes: false })
    expect(root.children[0].classList.contains("show-data-types")).toBe(false)
  })
  it("should add the class 'show-size'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ showSize: true })
    expect(root.children[0].classList.contains("show-size")).toBe(true)
  })
  it("should remove the class 'show-size'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    root.children[0].classList.add("show-size")
    renderer.update({ showSize: false })
    expect(root.children[0].classList.contains("show-size")).toBe(false)
  })
  it("should set the expand icon type to 'square'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ expandIconType: "square" })
    expect(root.children[0].classList.contains("expand-icon-square")).toBe(true)
  })
  it("should toggle the expand icon type from square to 'circle'", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    root.children[0].classList.add("expand-icon-square")

    renderer.update({ expandIconType: "circle" })
    expect(root.children[0].classList.contains("expand-icon-circle")).toBe(true)
    expect(root.children[0].classList.contains("expand-icon-csquare")).toBe(false)
  })
  it("should render the toolbar node", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ showToolbar: true })
    expect(root.querySelector(".toolbar")).not.toBe(null)
  })
  it("should toggle the toolbar node", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({ showToolbar: true })
    renderer.update({ showToolbar: false })
    expect(root.querySelector(".toolbar")).toBe(null)
  })
  it("should toggle showCopy, showDataTypes, showSize when clicking on show details icon in toolbar", () => {
    let root = document.createElement("div")
    const renderer = new Container(root)
    renderer.update({
      showToolbar: true,
    })
    const toolbar = root.querySelector(".toolbar")
    const showDetails = toolbar.querySelector(".icon.info")
    const spy = jest.spyOn(renderer, "update")
    showDetails.click()
    expect(spy).toHaveBeenCalledWith({
      showCopy: false,
      showDataTypes: false,
      showSize: false,
    })
    showDetails.click()
    expect(spy).toHaveBeenCalledWith({
      showCopy: true,
      showDataTypes: true,
      showSize: true,
    })
  })
})
