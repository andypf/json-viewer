import Toolbar from "../../src/renderer/toolbar"

describe("Toolbar", () => {
  it("should be defined", () => {
    expect(Toolbar).toBeDefined()
  })
  it("should render the toolbar node", () => {
    let root = document.createElement("div")
    const toolbar = new Toolbar({})
    root.appendChild(toolbar.element)
    expect(root.children[0].className).toBe("toolbar")
  })
  it("should render the refresh icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".refresh.icon")).not.toBe(null)
  })
  it("should render the expand icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".plus.icon")).not.toBe(null)
  })
  it("should render the collapse icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".minus.icon")).not.toBe(null)
  })
  it("should render the indent icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".indent.icon")).not.toBe(null)
  })
  it("should render the outdent icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".outdent.icon")).not.toBe(null)
  })
  it("should render the details icon", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".info.icon")).not.toBe(null)
  })
  it("should render the search input", () => {
    const toolbar = new Toolbar({})
    expect(toolbar.element.querySelector(".search-input")).toBeDefined()
  })
  it("should call the onChange and onSearch callbacks when refresh icon is clicked", () => {
    const onChange = jest.fn()
    const onSearch = jest.fn()
    const toolbar = new Toolbar({ onChange, onSearch })
    toolbar.element.querySelector(".refresh.icon").click()
    expect(onChange).toHaveBeenCalledWith({ indent: 2, expanded: 1 })
    expect(onSearch).toHaveBeenCalledWith("")
  })
  it("should call the onChange callback when expand icon is clicked", () => {
    const onChange = jest.fn()
    const toolbar = new Toolbar({ expanded: 0, onChange })
    toolbar.maxExpandLevel = 2
    toolbar.element.querySelector(".plus.icon").click()
    expect(onChange).toHaveBeenCalledWith({ expanded: 1 })
  })
  it("should call the onChange callback when collapse icon is clicked", () => {
    const onChange = jest.fn()
    const toolbar = new Toolbar({ expanded: 2, onChange })
    toolbar.maxExpandLevel = 2
    toolbar.element.querySelector(".minus.icon").click()
    expect(onChange).toHaveBeenCalledWith({ expanded: 1 })
  })
  it("should call the onChange callback when indent icon is clicked", () => {
    const onChange = jest.fn()
    const toolbar = new Toolbar({ indent: 2, onChange })
    toolbar.element.querySelector(".indent.icon").click()
    expect(onChange).toHaveBeenCalledWith({ indent: 3 })
  })
  it("should call the onChange callback when outdent icon is clicked", () => {
    const onChange = jest.fn()
    const toolbar = new Toolbar({ indent: 2, onChange })
    toolbar.element.querySelector(".outdent.icon").click()
    expect(onChange).toHaveBeenCalledWith({ indent: 1 })
  })
  it("should call the onChange callback when details icon is clicked", () => {
    const onChange = jest.fn()
    const toolbar = new Toolbar({ onChange, showDetails: true })
    toolbar.element.querySelector(".info.icon").click()
    expect(onChange).toHaveBeenCalledWith({ showDetails: false })
  })
  it("should call the onSearch callback when search input is changed", () => {
    const onSearch = jest.fn()
    const toolbar = new Toolbar({ onSearch })
    toolbar.element.querySelector(".search-input").value = "test"
    toolbar.element.querySelector(".search-input").dispatchEvent(new Event("input"))
    expect(onSearch).toHaveBeenCalledWith("test")
  })
})
