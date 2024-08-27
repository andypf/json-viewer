import { themeStyles, availableThemes } from "../src/themes"

describe("themeStyles", () => {
  it("should return a function", () => {
    expect(typeof themeStyles).toBe("function")
  })

  it("should return a function that returns an object", () => {
    expect(typeof themeStyles(availableThemes[0])).toBe("string")
  })

  it("should return a string containing .container", () => {
    expect(themeStyles(availableThemes[0])).toContain(".container")
  })

  it("should return a string containing the 16 base colors", () => {
    expect(themeStyles(availableThemes[0])).toMatch(/--base00.+--base01.+--base02.+--base0F/)
  })

  it("should return a string for a custom theme object", () => {
    const customTheme = {
      base00: "#000000",
      base01: "#111111",
      base02: "#222222",
      base03: "#333333",
      base04: "#444444",
      base05: "#555555",
      base06: "#666666",
      base07: "#777777",
      base08: "#888888",
      base09: "#999999",
      base0A: "#AAAAAA",
      base0B: "#BBBBBB",
      base0C: "#CCCCCC",
      base0D: "#DDDDDD",
      base0E: "#EEEEEE",
      base0F: "#FFFFFF",
    }

    expect(themeStyles(customTheme)).toMatch(/--base00.+--base01.+--base02.+--base0F/)
  })
})
