import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateProjectModuleInput } from "../schemas.js";
import {
  mapProjectModuleOwner,
  type ReqProjectModule
} from "./project-module-mappers.js";

export function previewCreateProjectModule(input: {
  project_id: string;
  module_name: string;
  owner_user_id: string;
  parent_module_id?: number;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create project module ${input.module_name}`, {
    projectId: input.project_id,
    name: input.module_name,
    ownerUserId: input.owner_user_id,
    parentModuleId: input.parent_module_id,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapCreatedProjectModule(input: ReqProjectModule) {
  return asItemResult(`Created project module ${input.module_name}`, {
    id: String(input.module_id),
    name: input.module_name,
    description: input.description,
    owner: mapProjectModuleOwner(input.owner),
    executed: true
  });
}

type ReqCreateProjectModuleClient = {
  createProjectModule: (input: {
    project_id: string;
    module_name: string;
    owner_user_id: string;
    parent_module_id?: number;
    description?: string;
  }) => Promise<ReqProjectModule>;
};

export function createReqCreateProjectModuleHandler(client: ReqCreateProjectModuleClient) {
  return async (input: unknown) => {
    const parsed = reqCreateProjectModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateProjectModule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectModule(parsed);
    const result = mapCreatedProjectModule(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
