import { checkListTaskBranchesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskBranches: (input: { project_id: string; task_id: string }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskBranchesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskBranchesInput.parse(input);
    const response = await client.listTaskBranches(parsed);
    const result = mapCheckRecordList(response.branches, response.total, "task branches", "branch");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
