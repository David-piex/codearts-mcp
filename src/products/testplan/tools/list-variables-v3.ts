import { testPlanListVariablesV3Input } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listVariablesV3: (input: {
    project_id: string;
    group_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{ variables: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListVariablesV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariablesV3Input.parse(input);
    const response = await client.listVariablesV3(parsed);
    const result = mapTestPlanRecordList(
      response.variables,
      response.total,
      "v3 variables",
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
