import { testPlanListGt3kProjectServiceReposInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kProjectServiceReposClient = {
  listGt3kProjectServiceRepos: (input: {
    project_uuid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    repos: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kProjectServiceReposHandler(
  client: TestPlanListGt3kProjectServiceReposClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kProjectServiceReposInput.parse(input);
    const response = await client.listGt3kProjectServiceRepos(parsed);
    const result = mapTestPlanRecordList(
      response.repos,
      response.total,
      "GT3K project service repos",
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
