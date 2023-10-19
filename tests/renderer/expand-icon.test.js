import ExpandIcon from "../../src/renderer/expand-icon.js"

describe("ExpandIcon", () => {
  it("should create an icon with arrow-right class", () => {
    const icon = new ExpandIcon({})
    expect(icon.element.querySelector("i").className).toEqual("expand-icon")
  })
  it("should create an icon with expanded class", () => {
    const icon = new ExpandIcon({ expanded: true })
    expect(icon.element.querySelector("i").className).toEqual(
      "expand-icon expanded"
    )
  })
  it("should call onToggle when clicked", () => {
    const onToggle = jest.fn()
    const icon = new ExpandIcon({ onToggle })
    icon.element.click()
    expect(onToggle).toHaveBeenCalled()
  })
  it("should call onToggle with the new state", () => {
    const onToggle = jest.fn()
    const icon = new ExpandIcon({ onToggle })
    icon.element.click()
    expect(onToggle).toHaveBeenCalledWith(true)
  })
  //update
  it("should update the icon to expanded", () => {
    const icon = new ExpandIcon({})
    icon.update({ expanded: true })
    expect(icon.element.querySelector("i").className).toEqual(
      "expand-icon expanded"
    )
  })
  it("should update the icon to collapsed", () => {
    const icon = new ExpandIcon({ expanded: true })
    icon.update({ expanded: false })
    expect(icon.element.querySelector("i").className).toEqual("expand-icon")
  })
  // icon is uniq
  it("should create a uniq icon", () => {
    const icon1 = new ExpandIcon({})
    const icon2 = new ExpandIcon({})
    expect(icon1.element.querySelector("i")).not.toBe(
      icon2.element.querySelector("i")
    )
  })
})
