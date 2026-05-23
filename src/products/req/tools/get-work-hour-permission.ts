import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkHourPermissionInput } from "../schemas.js";

export function mapReqWorkHourPermission(input: {
  project_id: string;
  work_item_id: string;
  is_history_processor?: boolean;
}) {
  return asItemResult(`Loaded work hour permission for ${input.work_item_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    isHistoryProcessor: input.is_history_processor
  });
}

type ReqGetWorkHourPermissionClient = {
  getWorkHourPermission: (input: { project_id: string; work_item_id: string }) => Promise<{
    project_id: string;
    work_item_id: string;
    is_history_processor?: boolean;
  }>;
};

export function createReqGetWorkHourPermissionHandler(
  client: ReqGetWorkHourPermissionClient
) {
  return async (input: unknown) => {
    const parsed = reqGetWorkHourPermissionInput.parse(input);
    const response = await client.getWorkHourPermission(parsed);
    const result = mapReqWorkHourPermission(response);
    const text = [
      result.summary,
      `projectId: ${response.project_id}`,
      `workItemId: ${response.work_item_id}`,
      `isHistoryProcessor: ${String(response.is_history_processor)}`
    ].join("\n");

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
