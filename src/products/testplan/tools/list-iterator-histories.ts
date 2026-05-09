import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListIteratorHistoriesInput } from "../schemas.js";

export function mapTestPlanIteratorHistories(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan iterator histories found`,
    items.map((item) => ({
      id: String(item.uri ?? item.id ?? item.history_id ?? ""),
      operator: typeof item.operator === "string" ? item.operator : undefined,
      description:
        typeof item.description === "string" ? item.description : undefined,
      history: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListIteratorHistoriesClient = {
  listIteratorHistories: (input: {
    project_id: string;
    iterator_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListIteratorHistoriesHandler(
  client: TestPlanListIteratorHistoriesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorHistoriesInput.parse(input);
    const response = await client.listIteratorHistories(parsed);
    const result = mapTestPlanIteratorHistories(
      response.histories,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "operator", get: (item) => (item as { operator?: string }).operator },
        {
          label: "description",
          get: (item) => (item as { description?: string }).description
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
