import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteWorkItemV3Input } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewDeleteWorkItemV3(input: {
  project_id: string;
  work_item_id: string;
  type: string;
  x_auth_token: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete CodeArts Req work item through V3 token-header endpoint", {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    type: input.type,
    xAuthToken: redactToken(input.x_auth_token),
    endpoint: "/v3/issue/delete",
    executed: false
  });
}

export function mapDeletedWorkItemV3(input: {
  project_id: string;
  work_item_id: string;
  type: string;
  status?: string;
  deleted_issues: Array<Record<string, unknown>>;
  delete_attachment_files: string[];
  issues: Array<Record<string, unknown>>;
  raw?: unknown;
}) {
  return asItemResult("Deleted CodeArts Req work item through V3 token-header endpoint", {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    type: input.type,
    status: input.status,
    deletedIssues: input.deleted_issues,
    deleteAttachmentFiles: input.delete_attachment_files,
    issues: input.issues,
    executed: true
  }, input.raw);
}

type ReqDeleteWorkItemV3Client = {
  deleteWorkItemV3: (input: {
    project_id: string;
    work_item_id: string;
    type: string;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    type: string;
    status?: string;
    deleted_issues: Array<Record<string, unknown>>;
    delete_attachment_files: string[];
    issues: Array<Record<string, unknown>>;
    raw?: unknown;
  }>;
};

export function createReqDeleteWorkItemV3Handler(client: ReqDeleteWorkItemV3Client) {
  return async (input: unknown) => {
    const parsed = reqDeleteWorkItemV3Input.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteWorkItemV3(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteWorkItemV3(parsed);
    const result = mapDeletedWorkItemV3(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
