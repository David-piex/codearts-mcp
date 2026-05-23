import { formatListToolText } from "../../../contracts/tool-result-text.js";

export function formatSearchWorkItemsText(result: { items?: unknown[]; summary: string }) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => (item as { id?: string }).id },
      { label: "title", get: (item) => (item as { title?: string }).title },
      { label: "status", get: (item) => (item as { status?: string }).status },
      { label: "type", get: (item) => (item as { type?: string }).type },
      { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
      {
        label: "createdOn",
        get: (item) =>
          (item as { createdOnText?: string; createdOn?: string }).createdOnText ??
          (item as { createdOn?: string }).createdOn
      },
      {
        label: "updatedOn",
        get: (item) =>
          (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ??
          (item as { updatedOn?: string }).updatedOn
      }
    ]
  });
}
