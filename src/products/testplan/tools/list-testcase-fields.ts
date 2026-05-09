import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTestcaseFieldsInput } from "../schemas.js";

export function mapTestPlanTestcaseFields(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} testcase fields found`,
    items.map((item) => ({
      id: String(item.uri ?? item.field_uri ?? item.id ?? item.key ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      field: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListTestcaseFieldsClient = {
  listTestcaseFields: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestcaseFieldsHandler(
  client: TestPlanListTestcaseFieldsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseFieldsInput.parse(input);
    const response = await client.listTestcaseFields(parsed);
    const result = mapTestPlanTestcaseFields(response.fields, response.total);
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
