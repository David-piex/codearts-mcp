import { describe, expect, it } from "vitest";
import { createCheckModifyCriterionsetRelationsHandler } from "../../../../src/products/check/tools/modify-criterionset-relations.js";

describe("createCheckModifyCriterionsetRelationsHandler", () => {
  it("previews criterionset relation mutations by default without calling the client", async () => {
    const handler = createCheckModifyCriterionsetRelationsHandler({
      modifyCriterionsetRelations: async () => {
        throw new Error("dry run should not modify criterionset relations");
      }
    });

    const result = await handler({
      set_id: "ruleset-1",
      operator: "szh",
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "disable"
        }
      ]
    });

    expect(result.content[0]?.text).toContain("Dry run: modify Check criterionset ruleset-1 relations");
    expect(result.structuredContent.item).toEqual({
      id: "ruleset-1",
      setId: "ruleset-1",
      operator: "szh",
      showToolVersions: undefined,
      criterionCount: 1,
      criterionIds: ["criterion-1"],
      raw: undefined,
      executed: false
    });
  });

  it("executes criterionset relation mutations only when dry_run is false", async () => {
    let request: unknown;
    const handler = createCheckModifyCriterionsetRelationsHandler({
      modifyCriterionsetRelations: async (input) => {
        request = input;
        return {
          set_id: input.set_id,
          raw: {
            status: "success"
          }
        };
      }
    });

    const result = await handler({
      set_id: "ruleset-1",
      operator: "szh",
      show_tool_versions: ["java:1.0"],
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "enable"
        }
      ],
      dry_run: false
    });

    expect(request).toEqual({
      set_id: "ruleset-1",
      operator: "szh",
      show_tool_versions: ["java:1.0"],
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "enable"
        }
      ],
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Modified Check criterionset ruleset-1 relations");
    expect(result.structuredContent.item).toEqual({
      id: "ruleset-1",
      setId: "ruleset-1",
      operator: "szh",
      showToolVersions: ["java:1.0"],
      criterionCount: 1,
      criterionIds: ["criterion-1"],
      raw: {
        status: "success"
      },
      executed: true
    });
  });
});
