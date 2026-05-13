import { testPlanListVariableGroupsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listVariableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ groups: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListVariableGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariableGroupsInput.parse(input);
    const response = await client.listVariableGroups(parsed);
    const result = mapTestPlanRecordList(
      response.groups,
      response.total,
      "variable groups",
      "group",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
