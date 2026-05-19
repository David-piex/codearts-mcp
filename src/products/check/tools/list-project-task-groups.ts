import { checkListProjectTaskGroupsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listProjectTaskGroups: (input: { project_id: string }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListProjectTaskGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListProjectTaskGroupsInput.parse(input);
    const response = await client.listProjectTaskGroups(parsed);
    const result = mapCheckRecordList(response.groups, response.total, "project task groups", "group");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
