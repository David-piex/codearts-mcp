import type { ToolResult } from "./tool-result.js";

type PreviewFieldGetter<T> = (item: T) => string | number | undefined;
type PreviewFieldValue = string | number | boolean | undefined;
type DetailFieldValue = string | number | boolean | undefined | null;

export function formatItemToolText<T>(
  result: ToolResult<T>,
  options: {
    fields: Array<{
      label: string;
      get: (item: T) => DetailFieldValue;
    }>;
  }
) {
  const item = result.item;

  if (!item) {
    return result.summary;
  }

  const lines = [result.summary];

  for (const field of options.fields) {
    const value = field.get(item);
    if (value === undefined || value === null || value === "") {
      continue;
    }

    lines.push(`${field.label}: ${value}`);
  }

  return lines.join("\n");
}

export function formatListToolText<T>(
  result: ToolResult<T>,
  options: {
    emptyText?: string;
    maxItems?: number;
    fields: Array<{
      label: string;
      get: (item: T) => PreviewFieldValue;
    }>;
  }
) {
  const items = result.items ?? [];
  const maxItems = options.maxItems ?? 10;

  if (items.length === 0) {
    return options.emptyText ?? result.summary;
  }

  const lines = [result.summary, ""];
  const previewItems = items.slice(0, maxItems);

  for (const item of previewItems) {
    const parts = options.fields
      .map((field) => {
        const value = field.get(item);
        if (value === undefined || value === null || value === "") {
          return undefined;
        }

        return `${field.label}: ${value}`;
      })
      .filter(Boolean);

    if (parts.length > 0) {
      lines.push(`- ${parts.join(" | ")}`);
    }
  }

  if (items.length > previewItems.length) {
    lines.push("");
    lines.push(`... and ${items.length - previewItems.length} more items in this page`);
  }

  if (result.page_info?.total !== undefined) {
    lines.push("");
    lines.push(`total: ${result.page_info.total}`);
  }

  return lines.join("\n");
}
