import { describe, it, expect } from "vitest";
import {
  maskUkPhone,
  maskPostcode,
  isValidUkPostcode,
  isValidUkPhone,
  normalizePhoneNumber,
  normalizePostcode,
} from "../input-masks";

describe("Input Masking", () => {
  describe("maskUkPhone", () => {
    it("formats 11-digit UK number", () => {
      expect(maskUkPhone("07774079152")).toBe("07774 079 152");
    });

    it("handles +44 international format", () => {
      expect(maskUkPhone("+447774079152")).toBe("+44 7774 079 152");
    });

    it("removes existing formatting", () => {
      expect(maskUkPhone("07774 079 152")).toBe("07774 079 152");
    });
  });

  describe("maskPostcode", () => {
    it("formats standard postcode", () => {
      expect(maskPostcode("CV212AB")).toBe("CV21 2AB");
      expect(maskPostcode("W1A1AA")).toBe("W1A 1AA");
    });

    it("converts to uppercase", () => {
      expect(maskPostcode("cv21 2ab")).toBe("CV21 2AB");
    });
  });

  describe("isValidUkPostcode", () => {
    it("accepts valid postcodes", () => {
      expect(isValidUkPostcode("CV21 2AB")).toBe(true);
      expect(isValidUkPostcode("W1A 1AA")).toBe(true);
    });

    it("rejects invalid postcodes", () => {
      expect(isValidUkPostcode("INVALID")).toBe(false);
      expect(isValidUkPostcode("")).toBe(false);
    });
  });

  describe("isValidUkPhone", () => {
    it("accepts valid UK numbers", () => {
      expect(isValidUkPhone("07774079152")).toBe(true);
      expect(isValidUkPhone("+447774079152")).toBe(true);
    });

    it("rejects invalid numbers", () => {
      expect(isValidUkPhone("123")).toBe(false);
    });
  });

  describe("normalizePhoneNumber", () => {
    it("converts to plain digits with 0 prefix", () => {
      expect(normalizePhoneNumber("07774 079 152")).toBe("07774079152");
      expect(normalizePhoneNumber("+447774079152")).toBe("07774079152");
    });
  });

  describe("normalizePostcode", () => {
    it("converts to uppercase without spaces", () => {
      expect(normalizePostcode("CV21 2AB")).toBe("CV212AB");
      expect(normalizePostcode("cv21 2ab")).toBe("CV212AB");
    });
  });
});
