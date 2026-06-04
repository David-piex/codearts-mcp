import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchUpdateWorkItemsV2TokenInput } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewBatchUpdateWorkItemsV2Token(input: {
  project_id: string;
  work_item_ids: string[];
  assigned_to_id?: string;
  x_auth_token: string;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: batch update ${input.work_item_ids.length} work items through V2 token-header endpoint`,
    {
      projectId: input.project_id,
      workItemIds: input.work_item_ids,
      assignedToId: input.assigned_to_id,
      xAuthToken: redactToken(input.x_auth_token),
      endpoint: "/v2/workitem/issues",
      executed: false
    }
  );
}

export function mapBatchUpdatedWorkItemsV2Token(input: {
  project_id: string;
  work_item_ids: string[];
  assigned_to_id?: string;
  status?: string;
  project?: {
    id?: number;
    identifier?: string;
    total?: number;
    close?: number;
    role?: number;
    type?: string;
    archive?: boolean;
    mem_count?: number;
  };
  journal_ids: string[];
  error_issues: Array<number | string>;
  versions_issues: string[];
  success_issues: string[];
  raw?: unknown;
}) {
  return asItemResult("Updated work items through V2 token-header endpoint", {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    assignedToId: input.assigned_to_id,
    status: input.status,
    project: input.project,
    journalIds: input.journal_ids,
    errorIssues: input.error_issues.map((item) => String(item)),
    versionsIssues: input.versions_issues,
    successIssues: input.success_issues,
    executed: true
  }, input.raw);
}

type ReqBatchUpdateWorkItemsV2TokenClient = {
  batchUpdateWorkItemsV2Token: (input: {
    project_id: string;
    work_item_ids: string[];
    assigned_to_id?: string;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    assigned_to_id?: string;
    status?: string;
    project?: {
      id?: number;
      identifier?: string;
      total?: number;
      close?: number;
      role?: number;
      type?: string;
      archive?: boolean;
      mem_count?: number;
    };
    journal_ids: string[];
    error_issues: Array<number | string>;
    versions_issues: string[];
    success_issues: string[];
    raw?: unknown;
  }>;
};

export function createReqBatchUpdateWorkItemsV2TokenHandler(client: ReqBatchUpdateWorkItemsV2TokenClient) {
  return async (input: unknown) => {
    const parsed = reqBatchUpdateWorkItemsV2TokenInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchUpdateWorkItemsV2Token(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateWorkItemsV2Token(parsed);
    const result = mapBatchUpdatedWorkItemsV2Token(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
