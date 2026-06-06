import { describe, expect, it } from "vitest";
import { createTestPlanListRuleCheckViolationCasesHandler } from "../../../../src/products/testplan/tools/list-rule-check-violation-cases.js";

describe("testplan rule check violation cases handler", () => {
  it("maps rule check violation cases", async () => {
    const handler = createTestPlanListRuleCheckViolationCasesHandler({
      listRuleCheckViolationCases: async () => ({
        violations: [
          {
            uri: "violation-1",
            case_name: "case one",
            case_number: "TC-1",
            severity: 3,
            status: 0
          }
        ],
        total: 1,
        raw: { total: 1 }
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        version_uri: "version-1",
        task_uri: "task-1",
        page: 1,
        page_size: 10
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 rule check violation cases found",
        items: [
          {
            id: "violation-1",
            caseName: "case one",
            caseNumber: "TC-1",
            severity: 3,
            status: 0
          }
        ],
        page_info: {
          page: 1,
          pageSize: 10,
          total: 1
        }
      }
    });
  });
});
