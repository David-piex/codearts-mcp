import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListProjectTagsInput } from "../schemas.js";

export function mapTestPlanProjectTags(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} project tags found`,
    items.map((item) => ({
      id: String(item.uri ?? item.id ?? item.label_id ?? item.name ?? ""),
      name:
        typeof item.label_name === "string"
          ? item.label_name
          : typeof item.name === "string"
            ? item.name
            : undefined,
      tag: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListProjectTagsClient = {
  listProjectTags: (input: {
    project_id: string;
    resource_type: string;
  }) => Promise<{
    tags: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectTagsHandler(client: TestPlanListProjectTagsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectTagsInput.parse(input);
    const response = await client.listProjectTags(parsed);
    const result = mapTestPlanProjectTags(response.tags, response.total);
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
