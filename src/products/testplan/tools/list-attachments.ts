import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListAttachmentsInput } from "../schemas.js";

export function mapTestPlanAttachments(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} attachments found`,
    items.map((item) => ({
      id: String(item.uri ?? item.id ?? item.file_id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      attachment: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListAttachmentsClient = {
  listAttachments: (input: {
    project_id: string;
    resource_uri: string;
    resource_type: string;
  }) => Promise<{
    attachments: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListAttachmentsHandler(client: TestPlanListAttachmentsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListAttachmentsInput.parse(input);
    const response = await client.listAttachments(parsed);
    const result = mapTestPlanAttachments(response.attachments, response.total);
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
