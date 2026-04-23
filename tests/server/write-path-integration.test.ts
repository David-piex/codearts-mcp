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
import {
  bootstrapHttpRuntime,
  createSessionAuthContext,
  expectSessionAwareWriteExecution,
  readRegisteredHandler,
  stubJsonFetch
} from "./http-test-helpers.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

type SessionStore = ReturnType<typeof createSessionCredentialStore>;

type WritePathCase = {
  name: string;
  createHandler: (store: SessionStore) => (
    input: unknown,
    extra: unknown
  ) => Promise<unknown>;
  input: Record<string, unknown>;
  responsePayload: unknown;
  expectedItem: Record<string, unknown>;
  expectedRequest: {
    path: string;
    method?: string;
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

function createReqCreateProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  name: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    name: "Alpha",
    description: "Demo project",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    name: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdateProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "Alpha 2",
    description: "Updated project",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createReqDeleteProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
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
    name: "executes req_add_project_member through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_project_member"),
    input: {
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 3,
      dry_run: false
    },
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      domainId: "domain-1",
      roleId: 3,
      added: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/member",
      bodyIncludes: ["\"user_id\":\"user-1\"", "\"domain_id\":\"domain-1\"", "\"role_id\":3"]
    }
  },
  {
    name: "executes req_batch_add_project_members through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_add_project_members"),
    input: {
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      dry_run: false
    },
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      members: [
        { userId: "user-1", roleId: 3 },
        { userId: "user-2", roleId: undefined }
      ],
      addedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members",
      bodyIncludes: ["\"users\":[", "\"user_id\":\"user-1\"", "\"user_id\":\"user-2\""]
    }
  },
  {
    name: "executes req_batch_delete_project_members through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_delete_project_members"),
    input: {
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      dry_run: false
    },
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      userIds: ["user-1", "user-2"],
      removedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members",
      method: "DELETE",
      bodyIncludes: ["\"user_ids\":[\"user-1\",\"user-2\"]"]
    }
  },
  {
    name: "executes req_update_project_member_role through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_project_member_role"),
    input: {
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: false
    },
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      roleId: 5,
      updated: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members/role",
      bodyIncludes: ["\"role_id\":5", "\"user_ids\":[\"user-1\"]"]
    }
  },
  {
    name: "executes req_leave_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_leave_project"),
    input: {
      project_id: "project-1",
      dry_run: false
    },
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      left: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/quit",
      method: "DELETE"
    }
  },
  {
    name: "executes req_create_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_project"),
    input: createReqCreateProjectInput(),
    responsePayload: {
      project_id: "project-1",
      project_name: "Alpha",
      description: "Demo project",
      project_num_id: 101,
      project_type: "scrum"
    },
    expectedItem: {
      id: "project-1",
      name: "Alpha",
      description: "Demo project",
      numberId: 101,
      type: "scrum",
      executed: true
    },
    expectedRequest: {
      path: "/v4/project",
      bodyIncludes: ["\"project_name\":\"Alpha\"", "\"project_type\":\"scrum\""]
    }
  },
  {
    name: "executes req_update_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_project"),
    input: createReqUpdateProjectInput(),
    responsePayload: {},
    expectedItem: {
      id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1",
      method: "PUT",
      bodyIncludes: ["\"project_name\":\"Alpha 2\""]
    }
  },
  {
    name: "executes req_delete_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_project"),
    input: createReqDeleteProjectInput(),
    responsePayload: {},
    expectedItem: {
      id: "project-1",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1",
      method: "DELETE"
    }
  },
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

  it("short-circuits req_create_project dry runs before issuing an HTTP request", async () => {
    const { server } = bootstrapHttpRuntime();
    const fetchMock = stubJsonFetch({
      project_id: "project-1"
    });
    const handler = readRegisteredHandler(server, "req_create_project");

    const result = await handler(
      createReqCreateProjectInput({
        dry_run: true
      }),
      createSessionAuthContext("session-write", "auth-1")
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      structuredContent: {
        item: {
          name: "Alpha",
          executed: false
        }
      }
    });
  });
});
