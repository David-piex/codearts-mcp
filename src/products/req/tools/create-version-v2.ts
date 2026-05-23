import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateVersionV2Input } from "../schemas.js";

export function previewCreateVersionV2(input: {
  project_id: string;
  name: string;
  start_date: number;
  due_date: number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create V2 version ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    startDate: input.start_date,
    dueDate: input.due_date,
    executed: false
  });
}

export function mapCreatedVersionV2(input: {
  id: number | string;
  project_id: string;
  name: string;
  start_date?: string;
  due_date?: string;
  status?: string;
}) {
  return asItemResult(`Created V2 version ${input.name}`, {
    id: String(input.id),
    projectId: input.project_id,
    name: input.name,
    startDate: input.start_date,
    dueDate: input.due_date,
    status: input.status,
    executed: true
  });
}

type ReqCreateVersionV2Client = {
  createVersionV2: (input: {
    project_id: string;
    name: string;
    start_date: number;
    due_date: number;
  }) => Promise<{
    id: number | string;
    project_id: string;
    name: string;
    start_date?: string;
    due_date?: string;
    status?: string;
  }>;
};

export function createReqCreateVersionV2Handler(client: ReqCreateVersionV2Client) {
  return async (input: unknown) => {
    const parsed = reqCreateVersionV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateVersionV2(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createVersionV2(parsed);
    const result = mapCreatedVersionV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
