import { describe, expect, it } from "vitest";
import { createCheckListRulesetsHandler } from "../../../../src/products/check/tools/list-rulesets.js";

describe("createCheckListRulesetsHandler", () => {
  it("maps check rulesets into MCP output", async () => {
    const handler = createCheckListRulesetsHandler({
      listRulesets: async () => ({
        rulesets: [
          {
            id: "ruleset-1",
            name: "Java Default",
            language: "java",
            is_system: true
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 rulesets");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "ruleset-1",
      name: "Java Default",
      language: "java",
      system: true
    });
  });
});
