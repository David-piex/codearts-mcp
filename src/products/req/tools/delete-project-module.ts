import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteProjectModuleInput } from "../schemas.js";

export function previewDeleteProjectModule(input: {
  project_id: string;
  module_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete project module ${input.module_id}`, {
    id: input.module_id,
    projectId: input.project_id,
    deleted: false,
    executed: false
  });
}

type ReqDeleteProjectModuleClient = {
  deleteProjectModule: (input: {
    project_id: string;
    module_id: string;
  }) => Promise<{
    project_id: string;
    module_id: string;
    deleted: true;
  }>;
};

export function createReqDeleteProjectModuleHandler(client: ReqDeleteProjectModuleClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteProjectModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProjectModule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectModule(parsed);
    const result = asItemResult(`Deleted project module ${response.module_id}`, {
      id: response.module_id,
      projectId: response.project_id,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
