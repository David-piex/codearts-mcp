import { describe, expect, it } from "vitest";
import { createTestPlanListIssuesHandler } from "../../../../src/products/testplan/tools/list-issues.js";

describe("createTestPlanListIssuesHandler", () => {
  it("maps requirement tree into MCP output", async () => {
    const handler = createTestPlanListIssuesHandler({
      listIssues: async () => ({
        issues: [
          {
            issue_id: "req-1",
            subject: "用户登录",
            tracker_name: "Epic",
            parent_issue_id: undefined
          },
          {
            issue_id: "req-2",
            subject: "账号密码登录",
            tracker_name: "Story",
            parent_issue_id: "req-1"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "req-1",
        title: "用户登录",
        type: "Epic",
        parentId: undefined
      },
      {
        id: "req-2",
        title: "账号密码登录",
        type: "Story",
        parentId: "req-1"
      }
    ]);
  });
});
