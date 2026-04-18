import { describe, expect, it } from "vitest";
import * as serverIndex from "../../src/server/index.js";

describe("server index exports", () => {
  it("exports main for deploy-oriented entry points", () => {
    expect(typeof serverIndex.main).toBe("function");
  });
});
