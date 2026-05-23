import { asItemResult, asListResult, type ToolResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";

export function mapArtifactRecordItem(
  summary: string,
  id: string,
  key: string,
  raw: unknown,
  extra: Record<string, unknown> = {}
) {
  return asItemResult(summary, {
    id,
    ...extra,
    [key]: raw
  });
}

export function mapArtifactRecordList(
  items: Array<Record<string, unknown>>,
  total: number | undefined,
  noun: string,
  key: string
) {
  return asListResult(
    `${items.length} ${noun} found`,
    items.map((item) => ({
      id: String(item.id ?? item.uuid ?? item.repository_id ?? item.repo_id ?? item.repository_name ?? item.name ?? ""),
      name: typeof item.name === "string"
        ? item.name
        : typeof item.repository_name === "string"
          ? item.repository_name
          : undefined,
      [key]: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

export function formatArtifactRecordListText<T extends { id?: string; name?: string }>(
  result: ToolResult<T>
) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => item.id },
      { label: "name", get: (item) => item.name }
    ]
  });
}
