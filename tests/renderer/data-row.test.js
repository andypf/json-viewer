import DataRow from "../../src/renderer/data-row.js"

describe("DataRow", () => {
  it("should be defined", () => {
    const renderer = new DataRow({})
    expect(renderer).toBeDefined()
  })
  it("should render the data-row node", () => {
    const row = new DataRow({})
    expect(row.element).toBeDefined()
  })
  it("should render the key node", () => {
    const row = new DataRow({ key: "name" })
    expect(row.element.querySelector(".key")).toBeDefined()
  })
  it("should render the value node", () => {
    const row = new DataRow({ value: "John" })
    expect(row.element.querySelector(".value")).toBeDefined()
  })
  it("should render the expand node", () => {
    const row = new DataRow({ expanded: true })
    expect(row.element.querySelector(".expand")).toBeDefined()
  })
  it("should render same number of row nodes as the data object", () => {
    const row = new DataRow({
      value: { name: "John", subProp: { test: "test" } },
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row").length).toBe(4)
  })
  it("should render the correct number of row nodes if the data object is an array", () => {
    const root = document.createElement("div")
    const row = new DataRow({
      key: "",
      value: [{ name: "John" }, { name: "Jane" }],
    })
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row").length).toBe(5)
  })
  it("should add the class expanded to the row node if expanded is true", () => {
    const row = new DataRow({ expanded: true })
    expect(row.element.classList.contains("expanded")).toBe(true)
  })
  it("should remove the class expanded from the row node if expanded is false", () => {
    const row = new DataRow({ expanded: false })
    expect(row.element.classList.contains("expanded")).toBe(false)
  })
  it("should add the class expanded to one row node if expanded is 1", () => {
    const row = new DataRow({ value: { key1: { key2: "test" } }, expanded: 1 })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row").length).toBe(3)
    expect(root.querySelectorAll(".data-row.expanded").length).toBe(1)
  })
  it("should add the class expanded to two row nodes if expanded is 2", () => {
    const row = new DataRow({
      value: { key1: { key2: { key3: "test" } } },
      expanded: 2,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row").length).toBe(4)
    expect(root.querySelectorAll(".data-row.expanded").length).toBe(2)
  })
  it("should add the class expanded to the first node if expanded is 1", () => {
    const row = new DataRow({
      value: { key1: { key2: "test" } },
      expanded: 1,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row.expanded").length).toBe(1)
    expect(root.querySelector(".data-row").classList).toContain("expanded")
  })
  it("should indent the second row node if indent is 1", () => {
    const row = new DataRow({
      value: { key1: { key2: "test" } },
      indent: 1,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[1].style.paddingLeft).toContain("5px")
  })
  it("should set padding-left to 20px if indent is 4", () => {
    const row = new DataRow({
      value: { key1: { key2: "test" } },
      indent: 4,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[1].style.paddingLeft).toContain("20px")
  })
  it("should create a value type node", () => {
    const row = new DataRow({
      value: { key1: "test" },
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[1].querySelector(".value .type")).not.toBeNull()
  })
  it("should create a value type node with the correct type", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    console.log(root.innerHTML, root.querySelectorAll(".data-row")[1].querySelector(".value").innerHTML)
    expect(root.querySelectorAll(".data-row")[1].querySelector(".value .type").textContent).toBe("string")
  })
  it("should create a size node", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[0].querySelector(".items-size")).not.toBeNull()
  })
  it("should create a size node with 1 size", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[0].querySelector(".items-size").textContent).toBe("1 item")
  })
  it("should create a size node with 2 size", () => {
    const row = new DataRow({
      value: { key1: "test", key2: "test" },
      expanded: true,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[0].querySelector(".items-size").textContent).toBe("2 items")
  })
  it("should create the copy node", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".data-row")[0].querySelector(".copy.icon")).not.toBeNull()
  })
  it("should not contain any nodes with match css class", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    row.update({ searchTerm: "" })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".match").length).toBe(0)
  })
  it("should contain one node with match css class if matches the value", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    row.update({ searchTerm: "test" })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".match").length).toBe(1)
  })
  it("should contain one nodes with match css class if matches the key", () => {
    const row = new DataRow({
      value: { key1: "test" },
      expanded: true,
    })
    row.update({ searchTerm: "key1" })
    const root = document.createElement("div")
    root.appendChild(row.element)
    expect(root.querySelectorAll(".match").length).toBe(1)
  })
})
