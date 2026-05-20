import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanSearchFeaturesInput } from "../schemas.js";

type Client = {
  searchFeatures: (input: {
    project_uuid: string;
    version_uri: string;
    key_word: string;
    page: number;
    page_size: number;
    parent_uri?: string;
  }) => Promise<{
    features: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

function mapFeatures(
  features: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${features.length} TestPlan features found`,
    features.map((feature) => ({
      id: String(feature.uri ?? feature.id ?? ""),
      name: typeof feature.name === "string" ? feature.name : undefined,
      type: typeof feature.type === "string" ? feature.type : undefined,
      pathName: typeof feature.path_name === "string" ? feature.path_name : undefined,
      feature
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function createTestPlanSearchFeaturesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanSearchFeaturesInput.parse(input);
    const response = await client.searchFeatures(parsed);
    const result = mapFeatures(
      response.features,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "type", get: (item) => (item as { type?: string }).type },
        { label: "pathName", get: (item) => (item as { pathName?: string }).pathName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
