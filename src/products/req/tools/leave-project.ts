import { asItemResult } from "../../../contracts/tool-result.js";
import { reqLeaveProjectInput } from "../schemas.js";

export function previewLeaveProject(input: {
  project_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: leave project ${input.project_id}`, {
    projectId: input.project_id,
    left: false,
    executed: false
  });
}

export function mapLeftProject(input: {
  project_id: string;
}) {
  return asItemResult(`Left project ${input.project_id}`, {
    projectId: input.project_id,
    left: true,
    executed: true
  });
}

type ReqLeaveProjectClient = {
  leaveProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    left: true;
  }>;
};

export function createReqLeaveProjectHandler(client: ReqLeaveProjectClient) {
  return async (input: unknown) => {
    const parsed = reqLeaveProjectInput.parse(input);

    if (parsed.dry_run) {
      const result = previewLeaveProject(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.leaveProject(parsed);
    const result = mapLeftProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
