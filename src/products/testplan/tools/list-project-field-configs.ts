import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListProjectFieldConfigsInput } from "../schemas.js";

export function mapTestPlanProjectFieldConfigs(
  items: Array<Record<string, unknown>>,
  total?: number
) {
  return asListResult(
    `${items.length} project field configs found`,
    items.map((item) => ({
      id: String(item.uri ?? item.id ?? item.field_id ?? item.field_key ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      field: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListProjectFieldConfigsClient = {
  listProjectFieldConfigs: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectFieldConfigsHandler(
  client: TestPlanListProjectFieldConfigsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectFieldConfigsInput.parse(input);
    const response = await client.listProjectFieldConfigs(parsed);
    const result = mapTestPlanProjectFieldConfigs(response.fields, response.total);
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
