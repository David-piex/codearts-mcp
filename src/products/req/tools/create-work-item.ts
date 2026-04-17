import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateWorkItemInput } from "../schemas.js";

export function previewCreateWorkItem(input: {
  project_id: string;
  title: string;
  work_item_type: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
    executed: !input.dry_run
  });
}

export function mapCreatedWorkItem(input: {
  id: number | string;
  name: string;
  description?: string;
  status?: { id?: number; name?: string };
  tracker?: { id?: number; name?: string };
}) {
  return asItemResult(`Created work item ${input.name}`, {
    id: String(input.id),
    title: input.name,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    executed: true
  });
}

type ReqCreateWorkItemClient = {
  createWorkItem: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    description?: string;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
};

export function createReqCreateWorkItemHandler(client: ReqCreateWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItem(parsed);
    const result = mapCreatedWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
