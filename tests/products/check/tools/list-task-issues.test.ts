import { describe, expect, it } from "vitest";
import { mapCheckTaskIssues } from "../../../../src/products/check/tools/list-task-issues.js";

describe("mapCheckTaskIssues", () => {
  it("returns normalized check issues with pagination", () => {
    const result = mapCheckTaskIssues(
      [
        {
          issue_id: "issue-1",
          rule_name: "AvoidHardcode",
          severity: "major",
          file_path: "src/app.ts",
          line: 18
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "issue-1",
        ruleName: "AvoidHardcode",
        severity: "major",
        filePath: "src/app.ts",
        line: 18
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
