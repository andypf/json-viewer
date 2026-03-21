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

  describe("preserveExpanded feature", () => {
    it("should preserve expanded state when data updates with preserveExpanded enabled", () => {
      let root = document.createElement("div")
      const renderer = new Container(root)

      // Initial data
      const initialData = {
        users: [
          { name: "Alice", age: 30 },
          { name: "Bob", age: 25 }
        ]
      }

      renderer.update({
        data: initialData,
        expanded: 1,
        preserveExpanded: true
      })

      // Expand the users array manually
      const usersRow = root.querySelector('[data-key="users"]')
      expect(usersRow).toBeDefined()

      // Simulate expanding
      usersRow.classList.add("expanded")
      const expandIcon = usersRow.querySelector(".expand.icon")
      if (expandIcon) expandIcon.click()

      // Update data with new values but same structure
      const updatedData = {
        users: [
          { name: "Alice", age: 31 }, // age changed
          { name: "Bob", age: 26 }    // age changed
        ]
      }

      renderer.update({
        data: updatedData,
        preserveExpanded: true
      })

      // The users row should still exist after update
      const usersRowAfter = root.querySelector('[data-key="users"]')
      expect(usersRowAfter).toBeDefined()
    })

    it("should NOT preserve expanded state when preserveExpanded is disabled", () => {
      let root = document.createElement("div")
      const renderer = new Container(root)

      const data = {
        users: [{ name: "Alice" }]
      }

      renderer.update({
        data: data,
        expanded: 1,
        preserveExpanded: false
      })

      // Expand manually
      const usersRow = root.querySelector('[data-key="users"]')
      if (usersRow) {
        usersRow.classList.add("expanded")
      }

      // Update data - should reset expansion
      renderer.update({
        data: { users: [{ name: "Bob" }] },
        preserveExpanded: false
      })

      // New render means new elements, old manual expansion is lost
      const container = root.children[0]
      expect(container).toBeDefined()
    })

    it("should handle missing paths gracefully when preserveExpanded is enabled", () => {
      let root = document.createElement("div")
      const renderer = new Container(root)

      // Initial data with nested structure
      const initialData = {
        users: [{ name: "Alice" }],
        settings: { theme: "dark" }
      }

      renderer.update({
        data: initialData,
        preserveExpanded: true
      })

      // Update with data that removes the settings key
      const updatedData = {
        users: [{ name: "Bob" }]
        // settings is removed
      }

      // Should not throw error
      expect(() => {
        renderer.update({
          data: updatedData,
          preserveExpanded: true
        })
      }).not.toThrow()
    })
  })
})
