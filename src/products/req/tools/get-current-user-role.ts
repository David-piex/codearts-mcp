import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetCurrentUserRoleInput } from "../schemas.js";

type ReqCurrentUserRole = {
  project_id: string;
  user_role?: number;
};

export function mapReqCurrentUserRole(input: ReqCurrentUserRole) {
  return asItemResult(`Loaded current user role for ${input.project_id}`, {
    projectId: input.project_id,
    userRole: input.user_role
  });
}

type ReqGetCurrentUserRoleClient = {
  getCurrentUserRole: (input: { project_id: string }) => Promise<ReqCurrentUserRole>;
};

export function createReqGetCurrentUserRoleHandler(client: ReqGetCurrentUserRoleClient) {
  return async (input: unknown) => {
    const parsed = reqGetCurrentUserRoleInput.parse(input);
    const response = await client.getCurrentUserRole(parsed);
    const result = mapReqCurrentUserRole(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
