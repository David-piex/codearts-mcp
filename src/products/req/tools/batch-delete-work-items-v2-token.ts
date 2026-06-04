import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchDeleteWorkItemsV2TokenInput } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewBatchDeleteWorkItemsV2Token(input: {
  project_id: string;
  work_item_ids: string[];
  x_auth_token: string;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: batch delete ${input.work_item_ids.length} work items through V2 token-header endpoint`,
    {
      projectId: input.project_id,
      workItemIds: input.work_item_ids,
      xAuthToken: redactToken(input.x_auth_token),
      endpoint: "/v2/workitem/batch-delete",
      deletedCount: 0,
      executed: false
    }
  );
}

export function mapBatchDeletedWorkItemsV2Token(input: {
  project_id: string;
  work_item_ids: string[];
  status?: string;
  deleted_issue_ids: string[];
  deleted_issues: Array<{
    id?: number | string;
    tracker_id?: number;
    subject?: string;
    status_id?: number;
    done_ratio?: number;
    expected_work_hours?: number | string;
    actual_work_hours?: number | string;
    deleted?: boolean;
    is_archived?: boolean;
  }>;
  raw?: unknown;
}) {
  return asItemResult("Deleted work items through V2 token-header endpoint", {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    status: input.status,
    deletedIssueIds: input.deleted_issue_ids,
    deletedIssues: input.deleted_issues,
    deletedCount: input.deleted_issue_ids.length,
    executed: true
  }, input.raw);
}

type ReqBatchDeleteWorkItemsV2TokenClient = {
  batchDeleteWorkItemsV2Token: (input: {
    project_id: string;
    work_item_ids: string[];
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    status?: string;
    deleted_issue_ids: string[];
    deleted_issues: Array<{
      id?: number | string;
      tracker_id?: number;
      subject?: string;
      status_id?: number;
      done_ratio?: number;
      expected_work_hours?: number | string;
      actual_work_hours?: number | string;
      deleted?: boolean;
      is_archived?: boolean;
    }>;
    raw?: unknown;
  }>;
};

export function createReqBatchDeleteWorkItemsV2TokenHandler(client: ReqBatchDeleteWorkItemsV2TokenClient) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteWorkItemsV2TokenInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteWorkItemsV2Token(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteWorkItemsV2Token(parsed);
    const result = mapBatchDeletedWorkItemsV2Token(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
