import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetExtensionModuleInput } from "../schemas.js";
import {
  normalizePipelineExtensionModule,
  type PipelineExtensionModule
} from "./extension-shared.js";

export function mapPipelineExtensionModuleDetail(
  moduleId: string,
  modules: PipelineExtensionModule[]
) {
  return asItemResult(`Loaded pipeline extension module ${moduleId}`, {
    id: moduleId,
    moduleId,
    versionCount: modules.length,
    versions: modules.map((module) => normalizePipelineExtensionModule(module))
  });
}

type PipelineGetExtensionModuleClient = {
  getExtensionModule: (input: { module_id: string }) => Promise<{
    modules: PipelineExtensionModule[];
  }>;
};

export function createPipelineGetExtensionModuleHandler(
  client: PipelineGetExtensionModuleClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetExtensionModuleInput.parse(input);
    const response = await client.getExtensionModule(parsed);
    const result = mapPipelineExtensionModuleDetail(parsed.module_id, response.modules);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
