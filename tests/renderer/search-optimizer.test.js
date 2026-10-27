import SearchOptimizer from "../../src/renderer/search-optimizer.js"

describe("SearchOptimizer", () => {
  it("highlights a match with a span.match element", () => {
    const optimizer = new SearchOptimizer()
    const el = document.createElement("span")
    el.textContent = "hello world"
    optimizer.setSearchTerm("world")
    const found = optimizer.highlightInElement(el)
    expect(found).toBe(true)
    expect(el.querySelectorAll(".match").length).toBe(1)
    expect(el.querySelector(".match").textContent).toBe("world")
    // full visible text must be unchanged
    expect(el.textContent).toBe("hello world")
  })

  it("resets to plain text when the search term is cleared", () => {
    const optimizer = new SearchOptimizer()
    const el = document.createElement("span")
    el.textContent = "hello world"
    // first match
    optimizer.setSearchTerm("world")
    optimizer.highlightInElement(el)
    expect(el.querySelectorAll(".match").length).toBe(1)
    // clear -> reset path (line 38)
    optimizer.setSearchTerm("")
    const found = optimizer.highlightInElement(el)
    expect(found).toBe(false)
    expect(el.querySelectorAll(".match").length).toBe(0)
    expect(el.textContent).toBe("hello world")
  })

  it("resets to plain text when there is no match", () => {
    const optimizer = new SearchOptimizer()
    const el = document.createElement("span")
    el.textContent = "hello world"
    optimizer.setSearchTerm("world")
    optimizer.highlightInElement(el)
    expect(el.querySelectorAll(".match").length).toBe(1)
    // new term that does not match -> no-match reset path (line 57)
    optimizer.setSearchTerm("xyz")
    const found = optimizer.highlightInElement(el)
    expect(found).toBe(false)
    expect(el.querySelectorAll(".match").length).toBe(0)
    expect(el.textContent).toBe("hello world")
  })

  describe("XSS safety (CodeQL js/xss-through-dom)", () => {
    it("does NOT interpret HTML when resetting with a cleared search term", () => {
      const optimizer = new SearchOptimizer()
      const el = document.createElement("span")
      // user-supplied JSON value containing markup
      el.textContent = '<img src=x onerror=alert(1)>'
      optimizer.setSearchTerm("")
      optimizer.highlightInElement(el)
      // must not create a real <img> element
      expect(el.querySelector("img")).toBeNull()
      expect(el.children.length).toBe(0)
      expect(el.textContent).toBe('<img src=x onerror=alert(1)>')
    })

    it("does NOT interpret HTML when resetting after a non-matching search", () => {
      const optimizer = new SearchOptimizer()
      const el = document.createElement("span")
      el.textContent = '<script>alert(1)</script>'
      optimizer.setSearchTerm("nomatch")
      optimizer.highlightInElement(el)
      expect(el.querySelector("script")).toBeNull()
      expect(el.children.length).toBe(0)
      expect(el.textContent).toBe('<script>alert(1)</script>')
    })

    it("escapes HTML in the surrounding text when a match is highlighted", () => {
      const optimizer = new SearchOptimizer()
      const el = document.createElement("span")
      el.textContent = '<b>find</b>'
      optimizer.setSearchTerm("find")
      optimizer.highlightInElement(el)
      // only the controlled .match span may be an element; no <b> injected
      expect(el.querySelector("b")).toBeNull()
      expect(el.querySelectorAll(".match").length).toBe(1)
      expect(el.textContent).toBe('<b>find</b>')
    })
  })
})
