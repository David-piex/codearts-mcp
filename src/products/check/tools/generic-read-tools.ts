import { asItemResult, asListResult, type ToolResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";

export function mapCheckRecordItem(
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

export function mapCheckRecordList(
  items: Array<Record<string, unknown>>,
  total: number | undefined,
  noun: string,
  key: string
) {
  return asListResult(
    `${items.length} ${noun} found`,
    items.map((item) => ({
      id: String(
        item.id ??
          item.uuid ??
          item.task_id ??
          item.job_id ??
          item.rule_id ??
          item.ruleId ??
          item.blockId ??
          item.block_id ??
          item.filePath ??
          item.file_path ??
          item.name ??
          item.value ??
          ""
      ),
      name: typeof item.name === "string" ? item.name : typeof item.rule_name === "string" ? item.rule_name : undefined,
      [key]: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

export function formatCheckRecordListText<T extends { id?: string; name?: string }>(
  result: ToolResult<T>
) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => item.id },
      { label: "name", get: (item) => item.name }
    ]
  });
}
