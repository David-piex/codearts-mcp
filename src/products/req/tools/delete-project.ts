import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteProjectInput } from "../schemas.js";

export function previewDeleteProject(input: {
  project_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Deleted";

  return asItemResult(`${mode}: delete project ${input.project_id}`, {
    id: input.project_id,
    deleted: false,
    executed: !input.dry_run
  });
}

export function mapDeletedProject(input: {
  project_id: string;
}) {
  return asItemResult(`Deleted project ${input.project_id}`, {
    id: input.project_id,
    deleted: true,
    executed: true
  });
}

type ReqDeleteProjectClient = {
  deleteProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    deleted: true;
  }>;
};

export function createReqDeleteProjectHandler(client: ReqDeleteProjectClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteProjectInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProject(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProject(parsed);
    const result = mapDeletedProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
