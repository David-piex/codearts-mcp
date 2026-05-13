import { asItemResult, asListResult, type ToolResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";

export function mapTestPlanRecordItem(
  summary: string,
  id: string,
  key: string,
  raw: Record<string, unknown>,
  extra: Record<string, unknown> = {}
) {
  return asItemResult(summary, {
    id,
    ...extra,
    [key]: raw
  });
}

export function mapTestPlanValueItem(
  summary: string,
  id: string,
  key: string,
  value: unknown,
  raw: Record<string, unknown>,
  extra: Record<string, unknown> = {}
) {
  return asItemResult(summary, {
    id,
    ...extra,
    value,
    [key]: raw
  });
}

export function mapTestPlanRecordList(
  items: Array<Record<string, unknown>>,
  total: number | undefined,
  noun: string,
  key: string,
  page = 1,
  pageSize = items.length || total || 1
) {
  return asListResult(
    `${items.length} ${noun} found`,
    items.map((item) => ({
      id: String(item.id ?? item.uri ?? item.uuid ?? item.name ?? item.value ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      [key]: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function formatTestPlanRecordListText<T extends { id?: string; name?: string }>(
  result: ToolResult<T>
) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => item.id },
      { label: "name", get: (item) => item.name }
    ]
  });
}
