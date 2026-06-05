import { describe, expect, it } from "vitest";
import { createCheckDeleteRulesetHandler } from "../../../../src/products/check/tools/delete-ruleset.js";

describe("createCheckDeleteRulesetHandler", () => {
  it("previews ruleset deletion by default", async () => {
    const handler = createCheckDeleteRulesetHandler({
      deleteRuleset: async () => {
        throw new Error("dry run should not delete rulesets");
      }
    });

    const result = await handler({
      project_id: "project-1",
      ruleset_id: "ruleset-1"
    });

    expect(result.content[0]?.text).toContain("Dry run: delete Check ruleset ruleset-1");
    expect(result.structuredContent.item).toEqual({
      id: "ruleset-1",
      projectId: "project-1",
      rulesetId: "ruleset-1",
      raw: undefined,
      executed: false
    });
  });

  it("executes ruleset deletion when dry_run is false", async () => {
    let request: unknown;
    const handler = createCheckDeleteRulesetHandler({
      deleteRuleset: async (input) => {
        request = input;
        return {
          project_id: input.project_id,
          ruleset_id: input.ruleset_id,
          raw: undefined
        };
      }
    });

    const result = await handler({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      dry_run: false
    });

    expect(request).toEqual({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Deleted Check ruleset ruleset-1");
    expect(result.structuredContent.item).toEqual({
      id: "ruleset-1",
      projectId: "project-1",
      rulesetId: "ruleset-1",
      raw: undefined,
      executed: true
    });
  });
});
