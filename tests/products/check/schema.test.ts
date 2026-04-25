import { describe, expect, it } from "vitest";
import {
  checkCreateTaskInput,
  checkListTaskIssuesInput,
  checkRunTaskInput
} from "../../../src/products/check/schemas.js";

describe("check schemas", () => {
  it("accepts create task resource and path fields", () => {
    const parsed = checkCreateTaskInput.parse({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist"
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
      dry_run: true
    });
  });

  it("accepts run task ref field", () => {
    const parsed = checkRunTaskInput.parse({
      task_id: "task-1",
      ref: "refs/merge-requests/12/head"
    });

    expect(parsed).toMatchObject({
      task_id: "task-1",
      ref: "refs/merge-requests/12/head",
      dry_run: true
    });
  });

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
