import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateProjectStatusConfigInput } from "../schemas.js";
import { mapStatusMutationResult } from "./status-config-mappers.js";

export function previewCreateProjectStatusConfig(input: {
  project_id: string;
  defined_name: string;
  status_attribute: number;
  description?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create project status config ${input.defined_name}`, {
    projectId: input.project_id,
    definedName: input.defined_name,
    description: input.description,
    statusAttribute: input.status_attribute,
    executed: false
  });
}

type ReqCreateProjectStatusConfigClient = {
  createProjectStatusConfig: (input: {
    project_id: string;
    defined_name: string;
    status_attribute: number;
    description?: string;
  }) => Promise<{
    status?: string;
    result?: Record<string, unknown>;
  }>;
};

export function createReqCreateProjectStatusConfigHandler(
  client: ReqCreateProjectStatusConfigClient
) {
  return async (input: unknown) => {
    const parsed = reqCreateProjectStatusConfigInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateProjectStatusConfig(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectStatusConfig(parsed);
    const result = mapStatusMutationResult(
      `Created project status config ${parsed.defined_name}`,
      {
        project_id: parsed.project_id,
        status: response.status,
        result: response.result
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
