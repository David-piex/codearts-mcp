import { testPlanListEnvironmentsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListEnvironmentsClient = {
  listEnvironments: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListEnvironmentsHandler(client: TestPlanListEnvironmentsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListEnvironmentsInput.parse(input);
    const response = await client.listEnvironments(parsed);
    const result = mapTestPlanRecordList(
      response.environments,
      response.total,
      "environments",
      "environment",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
