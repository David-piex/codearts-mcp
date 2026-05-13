import { testPlanListApiTestVariablesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestVariables: (input: {
    project_id: string;
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ variables: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestVariablesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestVariablesInput.parse(input);
    const response = await client.listApiTestVariables(parsed);
    const result = mapTestPlanRecordList(
      response.variables,
      response.total,
      "API test variables",
      "variable",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
