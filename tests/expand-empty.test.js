import Container from "../src/renderer/container"

describe("expandEmpty feature", () => {
  let root

  beforeEach(() => {
    root = document.createElement("div")
  })

  it("should expand empty objects/arrays by default", () => {
    const container = new Container(root, {
      data: { empty: {}, items: [] },
      expanded: true,
    })

    const rows = root.querySelectorAll(".data-row")
    // Should have rows for: root, "empty" key, "items" key
    expect(rows.length).toBeGreaterThan(0)

    // Check that rows are expanded (have "expanded" class)
    const expandedRows = root.querySelectorAll(".data-row.expanded")
    expect(expandedRows.length).toBeGreaterThan(0)
  })

  it("should not expand empty objects/arrays when expandEmpty is false", () => {
    const container = new Container(root, {
      data: { empty: {}, items: [] },
      expanded: true,
      expandEmpty: false,
    })

    const rows = root.querySelectorAll(".data-row")
    expect(rows.length).toBeGreaterThan(0)

    // The root should be expanded, but the empty children should not
    const rootRow = rows[0]
    expect(rootRow.classList.contains("expanded")).toBe(true)

    // Check that child empty collections are not expanded
    const childRows = Array.from(rows).slice(1)
    childRows.forEach(row => {
      const itemsSize = row.querySelector(".items-size")
      if (itemsSize && itemsSize.textContent === "0 items") {
        expect(row.classList.contains("expanded")).toBe(false)
      }
    })
  })

  it("should expand non-empty collections when expandEmpty is false", () => {
    const container = new Container(root, {
      data: { empty: {}, notEmpty: { a: 1 } },
      expanded: true,
      expandEmpty: false,
    })

    const rows = root.querySelectorAll(".data-row")

    // Find the notEmpty row
    const notEmptyRow = Array.from(rows).find(row => {
      const keyEl = row.querySelector(".key")
      return keyEl && keyEl.textContent === "notEmpty"
    })

    expect(notEmptyRow).toBeDefined()
    expect(notEmptyRow.classList.contains("expanded")).toBe(true)
  })

  it("should allow manual expansion of empty collections even when expandEmpty is false", () => {
    const container = new Container(root, {
      data: { empty: {} },
      expanded: true,
      expandEmpty: false,
    })

    const rows = root.querySelectorAll(".data-row")

    // Find the empty row (should be at level 1, not level 0)
    const emptyRow = Array.from(rows).find(row => {
      const keyEl = row.querySelector(":scope > .key-value-wrapper > .key")
      const itemsSize = row.querySelector(":scope > .key-value-wrapper > .items-size")
      return keyEl && keyEl.textContent === "empty" && itemsSize && itemsSize.textContent === "0 items"
    })

    expect(emptyRow).toBeDefined()
    expect(emptyRow.classList.contains("expanded")).toBe(false)

    // Click to expand
    const expandIcon = emptyRow.querySelector(".expand.icon")
    if (expandIcon) {
      expandIcon.click()
      // After clicking, it should be expanded
      expect(emptyRow.classList.contains("expanded")).toBe(true)
    }
  })
})
