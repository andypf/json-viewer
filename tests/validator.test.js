import {
  validateBoolean,
  validateBooleanOrPositiveNumber,
  validatePositiveNumber,
  validateStringOrJson,
  validateString,
} from "../src/validator"

describe("validateBoolean", () => {
  it("should return true if value is true", () => {
    expect(validateBoolean(true)).toBe(true)
  })
  it("should return false if value is false", () => {
    expect(validateBoolean(false)).toBe(false)
  })
  it("should return true if value is 'true'", () => {
    expect(validateBoolean("true")).toBe(true)
  })
  it("should return false if value is 'false'", () => {
    expect(validateBoolean("false")).toBe(false)
  })
  it("should throw an error if value is not a boolean", () => {
    expect(() => validateBoolean("foo")).toThrowErrorMatchingInlineSnapshot(`"should be a boolean!"`)
  })
})

describe("validatePositiveNumber", () => {
  it("should return the number if it is a number", () => {
    expect(validatePositiveNumber(1)).toBe(1)
  })
  it("should return the number if it is a string", () => {
    expect(validatePositiveNumber("1")).toBe(1)
  })
  it("should throw an error if the number is negative", () => {
    expect(() => validatePositiveNumber(-1)).toThrowErrorMatchingInlineSnapshot(`"should be a positive number!"`)
  })
  it("should throw an error if the number is NaN", () => {
    expect(() => validatePositiveNumber("foo")).toThrowErrorMatchingInlineSnapshot(`"should be a positive number!"`)
  })
})

describe("validateBooleanOrPositiveNumber", () => {
  it("should return true if value is true", () => {
    expect(validateBooleanOrPositiveNumber(true)).toBe(true)
  })
  it("should return false if value is false", () => {
    expect(validateBooleanOrPositiveNumber(false)).toBe(false)
  })
  it("should return true if value is 'true'", () => {
    expect(validateBooleanOrPositiveNumber("true")).toBe(true)
  })
  it("should return false if value is 'false'", () => {
    expect(validateBooleanOrPositiveNumber("false")).toBe(false)
  })
  it("should return the number if it is a number", () => {
    expect(validateBooleanOrPositiveNumber(1)).toBe(1)
  })
  it("should return the number if it is a string", () => {
    expect(validateBooleanOrPositiveNumber("1")).toBe(1)
  })
  it("should throw an error if value is not a boolean or positive number", () => {
    expect(() => validateBooleanOrPositiveNumber("foo")).toThrowErrorMatchingInlineSnapshot(
      `"should be a boolean or a positive number!"`
    )
  })
})

describe("validateStringOrJson", () => {
  it("should return the value if it is an object", () => {
    expect(validateStringOrJson({ foo: "bar" })).toEqual({ foo: "bar" })
  })
  it("should return the value if it is a string", () => {
    expect(validateStringOrJson("foo")).toEqual("foo")
  })
  it("should return the value if it is a valid JSON string", () => {
    expect(validateStringOrJson('{"foo":"bar"}')).toEqual({ foo: "bar" })
  })
  it("should return the value if it is an invalid JSON string", () => {
    expect(validateStringOrJson("{foo:bar}")).toEqual("{foo:bar}")
  })
  it("should throw an error if value is not a string or JSON", () => {
    expect(() => validateStringOrJson(1)).toThrowErrorMatchingInlineSnapshot(`"should be a string or JSON!"`)
  })
})

describe("validateString", () => {
  it("should return the value if it is a string", () => {
    expect(validateString("foo")).toEqual("foo")
  })
  it("should throw an error if value is not a string", () => {
    expect(() => validateString(1)).toThrowErrorMatchingInlineSnapshot(`"should be a string!"`)
  })
})
