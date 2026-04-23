import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectModulesInput } from "../schemas.js";
import { mapProjectModuleItem, type ReqProjectModule } from "./project-module-mappers.js";

export function mapReqProjectModules(
  items: ReqProjectModule[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project modules found`,
    items.map(mapProjectModuleItem),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectModulesClient = {
  listProjectModules: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    modules: ReqProjectModule[];
    total?: number;
  }>;
};

export function createReqListProjectModulesHandler(client: ReqListProjectModulesClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectModulesInput.parse(input);
    const response = await client.listProjectModules(parsed);
    const result = mapReqProjectModules(
      response.modules,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "module_id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "depth", get: (item) => (item as { depth?: number }).depth },
        { label: "isParent", get: (item) => (item as { isParent?: boolean }).isParent }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
