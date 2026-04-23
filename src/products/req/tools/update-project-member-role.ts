import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateProjectMemberRoleInput } from "../schemas.js";

export function previewUpdateProjectMemberRole(input: {
  project_id: string;
  user_id: string;
  role_id: number;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: update member ${input.user_id} role in project ${input.project_id}`,
    {
      projectId: input.project_id,
      userId: input.user_id,
      roleId: input.role_id,
      updated: false,
      executed: false
    }
  );
}

export function mapUpdatedProjectMemberRole(input: {
  project_id: string;
  user_id: string;
  role_id: number;
}) {
  return asItemResult(`Updated member ${input.user_id} role in project ${input.project_id}`, {
    projectId: input.project_id,
    userId: input.user_id,
    roleId: input.role_id,
    updated: true,
    executed: true
  });
}

type ReqUpdateProjectMemberRoleClient = {
  updateProjectMemberRole: (input: {
    project_id: string;
    user_id: string;
    role_id: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    role_id: number;
    updated: true;
  }>;
};

export function createReqUpdateProjectMemberRoleHandler(client: ReqUpdateProjectMemberRoleClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateProjectMemberRoleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProjectMemberRole(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectMemberRole(parsed);
    const result = mapUpdatedProjectMemberRole(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
