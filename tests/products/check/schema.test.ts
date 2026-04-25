import { describe, expect, it } from "vitest";
import { checkListTaskIssuesInput } from "../../../src/products/check/schemas.js";

describe("check schemas", () => {
  it("accepts task issue filter query fields", () => {
    const parsed = checkListTaskIssuesInput.parse({
      task_id: "task-1",
      severity: "1",
      defect_level: "2",
      rule_id: "rule-1",
      rule_name: "NullPointer",
      file_path: "src/App.java",
      status: "open",
      checker: "java"
    });

    expect(parsed).toMatchObject({
      task_id: "task-1",
      severity: "1",
      defect_level: "2",
      rule_id: "rule-1",
      rule_name: "NullPointer",
      file_path: "src/App.java",
      status: "open",
      checker: "java",
      page: 1,
      page_size: 20
    });
  });
});
