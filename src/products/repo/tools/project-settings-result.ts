import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoProjectSettingsInheritCfg,
  RepoProjectSubgroupOrRepository,
  RepoWatermarkSetting
} from "../client.js";

export function mapWatermarkSetting(summary: string, item: RepoWatermarkSetting) {
  return asItemResult(summary, {
    watermark: item.watermark,
    canUpdate: item.can_update,
    viewWatermark: item.view_watermark
  });
}

export function previewProjectWatermarkMutation(input: {
  project_id: string;
  watermark: boolean;
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    watermark: input.watermark,
    executed: !input.dry_run
  };
}

export function mapProjectSubgroupOrRepository(item: RepoProjectSubgroupOrRepository) {
  return {
    id: item.id === undefined ? undefined : String(item.id),
    name: item.name,
    path: item.path,
    projectId: item.project_id,
    projectName: item.project_name,
    fullName: item.full_name,
    fullPath: item.full_path,
    descendantType: item.descendant_type,
    visibility: item.visibility,
    visibilityLevel: item.visibility_level,
    archived: item.archived,
    createdAt: item.created_at,
    updatedAtTimestamp: item.updated_at_timestamp,
    subgroupCount: item.subgroup_count,
    projectCount: item.project_count,
    httpUrlToRepo: item.http_url_to_repo,
    sshUrlToRepo: item.ssh_url_to_repo
  };
}

export function mapProjectSubgroupsAndRepositoriesList(
  summary: string,
  items: RepoProjectSubgroupOrRepository[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProjectSubgroupOrRepository),
    toPageInfo(page, pageSize, total)
  );
}

export function mapProjectSettingsInheritCfg(item: RepoProjectSettingsInheritCfg) {
  return {
    name: item.name,
    inheritMod: item.inherit_mod
  };
}

export function mapProjectSettingsInheritCfgList(
  summary: string,
  items: RepoProjectSettingsInheritCfg[],
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProjectSettingsInheritCfg),
    toPageInfo(1, items.length || total || 0, total)
  );
}

export function previewProjectSettingsInheritCfgMutation(input: {
  project_id: string;
  data: RepoProjectSettingsInheritCfg[];
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    settingCount: input.data.length,
    settings: input.data.map(mapProjectSettingsInheritCfg),
    executed: !input.dry_run
  };
}
