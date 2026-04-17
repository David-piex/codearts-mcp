import { describe, expect, it } from "vitest";
import { createCheckListTaskIssuesHandler } from "../../../../src/products/check/tools/list-task-issues.js";

describe("createCheckListTaskIssuesHandler", () => {
  it("maps check task issues into MCP output", async () => {
    const handler = createCheckListTaskIssuesHandler({
      listTaskIssues: async () => ({
        issues: [
          {
            issue_id: "issue-1",
            rule_name: "NullPointer",
            severity: "MAJOR",
            file_path: "src/App.java",
            line: 42
          }
        ],
        total: 1
      })
    });

    const result = await handler({ task_id: "task-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 check issues");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "issue-1",
      ruleName: "NullPointer",
      severity: "MAJOR",
      filePath: "src/App.java",
      line: 42
    });
  });
});
