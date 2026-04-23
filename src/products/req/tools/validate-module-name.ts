import { asItemResult } from "../../../contracts/tool-result.js";
import { reqValidateModuleNameInput } from "../schemas.js";

export function mapValidatedModuleName(input: {
  project_id: string;
  module_name: string;
  exist: boolean;
}) {
  return asItemResult(
    input.exist
      ? `Module name ${input.module_name} already exists in project ${input.project_id}`
      : `Module name ${input.module_name} is available in project ${input.project_id}`,
    {
      projectId: input.project_id,
      moduleName: input.module_name,
      exists: input.exist,
      available: !input.exist
    }
  );
}

type ReqValidateModuleNameClient = {
  validateModuleName: (input: { project_id: string; module_name: string }) => Promise<{
    exist: boolean;
  }>;
};

export function createReqValidateModuleNameHandler(client: ReqValidateModuleNameClient) {
  return async (input: unknown) => {
    const parsed = reqValidateModuleNameInput.parse(input);
    const response = await client.validateModuleName(parsed);
    const result = mapValidatedModuleName({
      project_id: parsed.project_id,
      module_name: parsed.module_name,
      exist: response.exist
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
