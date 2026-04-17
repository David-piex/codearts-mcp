import type { PageInfo } from "../../contracts/tool-result.js";

export function toPageInfo(page: number, pageSize: number, total?: number): PageInfo {
  return { page, pageSize, total };
}
