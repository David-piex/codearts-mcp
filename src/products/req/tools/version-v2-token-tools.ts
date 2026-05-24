import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteVersionV2Input, reqUpdateVersionV2Input } from "../schemas.js";

export function previewUpdateVersionV2(input: {
  project_id: string;
  version_id: number;
  name: string;
  start_date: number;
  due_date: number;
  update_workitem_date: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update V2 version ${input.name}`, {
    projectId: input.project_id,
    versionId: input.version_id,
    name: input.name,
    startDate: input.start_date,
    dueDate: input.due_date,
    updateWorkItemDate: input.update_workitem_date,
    executed: false
  });
}

export function mapUpdatedVersionV2(input: {
  project_id: string;
  version_id: number;
  name: string;
  status?: string;
  response: unknown;
}) {
  return asItemResult(`Updated V2 version ${input.name}`, {
    projectId: input.project_id,
    versionId: input.version_id,
    name: input.name,
    status: input.status,
    executed: true
  }, input.response);
}

export function previewDeleteVersionV2(input: {
  project_id: string;
  version_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete V2 version ${input.version_id}`, {
    projectId: input.project_id,
    versionId: input.version_id,
    executed: false
  });
}

export function mapDeletedVersionV2(input: {
  project_id: string;
  version_id: string;
  deleted: true;
  status?: string;
  response: unknown;
}) {
  return asItemResult(`Deleted V2 version ${input.version_id}`, {
    projectId: input.project_id,
    versionId: input.version_id,
    status: input.status,
    executed: true
  }, input.response);
}

type ReqVersionV2TokenClient = {
  updateVersionV2: (input: {
    project_id: string;
    version_id: number;
    name: string;
    start_date: number;
    due_date: number;
    update_workitem_date: boolean;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    version_id: number;
    name: string;
    status?: string;
    response: unknown;
  }>;
  deleteVersionV2: (input: {
    project_id: string;
    version_id: string;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    version_id: string;
    deleted: true;
    status?: string;
    response: unknown;
  }>;
};

export function createReqUpdateVersionV2Handler(client: Pick<ReqVersionV2TokenClient, "updateVersionV2">) {
  return async (input: unknown) => {
    const parsed = reqUpdateVersionV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateVersionV2(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateVersionV2(parsed);
    const result = mapUpdatedVersionV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createReqDeleteVersionV2Handler(client: Pick<ReqVersionV2TokenClient, "deleteVersionV2">) {
  return async (input: unknown) => {
    const parsed = reqDeleteVersionV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteVersionV2(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteVersionV2(parsed);
    const result = mapDeletedVersionV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
