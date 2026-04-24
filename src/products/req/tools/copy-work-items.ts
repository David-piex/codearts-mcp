import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCopyWorkItemsInput } from "../schemas.js";

type ReqCopiedWorkItem = {
  id: string;
  tracker_id?: number;
  project_id?: string;
  project_uuid?: string;
  subject?: string;
  status_id?: number;
  assigned_to_id?: number;
  priority_id?: number;
  author?: number;
  created_on?: string;
  updated_on?: string;
  description?: string;
  severity_id?: number;
  expected_work_hours?: number;
  actual_work_hours?: number;
  story_point_id?: number;
  closed_flag?: number;
  is_archived?: boolean;
};

export function previewCopyWorkItems(input: {
  from_project_id: string;
  to_project_id: string;
  work_item_ids: string[];
  copy_comments?: boolean;
  copy_work_hours?: boolean;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: copy ${input.work_item_ids.length} work items to project ${input.to_project_id}`,
    {
      fromProjectId: input.from_project_id,
      toProjectId: input.to_project_id,
      workItemIds: input.work_item_ids,
      copyComments: input.copy_comments ?? false,
      copyWorkHours: input.copy_work_hours ?? false,
      successWorkItems: [],
      createdWorkItems: [],
      errorWorkItems: [],
      executed: false
    }
  );
}

export function mapCopiedWorkItems(input: {
  from_project_id: string;
  to_project_id: string;
  work_item_ids: string[];
  copy_comments?: boolean;
  copy_work_hours?: boolean;
  status?: string;
  success_work_items?: ReqCopiedWorkItem[];
  created_work_items?: ReqCopiedWorkItem[];
  error_work_items?: ReqCopiedWorkItem[];
}) {
  return asItemResult(
    `Copied ${input.work_item_ids.length} work items to project ${input.to_project_id}`,
    {
      fromProjectId: input.from_project_id,
      toProjectId: input.to_project_id,
      workItemIds: input.work_item_ids,
      copyComments: input.copy_comments ?? false,
      copyWorkHours: input.copy_work_hours ?? false,
      status: input.status,
      successWorkItems: input.success_work_items ?? [],
      createdWorkItems: input.created_work_items ?? [],
      errorWorkItems: input.error_work_items ?? [],
      executed: true
    }
  );
}

type ReqCopyWorkItemsClient = {
  copyWorkItems: (input: {
    from_project_id: string;
    to_project_id: string;
    work_item_ids: string[];
    copy_comments?: boolean;
    copy_work_hours?: boolean;
  }) => Promise<{
    from_project_id: string;
    to_project_id: string;
    work_item_ids: string[];
    copy_comments?: boolean;
    copy_work_hours?: boolean;
    status?: string;
    success_work_items?: ReqCopiedWorkItem[];
    created_work_items?: ReqCopiedWorkItem[];
    error_work_items?: ReqCopiedWorkItem[];
  }>;
};

export function createReqCopyWorkItemsHandler(client: ReqCopyWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqCopyWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCopyWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.copyWorkItems(parsed);
    const result = mapCopiedWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
