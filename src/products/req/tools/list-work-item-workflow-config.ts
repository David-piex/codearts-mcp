import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemWorkflowConfigInput } from "../schemas.js";

export function mapReqWorkItemWorkflowConfig(
  items: Array<{
    id?: string;
    name?: string;
    status_id?: number;
    direct_to?: Array<{
      enabled?: boolean;
      id?: string;
      name?: string;
      status_id?: number;
    }>;
  }>
) {
  return asListResult(
    `${items.length} workflow statuses found`,
    items.map((item) => ({
      id: item.id,
      name: item.name,
      statusId: item.status_id,
      transitions: (item.direct_to ?? []).map((transition) => ({
        id: transition.id,
        name: transition.name,
        statusId: transition.status_id,
        enabled: transition.enabled
      }))
    }))
  );
}

type ReqListWorkItemWorkflowConfigClient = {
  listWorkItemWorkflowConfig: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    workflows: Array<{
      id?: string;
      name?: string;
      status_id?: number;
      direct_to?: Array<{
        enabled?: boolean;
        id?: string;
        name?: string;
        status_id?: number;
      }>;
    }>;
  }>;
};

export function createReqListWorkItemWorkflowConfigHandler(client: ReqListWorkItemWorkflowConfigClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemWorkflowConfigInput.parse(input);
    const response = await client.listWorkItemWorkflowConfig(parsed);
    const result = mapReqWorkItemWorkflowConfig(response.workflows);
    const text = formatListToolText(result, {
      fields: [
        { label: "statusId", get: (item) => (item as { statusId?: number }).statusId },
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
