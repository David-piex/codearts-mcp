import { afterEach, describe, expect, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";
import {
  createConfiguredServer,
  createSessionAuthContext,
  expectRateLimitResult,
  readRegisteredHandler,
  stubJsonFetch
} from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated req_create_work_item executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "req_create_work_item",
      responsePayload: {
        id: 101,
        name: "Add login",
        status: { id: 7, name: "New" },
        tracker: { id: 5, name: "Story" }
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        title: `Add login ${index}`,
        work_item_type: "Story",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        title: "Add login blocked",
        work_item_type: "Story",
        dry_run: false
      }
    });
  });

  it("limits repeated deploy_create_application executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "deploy_create_application",
      responsePayload: {
        application_id: "app-1",
        name: "App-20260420",
        arrange_infos: [{ task_id: "task-1" }]
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `App-20260420-${index}`,
        arrange_infos: [
          {
            template_id: "template-1",
            operation_list: [{ name: "deploy" }]
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "App-20260420-blocked",
        arrange_infos: [
          {
            template_id: "template-1",
            operation_list: [{ name: "deploy" }]
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_run_pipeline executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_run_pipeline",
      responsePayload: {
        pipeline_run_id: "run-1"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        branch: "main",
        description: `manual trigger ${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        branch: "main",
        description: "manual trigger blocked",
        dry_run: false
      }
    });
  });

  it("does not let req_add_project_member dry runs consume write quota", async () => {
    const { server } = createConfiguredServer();
    const handler = readRegisteredHandler(server, "req_add_project_member");
    const fetchMock = stubJsonFetch({}, { status: 204 });
    const context = createSessionAuthContext("session-rate-limit", "auth-1");

    for (let index = 0; index < 5; index += 1) {
      await handler(
        {
          project_id: "project-1",
          user_id: `dry-user-${index}`,
          domain_id: "domain-1",
          dry_run: true
        },
        context
      );
    }

    for (let index = 0; index < 5; index += 1) {
      await handler(
        {
          project_id: "project-1",
          user_id: `live-user-${index}`,
          domain_id: "domain-1",
          dry_run: false
        },
        context
      );
    }

    const blocked = await handler(
      {
        project_id: "project-1",
        user_id: "blocked-user",
        domain_id: "domain-1",
        dry_run: false
      },
      context
    );

    expect(fetchMock).toHaveBeenCalledTimes(5);
    expectRateLimitResult(blocked, "req_add_project_member");
  });

  it.each([
    {
      toolName: "req_create_iteration",
      dryRunInput: {
        project_id: "project-1",
        name: "Sprint 4",
        begin_time: "2026-04-15",
        end_time: "2026-04-28",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        name: `Sprint ${index}`,
        begin_time: "2026-04-15",
        end_time: "2026-04-28",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Sprint blocked",
        begin_time: "2026-04-15",
        end_time: "2026-04-28",
        dry_run: false
      },
      responsePayload: { id: 301 }
    },
    {
      toolName: "req_update_iteration",
      dryRunInput: {
        project_id: "project-1",
        iteration_id: "301",
        name: "Sprint 4",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_id: `${index}`,
        name: `Sprint ${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_id: "blocked",
        name: "Sprint blocked",
        dry_run: false
      },
      responsePayload: {}
    },
    {
      toolName: "req_delete_iteration",
      dryRunInput: {
        project_id: "project-1",
        iteration_id: "301",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_id: `${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_id: "blocked",
        dry_run: false
      },
      responsePayload: {}
    },
    {
      toolName: "req_batch_delete_iterations",
      dryRunInput: {
        project_id: "project-1",
        iteration_ids: ["301", "302"],
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_ids: [`${index}`, `${index + 100}`],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_ids: ["blocked"],
        dry_run: false
      },
      responsePayload: {},
      responseInit: { status: 204 }
    },
    {
      toolName: "req_update_iteration_state",
      dryRunInput: {
        project_id: "project-1",
        iteration_id: "301",
        name: "Sprint 4",
        status: "2",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_id: `${index}`,
        name: `Sprint ${index}`,
        status: "2",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_id: "blocked",
        name: "Sprint blocked",
        status: "2",
        dry_run: false
      },
      responsePayload: {
        result: "",
        status: "success"
      }
    }
  ])("does not let $toolName dry runs consume write quota", async ({
    toolName,
    dryRunInput,
    liveInput,
    blockedInput,
    responsePayload,
    responseInit
  }) => {
    const { server } = createConfiguredServer();
    const handler = readRegisteredHandler(server, toolName);
    const fetchMock = stubJsonFetch(responsePayload, responseInit);
    const context = createSessionAuthContext("session-rate-limit", "auth-1");

    for (let index = 0; index < 5; index += 1) {
      await handler(dryRunInput, context);
    }

    for (let index = 0; index < 5; index += 1) {
      await handler(liveInput(index), context);
    }

    const blocked = await handler(blockedInput, context);

    expect(fetchMock).toHaveBeenCalledTimes(5);
    expectRateLimitResult(blocked, toolName);
  });
});
