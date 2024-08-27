import { isUrl, parseJson, dataType } from "../src/data-helpers"

describe("data-helper", () => {
  describe("isUrl", () => {
    it("should return true if the string starts with http:// or https://", () => {
      expect(isUrl("http://example.com")).toBe(true)
      expect(isUrl("https://example.com")).toBe(true)
    })

    it("should return false if the string does not start with http:// or https://", () => {
      expect(isUrl("example.com")).toBe(false)
    })

    it("should return false if the string is not a valid URL", () => {
      expect(isUrl("http://")).toBe(false)
    })

    it("should return false if the string is not a string", () => {
      expect(isUrl(123)).toBe(false)
    })

    it("should return false if the string is an empty string", () => {
      expect(isUrl("")).toBe(false)
    })

    it("should return false if the string is null", () => {
      expect(isUrl(null)).toBe(false)
    })
    it("should return false if the string is undefined", () => {
      expect(isUrl(undefined)).toBe(false)
    })
    it("should return false if the string is NaN", () => {
      expect(isUrl(NaN)).toBe(false)
    })
    it("should return false if the string is Infinity", () => {
      expect(isUrl(Infinity)).toBe(false)
    })
    it("should return false if the string is an object", () => {
      expect(isUrl({})).toBe(false)
    })
  })

  describe("dataType", () => {
    it("should return 'string' if the value is a string", () => {
      expect(dataType("")).toBe("string")
    })
    it("should return 'number' if the value is a number", () => {
      expect(dataType(123)).toBe("int")
    })
    it("should return 'number' if the value is a float", () => {
      expect(dataType(123.45)).toBe("float")
    })
    it("should return 'boolean' if the value is a boolean", () => {
      expect(dataType(true)).toBe("bool")
    })
    it("should return 'null' if the value is null", () => {
      expect(dataType(null)).toBe("null")
    })
    it("should return 'undefined' if the value is undefined", () => {
      expect(dataType(undefined)).toBe("undefined")
    })
    it("should return 'object' if the value is an object", () => {
      expect(dataType({})).toBe("object")
    })
    it("should return 'array' if the value is an array", () => {
      expect(dataType([])).toBe("array")
    })
    it("should return 'function' if the value is a function", () => {
      expect(dataType(() => {})).toBe("function")
    })
    it("should return 'NaN' if the value is NaN", () => {
      expect(dataType(NaN)).toBe("NaN")
    })
    it("should return 'Infinity' if the value is Infinity", () => {
      expect(dataType(Infinity)).toBe("Infinity")
    })
  })
  describe("parseJson", () => {
    it("should parse a JSON string", () => {
      expect(parseJson("{}")).toEqual({})
    })

    it("should parse a JSON string with NaN", () => {
      expect(parseJson('{ "a": NaN }')).toEqual({ a: NaN })
    })

    it("should parse a JSON string including array with NaN", () => {
      expect(parseJson('{ "array": [1,2,"test",NaN,4] }')).toEqual({
        array: [1, 2, "test", NaN, 4],
      })
    })
    it("should parse a JSON string including array with NaN and undefined", () => {
      expect(parseJson('{ "array": [1,2,"test",NaN,undefined,4], "b": "b" }')).toEqual({
        array: [1, 2, "test", NaN, undefined, 4],
        b: "b",
      })
    })

    it("should not repace NaN in strings", () => {
      expect(parseJson('{ "a": "NaNometer" }')).toEqual({ a: "NaNometer" })
    })
    it("should not repace undefined in strings", () => {
      expect(parseJson('{ "a": "undefined: a is undefined" }')).toEqual({
        a: "undefined: a is undefined",
      })
    })

    it("should parse a JSON string with undefined", () => {
      expect(parseJson('{ "a": undefined }')).toEqual({ a: undefined })
    })

    it("should parse a JSON string with NaN and undefined", () => {
      expect(parseJson('{ "a": NaN, "b": undefined }')).toEqual({
        a: NaN,
        b: undefined,
      })
    })

    it("should parse a JSON string including NaN, undefined", () => {
      expect(
        parseJson(
          '{ "string": "this is a test ...", "integer":42, "array":[ 1, 2, 3, "test", NaN], "float":3.14159, "undefined":undefined, "object":{"first-child":true, "second-child":false, "last-child":null },"string_number":"1234", "date": "Tue, Oct 17, 2023, 08:58 AM" }'
        )
      ).toEqual({
        string: "this is a test ...",
        integer: 42,
        array: [1, 2, 3, "test", NaN],
        float: 3.14159,
        undefined: undefined,
        object: {
          "first-child": true,
          "second-child": false,
          "last-child": null,
        },
        string_number: "1234",
        date: "Tue, Oct 17, 2023, 08:58 AM",
      })
    })
  })
})
