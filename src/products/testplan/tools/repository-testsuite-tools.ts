import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCreateRepositoryTestsuiteInput } from "../schemas.js";

type CreateRepositoryTestsuiteInput = ReturnType<typeof testPlanCreateRepositoryTestsuiteInput.parse>;

export function createTestPlanCreateRepositoryTestsuiteHandler(client: {
  createRepositoryTestsuite: (input: Omit<CreateRepositoryTestsuiteInput, "dry_run">) => Promise<{
    testsuite_id?: string;
    testsuite_name?: string;
    testcase_ids?: string[];
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateRepositoryTestsuiteInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: create repository testsuite ${parsed.testsuite_name}`, {
        projectId: parsed.project_id,
        xAuthToken: parsed.x_auth_token,
        testsuiteName: parsed.testsuite_name,
        repositoryId: parsed.repository_id,
        repositoryBranch: parsed.repository_branch,
        filePath: parsed.file_path,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRepositoryTestsuite(parsed);
    const result = asItemResult(
      `Created repository testsuite ${response.testsuite_name ?? parsed.testsuite_name}`,
      {
        id: response.testsuite_id ?? parsed.testsuite_name,
        testsuiteId: response.testsuite_id,
        projectId: parsed.project_id,
        testsuiteName: response.testsuite_name ?? parsed.testsuite_name,
        repositoryId: parsed.repository_id,
        repositoryBranch: parsed.repository_branch,
        filePath: parsed.file_path,
        testcaseIds: response.testcase_ids,
        executed: true
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
