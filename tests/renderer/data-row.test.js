import DataRow from "../../src/renderer/data-row.js"

describe("DataRow", () => {
  it("should be defined", () => {
    const renderer = new DataRow(document.createElement("div"), {})
    expect(renderer).toBeDefined()
  })
})
