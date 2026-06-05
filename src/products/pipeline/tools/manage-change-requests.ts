import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineCreateChangeRequestInput,
  pipelineUpdateChangeRequestStatusInput,
  pipelineUpdateChangeRequestWorkItemsInput
} from "../schemas.js";

export function previewCreatePipelineChangeRequest(input: {
  cloud_project_id: string;
  component_id: string;
  title: string;
  type?: string;
  workitem_ids: string[];
  repos: Array<{
    repo_id: string;
    http_url: string;
    git_url: string;
    feature_branch: string;
    main_branch: string;
    delete_branch_after_released?: boolean;
  }>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline change request ${input.title}`, {
    cloudProjectId: input.cloud_project_id,
    componentId: input.component_id,
    title: input.title,
    type: input.type,
    workItemIds: input.workitem_ids,
    repoCount: input.repos.length,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineChangeRequest(input: {
  cloud_project_id: string;
  change_request_id: string;
  title?: string;
  status?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Created pipeline change request ${input.change_request_id}`,
    {
      cloudProjectId: input.cloud_project_id,
      changeRequestId: input.change_request_id,
      title: input.title,
      status: input.status,
      executed: true
    },
    input.raw
  );
}

export function previewUpdatePipelineChangeRequestStatus(input: {
  cloud_project_id: string;
  change_request_id: string;
  status: "developing" | "to_be_released" | "releasing" | "released" | "revoked";
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline change request status ${input.change_request_id}`, {
    cloudProjectId: input.cloud_project_id,
    changeRequestId: input.change_request_id,
    status: input.status,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineChangeRequestStatus(input: {
  cloud_project_id: string;
  change_request_id: string;
  status?: string;
  title?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Updated pipeline change request status ${input.change_request_id}`,
    {
      cloudProjectId: input.cloud_project_id,
      changeRequestId: input.change_request_id,
      status: input.status,
      title: input.title,
      executed: true
    },
    input.raw
  );
}

export function previewUpdatePipelineChangeRequestWorkItems(input: {
  cloud_project_id: string;
  change_request_id: string;
  work_item_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline change request work items ${input.change_request_id}`, {
    cloudProjectId: input.cloud_project_id,
    changeRequestId: input.change_request_id,
    workItemIds: input.work_item_ids,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineChangeRequestWorkItems(input: {
  cloud_project_id: string;
  change_request_id: string;
  work_item_ids: string[];
  result: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Updated pipeline change request work items ${input.change_request_id}`,
    {
      cloudProjectId: input.cloud_project_id,
      changeRequestId: input.change_request_id,
      workItemIds: input.work_item_ids,
      result: input.result,
      executed: true
    },
    input.raw
  );
}

type PipelineChangeRequestWriteClient = {
  createChangeRequest: (input: Omit<ReturnType<typeof pipelineCreateChangeRequestInput.parse>, "dry_run">) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  updateChangeRequestStatus: (
    input: Omit<ReturnType<typeof pipelineUpdateChangeRequestStatusInput.parse>, "dry_run">
  ) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  updateChangeRequestWorkItems: (
    input: Omit<ReturnType<typeof pipelineUpdateChangeRequestWorkItemsInput.parse>, "dry_run">
  ) => Promise<{
    result: string;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineCreateChangeRequestHandler(client: PipelineChangeRequestWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateChangeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineChangeRequest(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createChangeRequest(parsed);
    const changeRequestId = String(response.item.id ?? response.item.change_request_id ?? "");
    const result = mapCreatedPipelineChangeRequest({
      cloud_project_id: parsed.cloud_project_id,
      change_request_id: changeRequestId,
      title: typeof response.item.title === "string" ? response.item.title : parsed.title,
      status: typeof response.item.status === "string" ? response.item.status : undefined,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createPipelineUpdateChangeRequestStatusHandler(client: PipelineChangeRequestWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateChangeRequestStatusInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineChangeRequestStatus(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateChangeRequestStatus(parsed);
    const result = mapUpdatedPipelineChangeRequestStatus({
      cloud_project_id: parsed.cloud_project_id,
      change_request_id: parsed.change_request_id,
      status: typeof response.item.status === "string" ? response.item.status : parsed.status,
      title: typeof response.item.title === "string" ? response.item.title : undefined,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createPipelineUpdateChangeRequestWorkItemsHandler(client: PipelineChangeRequestWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateChangeRequestWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineChangeRequestWorkItems(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateChangeRequestWorkItems(parsed);
    const result = mapUpdatedPipelineChangeRequestWorkItems({
      cloud_project_id: parsed.cloud_project_id,
      change_request_id: parsed.change_request_id,
      work_item_ids: parsed.work_item_ids,
      result: response.result,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
