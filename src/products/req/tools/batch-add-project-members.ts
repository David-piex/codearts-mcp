import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchAddProjectMembersInput } from "../schemas.js";

function mapMembers(members: Array<{ user_id: string; role_id?: number }>) {
  return members.map((member) => ({
    userId: member.user_id,
    roleId: member.role_id
  }));
}

export function previewBatchAddProjectMembers(input: {
  project_id: string;
  members: Array<{ user_id: string; role_id?: number }>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: add ${input.members.length} members to project ${input.project_id}`, {
    projectId: input.project_id,
    members: mapMembers(input.members),
    addedCount: 0,
    executed: false
  });
}

export function mapBatchAddedProjectMembers(input: {
  project_id: string;
  members: Array<{ user_id: string; role_id?: number }>;
  addedCount: number;
}) {
  return asItemResult(`Added ${input.addedCount} members to project ${input.project_id}`, {
    projectId: input.project_id,
    members: mapMembers(input.members),
    addedCount: input.addedCount,
    executed: true
  });
}

type ReqBatchAddProjectMembersClient = {
  batchAddProjectMembers: (input: {
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
  }) => Promise<{
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
    addedCount: number;
  }>;
};

export function createReqBatchAddProjectMembersHandler(client: ReqBatchAddProjectMembersClient) {
  return async (input: unknown) => {
    const parsed = reqBatchAddProjectMembersInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchAddProjectMembers(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchAddProjectMembers(parsed);
    const result = mapBatchAddedProjectMembers(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
