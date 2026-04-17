import { describe, expect, it } from "vitest";
import { collectToolNames } from "../../src/server/register-tools.js";

describe("phase 1 contract", () => {
  it("keeps the planned phase 1 tool count stable", () => {
    expect(collectToolNames()).toHaveLength(124);
  });
});
