import { checkListTaskRepositoryBranchesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskRepositoryBranches: (input: {
    task_id: string;
    page: number;
    page_size: number;
    is_uncreated_only?: boolean;
    search?: string;
    repo_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskRepositoryBranchesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskRepositoryBranchesInput.parse(input);
    const response = await client.listTaskRepositoryBranches(parsed);
    const result = mapCheckRecordList(
      response.branches,
      response.total,
      "task repository branches",
      "branch"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
