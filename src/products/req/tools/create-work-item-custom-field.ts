import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateWorkItemCustomFieldInput } from "../schemas.js";

export function previewCreateWorkItemCustomField(input: {
  project_id: string;
  name: string;
  type: string;
  scrum_type: string;
  memo?: string;
  options?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create work item custom field ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    type: input.type,
    scrumType: input.scrum_type,
    memo: input.memo,
    options: input.options,
    endpoint: "/v3/{project_id}/custom-fields",
    executed: false
  });
}

export function mapCreatedWorkItemCustomField(input: {
  id?: number | string;
  identifier?: string;
  name?: string;
  type?: string;
  custom_field?: string;
  tracker_id?: number;
  project_id?: number | string;
  memo?: string;
  options?: string;
  region?: string;
  created?: string;
  modified?: string;
  is_delete?: boolean;
  raw?: unknown;
}) {
  return asItemResult(`Created work item custom field ${input.name ?? input.custom_field ?? ""}`.trim(), {
    id: typeof input.id === "undefined" ? undefined : String(input.id),
    identifier: input.identifier,
    name: input.name,
    type: input.type,
    customField: input.custom_field,
    trackerId: input.tracker_id,
    projectId: typeof input.project_id === "undefined" ? undefined : String(input.project_id),
    memo: input.memo,
    options: input.options,
    region: input.region,
    created: input.created,
    modified: input.modified,
    isDelete: input.is_delete,
    executed: true
  }, input.raw);
}

type ReqCreateWorkItemCustomFieldClient = {
  createWorkItemCustomField: (input: {
    project_id: string;
    name: string;
    type: "textArea" | "select" | "radio" | "text" | "checkbox" | "date" | "time_date" | "number";
    scrum_type: "Epic" | "Feature" | "Story" | "Task" | "Bug";
    memo?: string;
    options?: string;
  }) => Promise<{
    id?: number | string;
    identifier?: string;
    name?: string;
    type?: string;
    custom_field?: string;
    tracker_id?: number;
    project_id?: number | string;
    memo?: string;
    options?: string;
    region?: string;
    created?: string;
    modified?: string;
    is_delete?: boolean;
    raw?: unknown;
  }>;
};

export function createReqCreateWorkItemCustomFieldHandler(client: ReqCreateWorkItemCustomFieldClient) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemCustomFieldInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateWorkItemCustomField(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItemCustomField(parsed);
    const result = mapCreatedWorkItemCustomField(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
