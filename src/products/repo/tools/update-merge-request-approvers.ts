import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateMergeRequestApproversInput } from "../schemas.js";

type Client = {
  updateMergeRequestApprovers: (input: {
    repository_id: string;
    merge_request_iid: string;
    approver_ids: string | string[];
  }) => Promise<{
    updated: boolean;
    repository_id: string;
    merge_request_iid: string;
    approver_ids: string[];
  }>;
};

export function createRepoUpdateMergeRequestApproversHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestApproversInput.parse(input);
    const approverIds = Array.isArray(parsed.approver_ids) ? parsed.approver_ids.map(String) : parsed.approver_ids.split(",").map((item) => item.trim()).filter(Boolean);
    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update merge request approvers for ${parsed.merge_request_iid}`, {
        repositoryId: parsed.repository_id,
        mergeRequestIid: parsed.merge_request_iid,
        approverIds,
        executed: false
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateMergeRequestApprovers(parsed);
    const result = asItemResult(`Updated merge request approvers for ${parsed.merge_request_iid}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      approverIds: response.approver_ids,
      executed: response.updated
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

