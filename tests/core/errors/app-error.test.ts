import { describe, expect, it } from "vitest";
import { AppError, normalizeProviderError } from "../../../src/core/errors/app-error.js";

describe("normalizeProviderError", () => {
  it("maps 401 responses to auth_error", () => {
    const err = normalizeProviderError({
      status: 401,
      message: "Unauthorized",
      code: "APIG.0101",
      requestId: "req-1"
    });

    expect(err).toBeInstanceOf(AppError);
    expect(err.category).toBe("auth_error");
    expect(err.code).toBe("APIG.0101");
  });
});
