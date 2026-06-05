import { describe, expect, it } from "vitest";
import { createCheckCreateRulesetHandler } from "../../../../src/products/check/tools/create-ruleset.js";

describe("createCheckCreateRulesetHandler", () => {
  it("previews ruleset creation by default", async () => {
    const handler = createCheckCreateRulesetHandler({
      createRuleset: async () => {
        throw new Error("dry run should not create rulesets");
      }
    });

    const result = await handler({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA"
    });

    expect(result.content[0]?.text).toContain("Dry run: create Check ruleset java-custom");
    expect(result.structuredContent.item).toEqual({
      id: undefined,
      projectId: "project-1",
      rulesetId: undefined,
      name: "java-custom",
      language: "JAVA",
      isDefault: "0",
      ruleIds: undefined,
      uncheckIds: undefined,
      templateId: undefined,
      customAttributeCount: 0,
      raw: undefined,
      executed: false
    });
  });

  it("executes ruleset creation when dry_run is false", async () => {
    let request: unknown;
    const handler = createCheckCreateRulesetHandler({
      createRuleset: async (input) => {
        request = input;
        return {
          project_id: input.project_id,
          ruleset_id: "ruleset-1",
          template_name: input.template_name,
          language: input.language,
          is_default: input.is_default,
          raw: {
            template_id: "ruleset-1"
          }
        };
      }
    });

    const result = await handler({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      template_id: "ruleset-base",
      dry_run: false
    });

    expect(request).toEqual({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      template_id: "ruleset-base",
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Created Check ruleset java-custom");
    expect(result.structuredContent.item).toEqual({
      id: "ruleset-1",
      projectId: "project-1",
      rulesetId: "ruleset-1",
      name: "java-custom",
      language: "JAVA",
      isDefault: "1",
      ruleIds: undefined,
      uncheckIds: undefined,
      templateId: "ruleset-base",
      customAttributeCount: 0,
      raw: {
        template_id: "ruleset-1"
      },
      executed: true
    });
  });
});
