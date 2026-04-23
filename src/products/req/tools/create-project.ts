import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateProjectInput } from "../schemas.js";

export function previewCreateProject(input: {
  name: string;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create project ${input.name}`, {
    name: input.name,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapCreatedProject(input: {
  project_id: string;
  project_name: string;
  description?: string;
  project_num_id?: number;
  project_type?: string;
}) {
  return asItemResult(`Created project ${input.project_name}`, {
    id: input.project_id,
    name: input.project_name,
    description: input.description,
    numberId: input.project_num_id,
    type: input.project_type,
    executed: true
  });
}

type ReqCreateProjectClient = {
  createProject: (input: {
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
    project_num_id?: number;
    project_type?: string;
  }>;
};

export function createReqCreateProjectHandler(client: ReqCreateProjectClient) {
  return async (input: unknown) => {
    const parsed = reqCreateProjectInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateProject(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProject(parsed);
    const result = mapCreatedProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
