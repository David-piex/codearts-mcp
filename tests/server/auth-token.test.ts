import { describe, expect, it } from "vitest";
import { createAuthToken, hashAuthToken } from "../../src/server/auth-token.js";

describe("auth token", () => {
  it("generates a raw token and stores only a hash", () => {
    const token = createAuthToken();

    expect(token.raw.length).toBeGreaterThan(20);
    expect(hashAuthToken(token.raw)).toBe(token.hash);
  });
});
