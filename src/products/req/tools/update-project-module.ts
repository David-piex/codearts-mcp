import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateProjectModuleInput } from "../schemas.js";
import {
  mapProjectModuleOwner,
  type ReqProjectModule
} from "./project-module-mappers.js";

export function previewUpdateProjectModule(input: {
  project_id: string;
  module_id: string;
  module_name: string;
  owner_user_id: string;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: update project module ${input.module_id}`, {
    projectId: input.project_id,
    moduleId: input.module_id,
    name: input.module_name,
    ownerUserId: input.owner_user_id,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapUpdatedProjectModule(input: ReqProjectModule) {
  return asItemResult(`Updated project module ${input.module_name}`, {
    id: String(input.module_id),
    name: input.module_name,
    description: input.description,
    owner: mapProjectModuleOwner(input.owner),
    executed: true
  });
}

type ReqUpdateProjectModuleClient = {
  updateProjectModule: (input: {
    project_id: string;
    module_id: string;
    module_name: string;
    owner_user_id: string;
    description?: string;
  }) => Promise<ReqProjectModule>;
};

export function createReqUpdateProjectModuleHandler(client: ReqUpdateProjectModuleClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateProjectModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProjectModule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectModule(parsed);
    const result = mapUpdatedProjectModule(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
