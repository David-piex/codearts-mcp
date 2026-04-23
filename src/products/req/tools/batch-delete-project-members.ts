import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchDeleteProjectMembersInput } from "../schemas.js";

export function previewBatchDeleteProjectMembers(input: {
  project_id: string;
  user_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: remove ${input.user_ids.length} members from project ${input.project_id}`, {
    projectId: input.project_id,
    userIds: input.user_ids,
    removedCount: 0,
    executed: false
  });
}

export function mapBatchDeletedProjectMembers(input: {
  project_id: string;
  user_ids: string[];
  removedCount: number;
}) {
  return asItemResult(`Removed ${input.removedCount} members from project ${input.project_id}`, {
    projectId: input.project_id,
    userIds: input.user_ids,
    removedCount: input.removedCount,
    executed: true
  });
}

type ReqBatchDeleteProjectMembersClient = {
  batchDeleteProjectMembers: (input: {
    project_id: string;
    user_ids: string[];
  }) => Promise<{
    project_id: string;
    user_ids: string[];
    removedCount: number;
  }>;
};

export function createReqBatchDeleteProjectMembersHandler(client: ReqBatchDeleteProjectMembersClient) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteProjectMembersInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteProjectMembers(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteProjectMembers(parsed);
    const result = mapBatchDeletedProjectMembers(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
