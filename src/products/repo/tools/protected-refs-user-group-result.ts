import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";

type ProtectedRefsUserGroup = {
  id: number | string;
  name?: string;
};

export function mapProtectedRefsUserGroups(
  summary: string,
  items: ProtectedRefsUserGroup[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      name: item.name
    })),
    toPageInfo(page, pageSize, total)
  );
}
