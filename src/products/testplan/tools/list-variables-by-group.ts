import { testPlanListVariablesByGroupInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listVariablesByGroup: (input: {
    project_id: string;
    group_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{ variables: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListVariablesByGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariablesByGroupInput.parse(input);
    const response = await client.listVariablesByGroup(parsed);
    const result = mapTestPlanRecordList(
      response.variables,
      response.total,
      "variables by group",
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
