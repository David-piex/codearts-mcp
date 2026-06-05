import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineBatchRunResultInput,
  pipelineCancelQueueInput,
  pipelineGetRunChangeRequestsInput,
  pipelineGetStepJumpLinkInput,
  pipelineRollbackRunInput
} from "../schemas.js";
import { createPipelineRawListHandler } from "./raw-query-tools.js";

export function previewCancelQueue(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  queue_id: string | number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: cancel queue ${input.queue_id} for pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    queueId: String(input.queue_id),
    executed: !input.dry_run
  });
}

export function mapCancelQueueResult(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_run_id?: string;
  queue_id: string | number;
}) {
  return asItemResult(`Canceled queue ${input.queue_id} for pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.pipeline_run_id,
    queueId: String(input.queue_id),
    executed: true
  });
}

export function previewRollbackRun(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: rollback pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    executed: !input.dry_run
  });
}

export function mapRollbackRunResult(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_run_id?: string;
}) {
  return asItemResult(`Rolled back pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.pipeline_run_id,
    executed: true
  });
}

export function mapStepJumpLink(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  jump_link?: string;
}) {
  return asItemResult(`Loaded step jump link ${input.step_id}`, {
    id: input.step_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    jumpLink: input.jump_link
  });
}

type PipelineCancelQueueClient = {
  cancelQueue: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    queue_id: string | number;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
};

type PipelineRollbackRunClient = {
  rollbackRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    sources?: Array<Record<string, unknown>>;
    description?: string;
    variables?: Array<Record<string, unknown>>;
    choose_jobs?: string[];
    choose_stages?: string[];
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
};

type PipelineGetStepJumpLinkClient = {
  getStepJumpLink: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    jump_link?: string;
  }>;
};

type PipelineAdvancedQueryClient = {
  getRunChangeRequests: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    component_id?: string;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getBatchRunResult: (input: {
    project_id: string;
    query: Array<{
      pipeline_id: string;
      pipeline_run_id: string;
    }>;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineCancelQueueHandler(client: PipelineCancelQueueClient) {
  return async (input: unknown) => {
    const parsed = pipelineCancelQueueInput.parse(input);
    if (parsed.dry_run) {
      const result = previewCancelQueue(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }
    const response = await client.cancelQueue(parsed);
    const result = mapCancelQueueResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      pipeline_run_id: response.pipeline_run_id,
      queue_id: parsed.queue_id
    });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createPipelineRollbackRunHandler(client: PipelineRollbackRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineRollbackRunInput.parse(input);
    if (parsed.dry_run) {
      const result = previewRollbackRun(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }
    const response = await client.rollbackRun(parsed);
    const result = mapRollbackRunResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      pipeline_run_id: response.pipeline_run_id
    });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createPipelineGetStepJumpLinkHandler(client: PipelineGetStepJumpLinkClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetStepJumpLinkInput.parse(input);
    const response = await client.getStepJumpLink(parsed);
    const result = mapStepJumpLink({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      run_id: parsed.run_id,
      job_id: parsed.job_id,
      step_id: parsed.step_id,
      jump_link: response.jump_link
    });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export const createPipelineGetRunChangeRequestsHandler = (client: PipelineAdvancedQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineGetRunChangeRequestsInput,
    call: (input) => client.getRunChangeRequests(input),
    noun: "pipeline run change requests",
    itemKey: "changeRequest",
    rawKey: "runChangeRequests"
  });

export const createPipelineGetBatchRunResultHandler = (client: PipelineAdvancedQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineBatchRunResultInput,
    call: (input) => client.getBatchRunResult(input),
    noun: "pipeline batch run results",
    itemKey: "batchRunResult",
    rawKey: "batchRunResults"
  });
