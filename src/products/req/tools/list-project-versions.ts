import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListProjectVersionsInput } from "../schemas.js";
import type { ReqVersionItem } from "../client.js";
import { mapReqVersionItem } from "./version-mappers.js";

export function mapReqProjectVersions(items: ReqVersionItem[], total?: number) {
  return asListResult(
    `${items.length} project versions found`,
    items.map(mapReqVersionItem),
    undefined,
    { total }
  );
}

type ReqListProjectVersionsClient = {
  listProjectVersions: (input: { project_id: string }) => Promise<{
    versions: ReqVersionItem[];
    total?: number;
  }>;
};

export function createReqListProjectVersionsHandler(client: ReqListProjectVersionsClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectVersionsInput.parse(input);
    const response = await client.listProjectVersions(parsed);
    const result = mapReqProjectVersions(response.versions, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "startDate", get: (item) => (item as { startDateText?: string }).startDateText },
        { label: "dueDate", get: (item) => (item as { dueDateText?: string }).dueDateText }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
