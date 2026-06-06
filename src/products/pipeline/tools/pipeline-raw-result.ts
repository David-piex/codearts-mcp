import { asItemResult, asListResult, type ToolResult } from "../../../contracts/tool-result.js";
import { formatItemToolText, formatListToolText } from "../../../contracts/tool-result-text.js";

type RawRecord = Record<string, unknown>;

function readString(input: unknown) {
  return typeof input === "string" ? input : undefined;
}

function readRecordId(record: RawRecord, fallback = "") {
  return String(
      record.id ??
      record.uuid ??
      record.pipelineId ??
      record.pipeline_id ??
      record.pipeline_run_id ??
      record.build_id ??
      record.record_id ??
      record.name ??
      fallback
  );
}

function readRecordName(record: RawRecord) {
  return readString(record.name) ?? readString(record.display_name) ?? readString(record.title);
}

export function mapPipelineRawItem(summary: string, id: string, key: string, raw: RawRecord) {
  return asItemResult(summary, {
    id,
    name: readRecordName(raw),
    [key]: raw
  });
}

export function formatPipelineRawItemText<T extends { id?: string; name?: string }>(
  result: ToolResult<T>
) {
  return formatItemToolText(result, {
    fields: [
      { label: "id", get: (item) => item.id },
      { label: "name", get: (item) => item.name }
    ]
  });
}

export function mapPipelineRawList(
  records: RawRecord[],
  total: number | undefined,
  noun: string,
  key: string,
  page = 1,
  pageSize = records.length || total || 1
) {
  return asListResult(
    `Loaded ${records.length} ${noun}`,
    records.map((record, index) => ({
      id: readRecordId(record, String(index + 1)),
      name: readRecordName(record),
      [key]: record
    })),
    {
      page,
      pageSize,
      total
    }
  );
}

export function formatPipelineRawListText<T extends { id?: string; name?: string }>(
  result: ToolResult<T>
) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => item.id },
      { label: "name", get: (item) => item.name }
    ]
  });
}
