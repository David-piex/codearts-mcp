import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoRelatedWorkItem } from "../client.js";

export function mapRelatedWorkItem(item: RepoRelatedWorkItem) {
  return {
    relatedId: item.related_id === undefined ? undefined : String(item.related_id),
    relatedUrl: item.related_url,
    id: item.id === undefined ? undefined : String(item.id),
    subject: item.subject,
    title: item.title,
    url: item.url
  };
}

export function mapRelatedWorkItemsList(
  summary: string,
  items: RepoRelatedWorkItem[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapRelatedWorkItem),
    toPageInfo(page, pageSize, total)
  );
}
