import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateTemplateTaskV3Handler,
  createSessionAwarePipelineCreatePluginDraftHandler,
  createSessionAwarePipelineGetAcceptFreeDeclarationHandler,
  createSessionAwarePipelineGetPluginMetricsHandler,
  createSessionAwarePipelineGetTenantPopupStatusHandler,
  createSessionAwarePipelinePublishPluginDraftHandler,
  createSessionAwarePipelineStartNewPipelineV3Handler,
  createSessionAwarePipelineShowTemplateTaskStatusHandler,
  createSessionAwarePipelineStopPipelineV3Handler,
  createSessionAwarePipelineUpdatePluginDraftHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline additional uncovered endpoints integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_get_plugin_metrics through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetPluginMetricsHandler,
      input: {
        domain_id: "domain-1",
        body: [
          {
            plugin_name: "custom-plugin",
            version: "0.0.1",
            plugin_attribution: "custom"
          }
        ]
      },
      responsePayload: [
        {
          plugin_name: "custom-plugin",
          display_name: "Custom Plugin",
          data: [
            {
              unique_id: "metric-1",
              output_key: "SYSTEM_METRICS_UNIQUE_KEY"
            }
          ]
        }
      ]
    });

    expect(result).toMatchObject({
      structuredContent: {
        items: [
          {
            id: "1",
            pluginMetric: {
              plugin_name: "custom-plugin"
            }
          }
        ]
      }
    });
    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/plugin-metrics");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"plugin_name\":\"custom-plugin\"");
  });

  it("executes pipeline_get_tenant_popup_status through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetTenantPopupStatusHandler,
      input: {
        tenant_id: "tenant-1",
        project_id: "project-1"
      },
      responsePayload: {
        pop_up: true,
        package_status: "normal"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "tenant-1",
          tenantPopupStatus: {
            pop_up: true,
            package_status: "normal"
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v5/tenant-1/api/popup-status?project_id=project-1");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_get_accept_free_declaration through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetAcceptFreeDeclarationHandler,
      input: {
        tenant_id: "tenant-1"
      },
      responsePayload: true
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "tenant-1",
          acceptFreeDeclaration: {
            value: true
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v5/tenant-1/api/is-accept-free-declaration");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_show_template_task_status through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineShowTemplateTaskStatusHandler,
      input: {
        task_id: "task-1"
      },
      responsePayload: {
        task_id: "task-1",
        task_status: "succeeded",
        pipeline_id: "pipeline-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "task-1",
          templateTaskStatus: {
            task_id: "task-1",
            task_status: "succeeded",
            pipeline_id: "pipeline-1"
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v3/templates/task-1/status");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_create_plugin_draft through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreatePluginDraftHandler,
      input: {
        domain_id: "domain-1",
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "0.0.1",
        runtime_attribution: "agentless",
        business_type: "Build",
        business_type_display_name: "Build",
        description: "Custom plugin",
        execution_info: {},
        dry_run: false
      },
      responsePayload: {
        unique_id: "plugin-1",
        plugin_name: "custom-plugin"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          executed: true,
          pluginName: "custom-plugin"
        }
      }
    });
    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/create-draft");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"runtime_attribution\":\"agentless\"");
    expect(String(request.init.body)).not.toContain("dry_run");
  });

  it("executes pipeline_update_plugin_draft through the session-aware runtime client", async () => {
    const { request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdatePluginDraftHandler,
      input: {
        domain_id: "domain-1",
        body: {
          plugin_name: "custom-plugin",
          version: "0.0.2"
        },
        dry_run: false
      },
      responsePayload: {
        unique_id: "plugin-1",
        plugin_name: "custom-plugin"
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/edit-draft");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"version\":\"0.0.2\"");
  });

  it("executes pipeline_publish_plugin_draft through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelinePublishPluginDraftHandler,
      input: {
        domain_id: "domain-1",
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "0.0.1",
        plugin_attribution: "custom",
        dry_run: false
      },
      responsePayload: true
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          executed: true,
          raw: {
            value: true
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/publish-draft");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"plugin_attribution\":\"custom\"");
  });

  it("executes pipeline_create_template_task_v3 through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateTemplateTaskV3Handler,
      input: {
        flow: {
          initial: {
            state_1: "always"
          }
        },
        body: {
          workflow: {
            name: "Legacy V3 pipeline"
          }
        },
        dry_run: false
      },
      responsePayload: {
        task_id: "task-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          executed: true,
          item: {
            task_id: "task-1"
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v3/templates/task");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"workflow\"");
  });

  it("executes pipeline_start_new_pipeline_v3 through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineStartNewPipelineV3Handler,
      input: {
        pipeline_id: "pipeline-1",
        build_params: [
          {
            name: "ServiceName",
            value: "pipeline-Test"
          }
        ],
        dry_run: false
      },
      responsePayload: {
        pipeline_id: "pipeline-1",
        build_id: "23"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          executed: true,
          item: {
            build_id: "23"
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v3/pipelines/pipeline-1/start");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"build_params\"");
  });

  it("executes pipeline_stop_pipeline_v3 through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineStopPipelineV3Handler,
      input: {
        pipeline_id: "pipeline-1",
        build_id: "23",
        dry_run: false
      },
      responsePayload: {
        pipeline_id: "pipeline-1",
        pipeline_name: "release-main"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          executed: true,
          item: {
            pipeline_name: "release-main"
          }
        }
      }
    });
    expect(String(request.url)).toContain("/v3/pipelines/pipeline-1/stop?build_id=23");
    expect(request.init.method).toBe("POST");
  });
});
