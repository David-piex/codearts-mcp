import { describe, expect, it } from "vitest";
import {
  decryptSecretValue,
  encryptSecretValue
} from "../../src/server/auth-crypto.js";

describe("auth crypto", () => {
  it("round-trips secret values", () => {
    const encrypted = encryptSecretValue(
      "ak-1",
      "0123456789abcdef0123456789abcdef"
    );

    expect(
      decryptSecretValue(encrypted, "0123456789abcdef0123456789abcdef")
    ).toBe("ak-1");
  });

  it("throws when decrypting with the wrong key", () => {
    const encrypted = encryptSecretValue(
      "ak-1",
      "0123456789abcdef0123456789abcdef"
    );

    expect(() =>
      decryptSecretValue(encrypted, "fedcba9876543210fedcba9876543210")
    ).toThrow();
  });
});
