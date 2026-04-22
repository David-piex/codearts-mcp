import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineApproveRunHandler,
  createSessionAwareDeployCreateApplicationHandler,
  createSessionAwarePipelineRejectRunHandler,
  createSessionAwarePipelineRetryRunHandler,
  createSessionAwarePipelineRunPipelineHandler,
  createSessionAwarePipelineStopRunHandler,
  createSessionAwareReqCreateWorkItemHandler
} from "../../src/server/create-server.js";
import { expectSessionAwareWriteExecution } from "./http-test-helpers.js";

type WritePathCase = {
  name: string;
  createHandler:
    | typeof createSessionAwareReqCreateWorkItemHandler
    | typeof createSessionAwareDeployCreateApplicationHandler
    | typeof createSessionAwarePipelineRunPipelineHandler
    | typeof createSessionAwarePipelineStopRunHandler
    | typeof createSessionAwarePipelineRetryRunHandler
    | typeof createSessionAwarePipelineApproveRunHandler
    | typeof createSessionAwarePipelineRejectRunHandler;
  input: Record<string, unknown>;
  responsePayload: unknown;
  expectedItem: Record<string, unknown>;
  expectedRequest: {
    path: string;
    bodyIncludes?: string[];
  };
};

function createReqCreateWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  title: string;
  work_item_type: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    title: "Add login",
    work_item_type: "Story",
    description: "Implement login flow",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    title: string;
    work_item_type: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createDeployCreateApplicationInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  arrange_infos: Array<{
    template_id: string;
    operation_list: Array<{ name: string }>;
  }>;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "App-20260420",
    arrange_infos: [
      {
        template_id: "template-1",
        operation_list: [{ name: "deploy" }]
      }
    ],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    arrange_infos: Array<{
      template_id: string;
      operation_list: Array<{ name: string }>;
    }>;
    dry_run: boolean;
  } & T;
}

function createProjectPipelineRunInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipeline-1",
    run_id: "run-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    dry_run: boolean;
  } & T;
}

function createProjectPipelineReviewInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipeline-1",
    run_id: "run-1",
    job_id: "job-1",
    step_id: "step-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
    dry_run: boolean;
  } & T;
}

const writePathCases: WritePathCase[] = [
  {
    name: "executes req_create_work_item through the session-aware runtime client",
    createHandler: createSessionAwareReqCreateWorkItemHandler,
    input: createReqCreateWorkItemInput(),
    responsePayload: {
      id: 101,
      name: "Add login",
      description: "Implement login flow",
      status: { id: 7, name: "New" },
      tracker: { id: 5, name: "Story" }
    },
    expectedItem: {
      id: "101",
      title: "Add login",
      status: "New",
      type: "Story",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issue",
      bodyIncludes: ["\"name\":\"Add login\""]
    }
  },
  {
    name: "executes deploy_create_application through the session-aware runtime client",
    createHandler: createSessionAwareDeployCreateApplicationHandler,
    input: createDeployCreateApplicationInput(),
    responsePayload: {
      application_id: "app-1",
      name: "App-20260420",
      arrange_infos: [{ task_id: "task-1" }]
    },
    expectedItem: {
      id: "app-1",
      name: "App-20260420",
      taskId: "task-1",
      executed: true
    },
    expectedRequest: {
      path: "/v1/applications",
      bodyIncludes: ["\"name\":\"App-20260420\""]
    }
  },
  {
    name: "executes pipeline_run_pipeline through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRunPipelineHandler,
    input: createProjectPipelineRunInput({
      branch: "main",
      description: "manual trigger"
    }),
    responsePayload: {
      pipeline_run_id: "run-1"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      branch: "main",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/run",
      bodyIncludes: ["\"target_branch\":\"main\""]
    }
  },
  {
    name: "executes pipeline_stop_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineStopRunHandler,
    input: {
      pipeline_id: "pipeline-1",
      run_id: "run-1",
      dry_run: false
    },
    responsePayload: {
      pipeline_id: "pipeline-1",
      pipeline_name: "release-main"
    },
    expectedItem: {
      pipelineId: "pipeline-1",
      pipelineName: "release-main",
      pipelineRunId: "run-1",
      executed: true
    },
    expectedRequest: {
      path: "/v5/pipelines/pipeline-1/pipeline-runs/run-1/stop"
    }
  },
  {
    name: "executes pipeline_retry_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRetryRunHandler,
    input: createProjectPipelineRunInput(),
    responsePayload: {
      pipeline_run_id: "run-2"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      sourceRunId: "run-1",
      pipelineRunId: "run-2",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/retry"
    }
  },
  {
    name: "executes pipeline_approve_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineApproveRunHandler,
    input: createProjectPipelineReviewInput(),
    responsePayload: {
      pipeline_run_id: "run-1",
      job_run_id: "job-1",
      step_run_id: "step-1",
      status: "PASSED"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      status: "PASSED",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/pass",
      bodyIncludes: ["\"job_run_id\":\"job-1\"", "\"step_run_id\":\"step-1\""]
    }
  },
  {
    name: "executes pipeline_reject_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRejectRunHandler,
    input: createProjectPipelineReviewInput(),
    responsePayload: {
      success: true
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      success: true,
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/reject",
      bodyIncludes: ["\"job_run_id\":\"job-1\"", "\"step_run_id\":\"step-1\""]
    }
  }
];

describe("write path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each(writePathCases)("$name", async ({ createHandler, input, responsePayload, expectedItem, expectedRequest }) => {
    await expectSessionAwareWriteExecution({
      createHandler,
      input,
      responsePayload,
      expectedItem,
      expectedRequest
    });
  });
});
