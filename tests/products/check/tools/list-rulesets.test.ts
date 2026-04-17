import { describe, expect, it } from "vitest";
import { mapCheckRulesets } from "../../../../src/products/check/tools/list-rulesets.js";

describe("mapCheckRulesets", () => {
  it("returns normalized rulesets with pagination", () => {
    const result = mapCheckRulesets(
      [{ id: "rule-1", name: "Java Default", language: "java", is_system: true }],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "rule-1",
        name: "Java Default",
        language: "java",
        system: true
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
