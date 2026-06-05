import { asItemResult } from "../../../contracts/tool-result.js";
import type {
  RepoAssociateGroupUserGroupResult,
  RepoGroupSettingsInheritCfg,
  RepoRepositorySummary
} from "../client.js";

export function mapGroupSummary(summary: string, input: RepoRepositorySummary) {
  return asItemResult(summary, {
    id: input.id !== undefined ? String(input.id) : undefined,
    name: input.name,
    path: input.path,
    fullName: input.full_name,
    fullPath: input.full_path,
    description: input.description,
    visibility: input.visibility,
    visibilityLevel: input.visibility_level,
    parentId: input.parent_id !== undefined ? String(input.parent_id) : undefined,
    projectId: input.project_id,
    projectName: input.project_name,
    membersCount: input.members_count,
    repositoryCount: input.repository_count,
    subgroupCount: input.subgroup_count,
    starCount: input.star_count,
    starred: input.starred,
    ancestorIds: (input.ancestor_ids ?? []).map((item) => String(item)),
    ancestorNames: input.ancestor_names ?? [],
    openMergeRequestsCount: input.sum?.open_merge_requests_count ?? input.open_merge_requests_count
  });
}

export function previewGroupMutation(summary: string, input: Record<string, unknown>) {
  return asItemResult(summary, {
    ...input,
    executed: false
  });
}

export function mapGroupSettingsInheritCfg(summary: string, input: RepoGroupSettingsInheritCfg) {
  return asItemResult(summary, {
    id: input.id !== undefined ? String(input.id) : undefined,
    productId: input.product_id,
    namespaceId: input.namespace_id !== undefined ? String(input.namespace_id) : undefined,
    parentId: input.parent_id !== undefined ? String(input.parent_id) : undefined,
    canUpdate: input.can_update,
    ownership: input.ownership,
    pbi: input.pbi,
    protectedBranches: input.protected_branches,
    protectedTags: input.protected_tags,
    pushRules: input.push_rules,
    changeRequests: input.change_requests,
    customCtrlItems: input.custom_ctrl_items,
    reviews: input.reviews,
    issues: input.issues,
    crEvaluation: input.cr_evaluation,
    e2eSettings: input.e2e_settings,
    committerSettings: input.committer_settings,
    webhookSettings: input.webhook_settings,
    streamEventSettings: input.stream_event_settings,
    pipelineSettings: input.pipeline_settings,
    issueTemplates: input.issue_templates,
    crCommentTemplates: input.cr_comment_templates,
    mergeRequests: input.merge_requests,
    mrBranchPolicies: input.mr_branch_policies,
    repositorySettings: input.repository_settings,
    deployKeys: input.deploy_keys,
    watermark: input.watermark,
    createdAt: input.created_at,
    updatedAt: input.update_at
  });
}

export function mapAssociateGroupUserGroupResult(
  summary: string,
  input: RepoAssociateGroupUserGroupResult
) {
  return asItemResult(summary, {
    success: (input.success ?? []).map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      name: item.name,
      iamId: item.iam_id
    })),
    failure: (input.failure ?? []).map((item) => ({
      iamId: item.iam_id,
      messages: item.message ?? []
    }))
  });
}
