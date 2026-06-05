import { describe, expect, it, vi } from "vitest";
import { createCheckSetDefaultRulesetHandler } from "../../../../src/products/check/tools/set-default-ruleset.js";

describe("createCheckSetDefaultRulesetHandler", () => {
  it("previews set default ruleset by default", async () => {
    const handler = createCheckSetDefaultRulesetHandler({
      setDefaultRuleset: async () => {
        throw new Error("dry run should not set default ruleset");
      }
    });

    const result = await handler({ project_id: "project-1", ruleset_id: "ruleset-1", language: "JAVA" });
    expect(result.content[0]?.text).toContain("Dry run: set Check default ruleset ruleset-1");
  });

  it("executes set default ruleset when dry_run is false", async () => {
    const client = {
      setDefaultRuleset: vi.fn(async (input: { project_id: string; ruleset_id: string; language: string }) => ({
        ...input,
        status: "ok",
        result: "success",
        raw: {}
      }))
    };
    const handler = createCheckSetDefaultRulesetHandler(client);

    const result = await handler({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      language: "JAVA",
      dry_run: false
    });
    expect(client.setDefaultRuleset).toHaveBeenCalledWith({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      language: "JAVA",
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Set Check default ruleset ruleset-1");
  });
});
