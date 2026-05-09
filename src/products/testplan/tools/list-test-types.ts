import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTestTypesInput } from "../schemas.js";

export function mapTestPlanTestTypes(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} test types found`,
    items.map((item) => ({
      id: String(item.uri ?? item.type_uri ?? item.id ?? item.code ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      type: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListTestTypesClient = {
  listTestTypes: (input: {
    project_id: string;
  }) => Promise<{
    types: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestTypesHandler(client: TestPlanListTestTypesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListTestTypesInput.parse(input);
    const response = await client.listTestTypes(parsed);
    const result = mapTestPlanTestTypes(response.types, response.total);
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
