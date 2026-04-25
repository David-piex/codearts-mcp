import { describe, expect, it } from "vitest";
import { reqListIpdIssuesInput } from "../../../../src/products/req/schemas/ipd.js";

describe("Req IPD schemas", () => {
  it("validates list issue filter conditions with official condition shape", () => {
    const parsed = reqListIpdIssuesInput.parse({
      project_id: "project-1",
      issue_type: "IR",
      filter: [
        {
          status: {
            values: ["new", "doing"],
            operator: "in",
            display_name: "状态"
          }
        }
      ]
    });

    expect(parsed.filter?.[0].status).toEqual({
      values: ["new", "doing"],
      operator: "in",
      display_name: "状态"
    });
  });

  it("rejects free-form scalar filter values for list issue input", () => {
    expect(() =>
      reqListIpdIssuesInput.parse({
        project_id: "project-1",
        issue_type: "IR",
        filter: [{ status: "new" }]
      })
    ).toThrow();
  });
});
