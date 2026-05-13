import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTesthubIteratorsV5Input } from "../schemas.js";

export function mapTestPlanTesthubIteratorsV5(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} testhub v5 iterators found`,
    items.map((item) => ({
      id: String(item.plan_id ?? item.uri ?? item.iterator_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      iterator: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTesthubIteratorsV5Client = {
  listTesthubIteratorsV5: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    current_stage?: string;
    branch_uri?: string;
    fix_version_ids?: string;
    query_all_version?: boolean;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTesthubIteratorsV5Handler(
  client: TestPlanListTesthubIteratorsV5Client
) {
  return async (input: unknown) => {
    const parsed = testPlanListTesthubIteratorsV5Input.parse(input);
    const response = await client.listTesthubIteratorsV5(parsed);
    const result = mapTestPlanTesthubIteratorsV5(
      response.iterators,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
