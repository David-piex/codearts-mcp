import { asItemResult } from "../../../contracts/tool-result.js";
import { reqAddProjectMemberInput } from "../schemas.js";

export function previewAddProjectMember(input: {
  project_id: string;
  user_id: string;
  domain_id: string;
  role_id?: number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: add member ${input.user_id} to project ${input.project_id}`, {
    projectId: input.project_id,
    userId: input.user_id,
    domainId: input.domain_id,
    roleId: input.role_id,
    added: false,
    executed: false
  });
}

export function mapAddedProjectMember(input: {
  project_id: string;
  user_id: string;
  domain_id: string;
  role_id?: number;
}) {
  return asItemResult(`Added member ${input.user_id} to project ${input.project_id}`, {
    projectId: input.project_id,
    userId: input.user_id,
    domainId: input.domain_id,
    roleId: input.role_id,
    added: true,
    executed: true
  });
}

type ReqAddProjectMemberClient = {
  addProjectMember: (input: {
    project_id: string;
    user_id: string;
    domain_id: string;
    role_id?: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    domain_id: string;
    role_id?: number;
    added: true;
  }>;
};

export function createReqAddProjectMemberHandler(client: ReqAddProjectMemberClient) {
  return async (input: unknown) => {
    const parsed = reqAddProjectMemberInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddProjectMember(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addProjectMember(parsed);
    const result = mapAddedProjectMember(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
