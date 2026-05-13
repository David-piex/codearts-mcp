import { testPlanListProjectServiceReposInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListProjectServiceReposClient = {
  listProjectServiceRepos: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    repos: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectServiceReposHandler(
  client: TestPlanListProjectServiceReposClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectServiceReposInput.parse(input);
    const response = await client.listProjectServiceRepos(parsed);
    const result = mapTestPlanRecordList(
      response.repos,
      response.total,
      "project service repos",
      "repo",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
