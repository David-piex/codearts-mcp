import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListExtensionModulesInput } from "../schemas.js";
import {
  normalizePipelineExtensionModule,
  type PipelineExtensionModule
} from "./extension-shared.js";

export function mapPipelineExtensionModuleList(
  modules: PipelineExtensionModule[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${modules.length} pipeline extension modules`,
    modules.map((module) => normalizePipelineExtensionModule(module)),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListExtensionModulesClient = {
  listExtensionModules: (input: {
    locations: string[];
    project_id?: string;
    region_name?: string;
    name?: string;
    product_line?: string;
    tags?: string[];
    offset?: number;
    limit?: number;
  }) => Promise<{
    modules: PipelineExtensionModule[];
    total: number;
  }>;
};

export function createPipelineListExtensionModulesHandler(
  client: PipelineListExtensionModulesClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListExtensionModulesInput.parse(input);
    const response = await client.listExtensionModules(parsed);
    const result = mapPipelineExtensionModuleList(
      response.modules,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
