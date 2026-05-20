import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListFeatureCaseCountsInput } from "../schemas.js";

type Client = {
  listFeatureCaseCounts: (input: {
    project_uuid: string;
    version_uri: string;
    contain_root?: boolean;
    contain_child?: boolean;
    task_uri?: string;
    filter_child?: boolean;
    not_in_other_it?: boolean;
    condition_type?: string;
    condition_value?: string;
    test_case_conditions?: Array<Record<string, unknown>>;
    feature_uris?: string[];
    upward_recursion?: boolean;
  }) => Promise<{
    counts: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

function mapFeatureCaseCounts(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} TestPlan feature case counts found`,
    items.map((item) => ({
      id: String(item.feature_uri ?? item.uri ?? item.id ?? ""),
      featureUri: typeof item.feature_uri === "string" ? item.feature_uri : undefined,
      caseCount: typeof item.case_count === "number" ? item.case_count : undefined,
      count: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

export function createTestPlanListFeatureCaseCountsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListFeatureCaseCountsInput.parse(input);
    const response = await client.listFeatureCaseCounts(parsed);
    const result = mapFeatureCaseCounts(response.counts, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "featureUri", get: (item) => (item as { featureUri?: string }).featureUri },
        { label: "caseCount", get: (item) => (item as { caseCount?: number }).caseCount }
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
