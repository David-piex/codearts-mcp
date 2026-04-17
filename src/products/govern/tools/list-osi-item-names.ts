import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { governListOsiItemNamesInput } from "../schemas.js";

export function mapGovernOsiItemNames(
  items: Array<{
    software_name?: string;
    language?: string;
    description?: string;
    version_count?: number;
    provider?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} govern osi item names found`,
    items.map((item) => ({
      id: item.software_name ?? "",
      name: item.software_name,
      language: item.language,
      description: item.description,
      versionCount: item.version_count,
      provider: item.provider
    })),
    toPageInfo(page, pageSize, total)
  );
}

type GovernListOsiItemNamesClient = {
  listOsiItemNames: (input: {
    project_id: string;
    page: number;
    page_size: number;
    software_name?: string;
    artifact_id?: string;
  }) => Promise<{
    items: Array<{
      software_name?: string;
      language?: string;
      description?: string;
      version_count?: number;
      provider?: string;
    }>;
    total?: number;
  }>;
};

export function createGovernListOsiItemNamesHandler(client: GovernListOsiItemNamesClient) {
  return async (input: unknown) => {
    const parsed = governListOsiItemNamesInput.parse(input);
    const response = await client.listOsiItemNames(parsed);
    const result = mapGovernOsiItemNames(response.items, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
