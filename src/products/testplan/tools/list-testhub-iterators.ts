import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTesthubIteratorsInput } from "../schemas.js";

export function mapTestPlanTesthubIterators(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} testhub iterators found`,
    items.map((item) => ({
      id: String(item.uri ?? item.iterator_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      currentStage:
        typeof item.current_stage === "string" ? item.current_stage : undefined,
      iterator: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTesthubIteratorsClient = {
  listTesthubIterators: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    current_stage?: string;
    branch_uri?: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTesthubIteratorsHandler(
  client: TestPlanListTesthubIteratorsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTesthubIteratorsInput.parse(input);
    const response = await client.listTesthubIterators(parsed);
    const result = mapTestPlanTesthubIterators(
      response.iterators,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        {
          label: "currentStage",
          get: (item) => (item as { currentStage?: string }).currentStage
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
