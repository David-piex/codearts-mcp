import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanSearchFeaturesByCaseInput } from "../schemas.js";

type Client = {
  searchFeaturesByCase: (input: {
    project_uuid: string;
    version_uri: string;
    case_uri: string;
    service_types: number[];
  }) => Promise<{
    feature?: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
};

type FeatureTreeItem = {
  id: string;
  name?: string;
  type?: string;
  versionUri?: string;
  parentUri?: string;
  caseTotal?: number;
  hasChild?: boolean;
  feature: Record<string, unknown>;
};

function mapFeatureTree(feature: Record<string, unknown> | undefined) {
  const item = feature ?? {};

  return asItemResult("TestPlan feature tree for testcase found", {
    id: String(item.uri ?? item.id ?? ""),
    name: typeof item.name === "string" ? item.name : undefined,
    type: typeof item.type === "string" ? item.type : undefined,
    versionUri: typeof item.version_uri === "string" ? item.version_uri : undefined,
    parentUri: typeof item.parent_uri === "string" ? item.parent_uri : undefined,
    caseTotal: typeof item.case_total === "number" ? item.case_total : undefined,
    hasChild: typeof item.has_child === "boolean" ? item.has_child : undefined,
    feature: item
  });
}

export function createTestPlanSearchFeaturesByCaseHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanSearchFeaturesByCaseInput.parse(input);
    const response = await client.searchFeaturesByCase(parsed);
    const result = mapFeatureTree(response.feature);
    const item = result.item as FeatureTreeItem;
    const details = [
      item.id ? `id: ${item.id}` : undefined,
      item.name ? `name: ${item.name}` : undefined,
      item.type ? `type: ${item.type}` : undefined,
      item.caseTotal !== undefined ? `caseTotal: ${item.caseTotal}` : undefined
    ].filter(Boolean);
    const text = details.length > 0 ? `${result.summary}\n\n- ${details.join(" | ")}` : result.summary;

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
