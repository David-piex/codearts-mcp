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

  it("accepts batch IPD issue mutation fields from the official issue entity", async () => {
    const { reqBatchCreateIpdIssuesInput, reqBatchUpdateIpdIssuesInput } = await import("../../../../src/products/req/schemas/ipd.js");

    const createParsed = reqBatchCreateIpdIssuesInput.parse({
      project_id: "project-1",
      issues: [
        {
          title: "IPD requirement",
          description: "details",
          category: "IR",
          status: "new",
          link: "https://example.com/spec",
          suspended: false,
          break_status: "none",
          baseline: "baseline-1",
          plan_end_date: 1775001600000,
          status_modified_time: "2026-04-25T00:00:00Z"
        }
      ]
    });
    expect(createParsed.issues[0]).toMatchObject({
      link: "https://example.com/spec",
      suspended: false,
      break_status: "none",
      baseline: "baseline-1",
      plan_end_date: 1775001600000,
      status_modified_time: "2026-04-25T00:00:00Z"
    });

    const updateParsed = reqBatchUpdateIpdIssuesInput.parse({
      project_id: "project-1",
      issue_ids: ["issue-1"],
      attribute: {
        category: "IR",
        link: "https://example.com/spec",
        suspended: true,
        break_status: "blocked",
        baseline: "baseline-2",
        plan_end_date: "2026-05-01",
        status_modified_time: 1775001600000
      }
    });
    expect(updateParsed.attribute).toMatchObject({
      link: "https://example.com/spec",
      suspended: true,
      break_status: "blocked",
      baseline: "baseline-2",
      plan_end_date: "2026-05-01",
      status_modified_time: 1775001600000
    });
  });
});
