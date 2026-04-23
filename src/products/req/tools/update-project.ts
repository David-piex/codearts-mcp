import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateProjectInput } from "../schemas.js";

export function previewUpdateProject(input: {
  project_id: string;
  name: string;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Updated";

  return asItemResult(`${mode}: update project ${input.project_id}`, {
    id: input.project_id,
    name: input.name,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapUpdatedProject(input: {
  project_id: string;
  project_name: string;
  description?: string;
}) {
  return asItemResult(`Updated project ${input.project_id}`, {
    id: input.project_id,
    name: input.project_name,
    description: input.description,
    executed: true
  });
}

type ReqUpdateProjectClient = {
  updateProject: (input: {
    project_id: string;
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
  }>;
};

export function createReqUpdateProjectHandler(client: ReqUpdateProjectClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateProjectInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProject(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProject(parsed);
    const result = mapUpdatedProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
