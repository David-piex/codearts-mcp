import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineBatchDeleteInput,
  pipelineBatchRunInput,
  pipelineCreateByTemplateInput,
  pipelineCreateInput,
  pipelineUpdatePipelineInfoInput
} from "../schemas.js";

export function previewCreatePipelineByTemplate(input: {
  project_id: string;
  template_id: string;
  name: string;
  description?: string;
  group_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline ${input.name} from template ${input.template_id}`, {
    projectId: input.project_id,
    templateId: input.template_id,
    name: input.name,
    description: input.description,
    groupId: input.group_id,
    executed: !input.dry_run
  });
}

export function mapCreatedPipeline(input: {
  project_id: string;
  pipeline_id?: string;
  name: string;
}) {
  return asItemResult(`Created pipeline ${input.name}`, {
    id: input.pipeline_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    name: input.name,
    executed: true
  });
}

export function previewCreatePipeline(input: {
  project_id: string;
  name: string;
  description?: string;
  manifest_version?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    description: input.description,
    manifestVersion: input.manifest_version,
    executed: !input.dry_run
  });
}

export function previewUpdatePipelineInfo(input: {
  project_id: string;
  pipeline_id: string;
  name?: string;
  description?: string;
  is_publish?: boolean;
  manifest_version?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    name: input.name,
    description: input.description,
    isPublish: input.is_publish,
    manifestVersion: input.manifest_version,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineInfo(input: {
  project_id: string;
  pipeline_id: string;
  success: boolean;
}) {
  return asItemResult(`Updated pipeline ${input.pipeline_id}`, {
    id: input.pipeline_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    success: input.success,
    executed: true
  });
}

export function previewBatchDeletePipelines(input: {
  project_id: string;
  pipeline_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete ${input.pipeline_ids.length} pipelines`, {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    executed: !input.dry_run
  });
}

export function mapBatchDeletedPipelines(input: {
  project_id: string;
  pipeline_ids: string[];
}) {
  return asItemResult(`Deleted ${input.pipeline_ids.length} pipelines`, {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    deleted: true,
    executed: true
  });
}

export function previewBatchRunPipelines(input: {
  project_id: string;
  pipeline_ids: string[];
  branch?: string;
  description?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: run ${input.pipeline_ids.length} pipelines`, {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    branch: input.branch,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapBatchRunPipelines(input: {
  project_id: string;
  pipeline_ids: string[];
}) {
  return asItemResult(`Started ${input.pipeline_ids.length} pipelines`, {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    success: true,
    executed: true
  });
}

type PipelineCreateByTemplateClient = {
  createPipelineByTemplate: (input: {
    project_id: string;
    template_id: string;
    name: string;
    description?: string;
    group_id?: string;
  }) => Promise<{
    pipeline_id?: string;
    name?: string;
  }>;
};

type PipelineCreateClient = {
  createPipeline: (input: {
    project_id: string;
    name: string;
    description?: string;
    manifest_version?: string;
    sources?: Array<Record<string, unknown>>;
    variables?: Array<Record<string, unknown>>;
    parameters?: Array<Record<string, unknown>>;
    definition?: Record<string, unknown>;
  }) => Promise<{
    pipeline_id?: string;
    name?: string;
  }>;
};

type PipelineUpdateInfoClient = {
  updatePipelineInfo: (input: {
    project_id: string;
    pipeline_id: string;
    name?: string;
    description?: string;
    is_publish?: boolean;
    manifest_version?: string;
  }) => Promise<{
    pipeline_id: string;
    success: boolean;
  }>;
};

type PipelineBatchDeleteClient = {
  batchDeletePipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
  }) => Promise<{
    pipeline_ids: string[];
    deleted: boolean;
  }>;
};

type PipelineBatchRunClient = {
  batchRunPipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
    branch?: string;
    description?: string;
  }) => Promise<{
    pipeline_ids: string[];
    success: boolean;
  }>;
};

export function createPipelineCreateByTemplateHandler(client: PipelineCreateByTemplateClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateByTemplateInput.parse(input);
    if (parsed.dry_run) {
      const result = previewCreatePipelineByTemplate(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.createPipelineByTemplate(parsed);
    const result = mapCreatedPipeline({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id,
      name: response.name ?? parsed.name
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineCreateHandler(client: PipelineCreateClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateInput.parse(input);
    if (parsed.dry_run) {
      const result = previewCreatePipeline(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.createPipeline(parsed);
    const result = mapCreatedPipeline({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id,
      name: response.name ?? parsed.name
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateInfoHandler(client: PipelineUpdateInfoClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdatePipelineInfoInput.parse(input);
    if (parsed.dry_run) {
      const result = previewUpdatePipelineInfo(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updatePipelineInfo(parsed);
    const result = mapUpdatedPipelineInfo({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id,
      success: response.success
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineBatchDeleteHandler(client: PipelineBatchDeleteClient) {
  return async (input: unknown) => {
    const parsed = pipelineBatchDeleteInput.parse(input);
    if (parsed.dry_run) {
      const result = previewBatchDeletePipelines(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.batchDeletePipelines(parsed);
    const result = mapBatchDeletedPipelines({
      project_id: parsed.project_id,
      pipeline_ids: response.pipeline_ids
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineBatchRunHandler(client: PipelineBatchRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineBatchRunInput.parse(input);
    if (parsed.dry_run) {
      const result = previewBatchRunPipelines(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.batchRunPipelines(parsed);
    const result = mapBatchRunPipelines({
      project_id: parsed.project_id,
      pipeline_ids: response.pipeline_ids
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
