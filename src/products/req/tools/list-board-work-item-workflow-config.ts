import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListBoardWorkItemWorkflowConfigInput } from "../schemas.js";

export function mapReqBoardWorkItemWorkflowConfig(
  items: Array<{
    parent_name?: string;
    parent_type?: string;
    status_id?: string;
    name?: string;
    status_type?: string;
    direct_to?: Array<{
      parent_name?: string;
      parent_type?: string;
      status_id?: string;
      name?: string;
      status_type?: string;
      enabled?: boolean;
      parent_id?: string;
    }>;
    assign_to?: string;
    comment?: string;
    required_assign?: boolean;
    required_notes?: boolean;
    field_type?: boolean;
    parent_id?: string;
  }>
) {
  return asListResult(
    `${items.length} board workflow statuses found`,
    items.map((item) => ({
      parentName: item.parent_name,
      parentType: item.parent_type,
      statusId: item.status_id,
      name: item.name,
      statusType: item.status_type,
      transitions: (item.direct_to ?? []).map((transition) => ({
        parentName: transition.parent_name,
        parentType: transition.parent_type,
        statusId: transition.status_id,
        name: transition.name,
        statusType: transition.status_type,
        enabled: transition.enabled,
        parentId: transition.parent_id
      })),
      assignTo: item.assign_to,
      comment: item.comment,
      requiredAssign: item.required_assign,
      requiredNotes: item.required_notes,
      fieldType: item.field_type,
      parentId: item.parent_id
    }))
  );
}

type ReqListBoardWorkItemWorkflowConfigClient = {
  listBoardWorkItemWorkflowConfig: (input: {
    project_id: string;
    board_id: string;
  }) => Promise<{
    workflows: Array<{
      parent_name?: string;
      parent_type?: string;
      status_id?: string;
      name?: string;
      status_type?: string;
      direct_to?: Array<{
        parent_name?: string;
        parent_type?: string;
        status_id?: string;
        name?: string;
        status_type?: string;
        enabled?: boolean;
        parent_id?: string;
      }>;
      assign_to?: string;
      comment?: string;
      required_assign?: boolean;
      required_notes?: boolean;
      field_type?: boolean;
      parent_id?: string;
    }>;
  }>;
};

export function createReqListBoardWorkItemWorkflowConfigHandler(
  client: ReqListBoardWorkItemWorkflowConfigClient
) {
  return async (input: unknown) => {
    const parsed = reqListBoardWorkItemWorkflowConfigInput.parse(input);
    const response = await client.listBoardWorkItemWorkflowConfig(parsed);
    const result = mapReqBoardWorkItemWorkflowConfig(response.workflows);
    const text = formatListToolText(result, {
      fields: [
        { label: "statusId", get: (item) => (item as { statusId?: string }).statusId },
        { label: "name", get: (item) => (item as { name?: string }).name },
        {
          label: "transitionCount",
          get: (item) => (item as { transitions?: unknown[] }).transitions?.length
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
