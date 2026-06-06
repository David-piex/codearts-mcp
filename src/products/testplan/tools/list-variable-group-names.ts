import { testPlanListVariableGroupNamesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listVariableGroupNames: (input: {
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
    name?: string;
  }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListVariableGroupNamesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariableGroupNamesInput.parse(input);
    const response = await client.listVariableGroupNames(parsed);
    const result = mapTestPlanRecordList(
      response.groups,
      response.total,
      "TestPlan variable group names",
      "group",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
