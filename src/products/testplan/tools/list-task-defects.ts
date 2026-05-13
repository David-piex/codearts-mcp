import { testPlanListTaskDefectsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListTaskDefectsClient = {
  listTaskDefects: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    version_uri?: string;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTaskDefectsHandler(client: TestPlanListTaskDefectsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListTaskDefectsInput.parse(input);
    const response = await client.listTaskDefects(parsed);
    const result = mapTestPlanRecordList(
      response.defects,
      response.total,
      "task defects",
      "defect",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
