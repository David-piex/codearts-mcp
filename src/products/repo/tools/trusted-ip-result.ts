import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoTenantTrustedIpAddress } from "../client.js";

export function mapTrustedIpAddress(item: RepoTenantTrustedIpAddress) {
  return {
    id: item.id === undefined ? undefined : String(item.id),
    repositoryId: item.repository_id === undefined ? undefined : String(item.repository_id),
    userId: item.user_id === undefined ? undefined : String(item.user_id),
    domainId: item.domain_id,
    ipRange: item.ip_range,
    ipType: item.ip_type,
    ipStart: item.ip_start,
    ipEnd: item.ip_end,
    viewFlag: item.view_flag,
    downloadFlag: item.download_flag,
    uploadFlag: item.upload_flag,
    remark: item.remark,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    orderFlag: item.order_flag
  };
}

export function mapTrustedIpAddressesList(
  summary: string,
  items: RepoTenantTrustedIpAddress[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(summary, items.map(mapTrustedIpAddress), toPageInfo(page, pageSize, total));
}

export function previewTrustedIpAddressMutation(input: {
  repository_id: string;
  ip_id?: string;
  ip_type?: 0 | 1 | 2;
  ip_start?: string;
  ip_end?: string;
  view_flag?: 0 | 1;
  download_flag?: 0 | 1;
  upload_flag?: 0 | 1;
  remark?: string;
  dry_run: boolean;
}) {
  return asItemResult("Trusted IP address mutation preview", {
    repositoryId: input.repository_id,
    ipId: input.ip_id,
    ipType: input.ip_type,
    ipStart: input.ip_start,
    ipEnd: input.ip_end,
    viewFlag: input.view_flag,
    downloadFlag: input.download_flag,
    uploadFlag: input.upload_flag,
    remark: input.remark,
    executed: !input.dry_run
  });
}
