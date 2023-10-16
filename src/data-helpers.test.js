import { isUrl, buildContentData, parseJson } from "./data-helpers";

describe("data-helper", () => {
  describe("isUrl", () => {
    it("should return true if the string starts with http:// or https://", () => {
      expect(isUrl("http://example.com")).toBe(true);
      expect(isUrl("https://example.com")).toBe(true);
    });

    it("should return false if the string does not start with http:// or https://", () => {
      expect(isUrl("example.com")).toBe(false);
    });

    it("should return false if the string is not a valid URL", () => {
      expect(isUrl("http://")).toBe(false);
    });

    it("should return false if the string is not a string", () => {
      expect(isUrl(123)).toBe(false);
    });

    it("should return false if the string is an empty string", () => {
      expect(isUrl("")).toBe(false);
    });

    it("should return false if the string is null", () => {
      expect(isUrl(null)).toBe(false);
    });
    it("should return false if the string is undefined", () => {
      expect(isUrl(undefined)).toBe(false);
    });
    it("should return false if the string is NaN", () => {
      expect(isUrl(NaN)).toBe(false);
    });
    it("should return false if the string is Infinity", () => {
      expect(isUrl(Infinity)).toBe(false);
    });
    it("should return false if the string is an object", () => {
      expect(isUrl({})).toBe(false);
    });
  });

  describe("buildContentData", () => {
    it("should return an object with dataType: 'array' if the input is an array", () => {
      expect(buildContentData([])).toEqual({ dataType: "array", value: [] });
    });

    it("should return an object with dataType: 'null' if the input is null", () => {
      expect(buildContentData(null)).toEqual({ dataType: "null", value: null });
    });

    it("should return an object with dataType: 'regexp' if the input is a regular expression", () => {
      expect(buildContentData(/abc/)).toEqual({
        dataType: "regexp",
        value: /abc/,
      });
    });
    it("should return an object with dataType: 'int' if the input is an integer", () => {
      expect(buildContentData(123)).toEqual({ dataType: "int", value: 123 });
    });

    it("should return an object with dataType: 'float' if the input is a float", () => {
      expect(buildContentData(123.456)).toEqual({
        dataType: "float",
        value: 123.456,
      });
    });

    it("should return an object with dataType: 'NaN' if the input is NaN", () => {
      expect(buildContentData(NaN)).toEqual({ dataType: "NaN", value: NaN });
    });

    it("should return an object with dataType: 'bool' if the input is a boolean", () => {
      expect(buildContentData(true)).toEqual({
        dataType: "bool",
        value: true,
      });
    });

    it("should return an object with dataType: 'date' if the input is a Date object", () => {
      const date = new Date();
      expect(buildContentData(date)).toEqual({
        dataType: "date",
        value: date,
      });
    });

    it("should return an object with dataType: 'string' if the input is a string", () => {
      expect(buildContentData("abc")).toEqual({
        dataType: "string",
        value: "abc",
      });
    });

    it("should return an object with dataType: 'object' if the input is an object", () => {
      expect(buildContentData({})).toEqual({
        dataType: "object",
        value: {},
      });
    });
    it("should return an object with dataType: 'undefined' if the input is undefined", () => {
      expect(buildContentData(undefined)).toEqual({
        dataType: "undefined",
        value: undefined,
      });
    });
    it("should return an object with dataType: 'Infinity' if the input is Infinity", () => {
      expect(buildContentData(Infinity)).toEqual({
        dataType: "Infinity",
        value: Infinity,
      });
    });
    it("should return an object with dataType: 'undefined' if the input is undefined", () => {
      expect(buildContentData(undefined)).toEqual({
        dataType: "undefined",
        value: undefined,
      });
    });

    it("should return nested objects with the correct data types", () => {
      expect(buildContentData({ a: 123, b: "abc", c: true, d: null })).toEqual({
        dataType: "object",
        value: {
          a: { dataType: "int", value: 123 },
          b: { dataType: "string", value: "abc" },
          c: { dataType: "bool", value: true },
          d: { dataType: "null", value: null },
        },
      });
    });

    it("should return nested arrays with the correct data types", () => {
      expect(buildContentData([123, "abc", true, null])).toEqual({
        dataType: "array",
        value: [
          { dataType: "int", value: 123 },
          { dataType: "string", value: "abc" },
          { dataType: "bool", value: true },
          { dataType: "null", value: null },
        ],
      });
    });
    it("should return 2 levels of nested objects with the correct data types", () => {
      expect(
        buildContentData({ a: { b: 123, c: "abc", d: true, e: null } })
      ).toEqual({
        dataType: "object",
        value: {
          a: {
            dataType: "object",
            value: {
              b: { dataType: "int", value: 123 },
              c: { dataType: "string", value: "abc" },
              d: { dataType: "bool", value: true },
              e: { dataType: "null", value: null },
            },
          },
        },
      });
    });
  });
  describe("parseJson", () => {
    it("should parse a JSON string", () => {
      expect(parseJson("{}")).toEqual({});
    });

    it("should parse a JSON string with NaN", () => {
      expect(parseJson('{ "a": NaN }')).toEqual({ a: NaN });
    });

    it("should parse a JSON string with undefined", () => {
      expect(parseJson('{ "a": undefined }')).toEqual({ a: undefined });
    });

    it("should parse a JSON string with NaN and undefined", () => {
      expect(parseJson('{ "a": NaN, "b": undefined }')).toEqual({
        a: NaN,
        b: undefined,
      });
    });
  });
});
