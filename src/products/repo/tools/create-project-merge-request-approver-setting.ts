import type { RepoApproverSettings } from "../client.js";
import { repoCreateProjectMergeRequestApproverSettingInput } from "../schemas.js";
import {
  mapApproverSettings,
  previewApproverSettingsMutation
} from "./merge-request-settings-result.js";

type RepoCreateProjectMergeRequestApproverSettingClient = {
  createProjectMergeRequestApproverSetting: (input: {
    project_id: string;
    id?: string;
    target?: string;
    target_type?: "branch";
    is_use_approval?: boolean;
    approval_required_reviewers?: number;
    approval_required_approvers?: number;
    reset_approvals_on_push?: boolean;
    reset_reviewers_on_push?: boolean;
    approvers_from_project?: boolean;
    append_reviewer_ids?: string[];
    append_reviewers?: Array<Record<string, unknown>>;
    append_approver_ids?: string[];
    append_approvers?: Array<Record<string, unknown>>;
    only_merge_when_pipeline_pass?: boolean;
    assignee_ids?: string[];
    assignees?: Array<Record<string, unknown>>;
    approver_ids?: string[];
    approvers?: Array<Record<string, unknown>>;
    reviewer_ids?: string[];
    reviewers?: Array<Record<string, unknown>>;
  }) => Promise<RepoApproverSettings>;
};

export function createRepoCreateProjectMergeRequestApproverSettingHandler(client: RepoCreateProjectMergeRequestApproverSettingClient) {
  return async (input: unknown) => {
    const parsed = repoCreateProjectMergeRequestApproverSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = previewApproverSettingsMutation("Dry run: create project merge request approver setting", {
        projectId: parsed.project_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectMergeRequestApproverSetting(parsed);
    const result = mapApproverSettings("project", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
