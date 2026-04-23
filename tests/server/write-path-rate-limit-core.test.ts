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
      toolName: "req_add_iteration_work_items",
      dryRunInput: {
        project_id: "project-1",
        iteration_id: "iteration-1",
        work_item_ids: ["70779173", "70779174"],
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_id: `iteration-${index}`,
        work_item_ids: [`${index}`, `${index + 100}`],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_id: "iteration-blocked",
        work_item_ids: ["blocked"],
        dry_run: false
      },
      responsePayload: {}
    },
    {
      toolName: "req_add_plan_work_items",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        work_item_ids: ["70779173", "70779174"],
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        plan_id: "plan-1",
        work_item_ids: [`${index}`, `${index + 100}`],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        work_item_ids: ["blocked"],
        dry_run: false
      },
      responsePayload: {
        status: "success"
      }
    },
    {
      toolName: "req_clear_plan_work_items",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        dry_run: true
      },
      liveInput: () => ({
        project_id: "project-1",
        plan_id: "plan-1",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        dry_run: false
      },
      responsePayload: {
        status: "success"
      }
    },
    {
      toolName: "req_create_plan",
      dryRunInput: {
        project_id: "project-1",
        name: "2026 Q3",
        type: "mind",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        name: `Plan ${index}`,
        type: "mind",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Plan blocked",
        type: "mind",
        dry_run: false
      },
      responsePayload: {
        status: "success",
        result: {
          id: "plan-1"
        }
      }
    },
    {
      toolName: "req_create_iteration_work_item",
      dryRunInput: {
        project_id: "project-1",
        iteration_id: "iteration-1",
        title: "Story A",
        work_item_type: "Story",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        iteration_id: `iteration-${index}`,
        title: `Story ${index}`,
        work_item_type: "Story",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        iteration_id: "iteration-blocked",
        title: "Story blocked",
        work_item_type: "Story",
        dry_run: false
      },
      responsePayload: {
        id: 101,
        name: "Story A"
      }
    },
    {
      toolName: "req_create_plan_work_item",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        title: "Epic A",
        work_item_type: "Epic",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        plan_id: "plan-1",
        title: `Epic ${index}`,
        work_item_type: "Epic",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        title: "Epic blocked",
        work_item_type: "Epic",
        dry_run: false
      },
      responsePayload: {
        status: "success",
        result: {
          issue: {
            id: 101
          }
        }
      }
    },
    {
      toolName: "req_update_plan",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        name: "2026 Q3 Updated",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        plan_id: `${index}`,
        name: `Plan ${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "blocked",
        name: "Plan blocked",
        dry_run: false
      },
      responsePayload: {
        status: "success",
        result: {
          id: "plan-1"
        }
      }
    },
    {
      toolName: "req_update_plan_image",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        img_url: "/v1/upload/demo/202604/abc123.png",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        plan_id: "plan-1",
        img_url: `/v1/upload/demo/202604/img${index}.png`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        img_url: "/v1/upload/demo/202604/blocked.png",
        dry_run: false
      },
      responsePayload: {
        status: "success",
        result: {
          id: "plan-1"
        }
      }
    },
    {
      toolName: "req_delete_plan",
      dryRunInput: {
        project_id: "project-1",
        plan_id: "plan-1",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        plan_id: `${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        plan_id: "blocked",
        dry_run: false
      },
      responsePayload: {
        status: "success"
      }
    },
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
      toolName: "req_delete_work_item",
      dryRunInput: {
        project_id: "project-1",
        work_item_id: "70779173",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        work_item_id: `${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        work_item_id: "blocked",
        dry_run: false
      },
      responsePayload: {},
      responseInit: { status: 204 }
    },
    {
      toolName: "req_batch_update_work_items",
      dryRunInput: {
        project_id: "project-1",
        work_item_ids: ["70779173", "70779174"],
        status_id: 3,
        priority_id: 2,
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        work_item_ids: [`${index}`, `${index + 100}`],
        status_id: 3,
        priority_id: 2,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        work_item_ids: ["blocked"],
        status_id: 3,
        priority_id: 2,
        dry_run: false
      },
      responsePayload: {}
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
    },
    {
      toolName: "req_add_work_item_comment",
      dryRunInput: {
        project_id: "project-1",
        work_item_id: "70779173",
        content: "First comment",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        work_item_id: `${index}`,
        content: `Comment ${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        work_item_id: "blocked",
        content: "Blocked comment",
        dry_run: false
      },
      responsePayload: {
        result: {
          issue: {
            id: 70779173
          }
        },
        status: "success"
      }
    },
    {
      toolName: "req_update_work_item_comment",
      dryRunInput: {
        project_id: "project-1",
        work_item_id: "70779173",
        comment_id: "comment-1",
        content: "Updated comment",
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        work_item_id: `${index}`,
        comment_id: `comment-${index}`,
        content: `Updated ${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        work_item_id: "blocked",
        comment_id: "comment-blocked",
        content: "Blocked update",
        dry_run: false
      },
      responsePayload: {
        result: {
          status: "success"
        },
        status: "success"
      }
    },
    {
      toolName: "req_update_work_item_flow",
      dryRunInput: {
        project_id: "project-1",
        work_item_id: "70779173",
        status_id: 3,
        dry_run: true
      },
      liveInput: (index: number) => ({
        project_id: "project-1",
        work_item_id: `${index}`,
        status_id: 3,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        work_item_id: "blocked",
        status_id: 3,
        dry_run: false
      },
      responsePayload: {
        result: {
          issue: {
            id: 70779173,
            subject: "Align acceptance criteria",
            status: {
              id: 3,
              name: "Resolved"
            }
          }
        },
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
