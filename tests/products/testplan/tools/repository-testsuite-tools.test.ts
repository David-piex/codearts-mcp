import { describe, expect, it } from "vitest";
import { createTestPlanCreateRepositoryTestsuiteHandler } from "../../../../src/products/testplan/tools/repository-testsuite-tools.js";

describe("testplan repository testsuite tools", () => {
  it("returns dry-run preview by default", async () => {
    const handler = createTestPlanCreateRepositoryTestsuiteHandler({
      createRepositoryTestsuite: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      x_auth_token: "token-1",
      testsuite_name: "suite-a",
      repository_id: "repo-1",
      repository_branch: "master",
      file_path: "/api/swagger.yaml"
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      testsuiteName: "suite-a",
      repositoryId: "repo-1",
      repositoryBranch: "master",
      filePath: "/api/swagger.yaml",
      executed: false
    });
  });

  it("creates repository testsuite when dry_run is false", async () => {
    const handler = createTestPlanCreateRepositoryTestsuiteHandler({
      createRepositoryTestsuite: async (input) => ({
        testsuite_id: "suite-1",
        testsuite_name: input.testsuite_name,
        testcase_ids: ["case-1", "case-2"],
        raw: { testsuite_id: "suite-1", testcase_ids: ["case-1", "case-2"] }
      })
    });

    const result = await handler({
      project_id: "project-1",
      x_auth_token: "token-1",
      testsuite_name: "suite-a",
      repository_id: "repo-1",
      repository_branch: "master",
      file_path: "/api/swagger.yaml",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "suite-1",
      testsuiteId: "suite-1",
      testsuiteName: "suite-a",
      testcaseIds: ["case-1", "case-2"],
      executed: true
    });
  });
});
