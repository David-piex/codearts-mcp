import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemInput } from "../schemas.js";

export function mapReqWorkItem(input: {
  id: number | string;
  subject: string;
  status?: { name?: string };
  tracker_name?: string;
  description?: string;
}) {
  return asItemResult(`Loaded work item ${input.id}`, {
    id: String(input.id),
    title: input.subject,
    status: input.status?.name,
    type: input.tracker_name,
    description: input.description
  });
}

type ReqGetWorkItemClient = {
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
    description?: string;
  }>;
};

export function createReqGetWorkItemHandler(client: ReqGetWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemInput.parse(input);
    const response = await client.getWorkItem(parsed);
    const result = mapReqWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
