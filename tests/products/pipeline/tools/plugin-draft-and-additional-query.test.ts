import { describe, expect, it, vi } from "vitest";
import { createPipelineGetPluginMetricsHandler } from "../../../../src/products/pipeline/tools/additional-query-tools.js";
import {
  createPipelineCreateTemplateTaskV3Handler,
  createPipelineStartNewPipelineV3Handler,
  createPipelineStopPipelineV3Handler
} from "../../../../src/products/pipeline/tools/legacy-v3-mutations.js";
import {
  createPipelineCreatePluginDraftHandler,
  createPipelinePublishPluginDraftHandler
} from "../../../../src/products/pipeline/tools/plugin-draft.js";
import { pipelineToolNames } from "../../../../src/products/pipeline/tools/index.js";

describe("pipeline next uncovered tool names", () => {
  it("includes plugin draft, plugin metrics, popup, declaration, and template task status tools", () => {
    expect(pipelineToolNames).toEqual(
      expect.arrayContaining([
        "pipeline_get_plugin_metrics",
        "pipeline_get_tenant_popup_status",
        "pipeline_get_accept_free_declaration",
        "pipeline_show_template_task_status",
        "pipeline_create_template_task_v3",
        "pipeline_start_new_pipeline_v3",
        "pipeline_stop_pipeline_v3",
        "pipeline_create_plugin_draft",
        "pipeline_update_plugin_draft",
        "pipeline_publish_plugin_draft"
      ])
    );
  });
});

describe("pipeline legacy V3 mutation handlers", () => {
  it("defaults V3 template task creation to dry run", async () => {
    const client = {
      createTemplateTaskV3: vi.fn(),
      startNewPipelineV3: vi.fn(),
      stopPipelineV3: vi.fn()
    };
    const handler = createPipelineCreateTemplateTaskV3Handler(client);
    const result = await handler({
      flow: {
        initial: {
          state_1: "always"
        }
      },
      body: {
        workflow: {
          name: "Legacy V3 pipeline"
        }
      }
    });

    expect(client.createTemplateTaskV3).not.toHaveBeenCalled();
    expect(result.structuredContent).toMatchObject({
      summary: "Dry run: create Pipeline V3 template task",
      item: {
        executed: false,
        request: {
          workflow: {
            name: "Legacy V3 pipeline"
          },
          flow: {
            initial: {
              state_1: "always"
            }
          }
        }
      }
    });
  });

  it("starts a V3 pipeline when dry_run is false", async () => {
    const client = {
      createTemplateTaskV3: vi.fn(),
      startNewPipelineV3: vi.fn(async () => ({
        item: {
          pipeline_id: "pipeline-1",
          build_id: "23"
        },
        raw: {
          pipeline_id: "pipeline-1",
          build_id: "23"
        }
      })),
      stopPipelineV3: vi.fn()
    };
    const handler = createPipelineStartNewPipelineV3Handler(client);
    const result = await handler({
      pipeline_id: "pipeline-1",
      build_params: [
        {
          name: "ServiceName",
          value: "pipeline-Test"
        }
      ],
      dry_run: false
    });

    expect(client.startNewPipelineV3).toHaveBeenCalledWith({
      pipeline_id: "pipeline-1",
      build_params: [
        {
          name: "ServiceName",
          value: "pipeline-Test"
        }
      ],
      dry_run: false
    });
    expect(result.structuredContent).toMatchObject({
      summary: "Started Pipeline V3 pipeline-1",
      item: {
        executed: true,
        item: {
          build_id: "23"
        }
      }
    });
  });

  it("stops a V3 pipeline when dry_run is false", async () => {
    const client = {
      createTemplateTaskV3: vi.fn(),
      startNewPipelineV3: vi.fn(),
      stopPipelineV3: vi.fn(async () => ({
        item: {
          pipeline_id: "pipeline-1",
          pipeline_name: "release-main"
        },
        raw: {
          pipeline_id: "pipeline-1",
          pipeline_name: "release-main"
        }
      }))
    };
    const handler = createPipelineStopPipelineV3Handler(client);
    const result = await handler({
      pipeline_id: "pipeline-1",
      build_id: "23",
      dry_run: false
    });

    expect(client.stopPipelineV3).toHaveBeenCalledWith({
      pipeline_id: "pipeline-1",
      build_id: "23",
      dry_run: false
    });
    expect(result.structuredContent).toMatchObject({
      summary: "Stopped Pipeline V3 pipeline-1 build 23",
      item: {
        executed: true,
        item: {
          pipeline_name: "release-main"
        }
      }
    });
  });
});

describe("pipeline plugin draft handlers", () => {
  it("defaults create plugin draft to dry run without calling the client", async () => {
    const client = {
      createPluginDraft: vi.fn(),
      updatePluginDraft: vi.fn(),
      publishPluginDraft: vi.fn(),
      deletePluginDraft: vi.fn(),
      publishPlugin: vi.fn(),
      publishPluginBind: vi.fn(),
      updatePluginBaseInfo: vi.fn()
    };
    const handler = createPipelineCreatePluginDraftHandler(client);
    const result = await handler({
      domain_id: "domain-1",
      body: {
        plugin_name: "custom-plugin",
        version: "0.0.1"
      }
    });

    expect(client.createPluginDraft).not.toHaveBeenCalled();
    expect(result.structuredContent).toMatchObject({
      summary: "Dry run: create Pipeline plugin draft custom-plugin",
      item: {
        domainId: "domain-1",
        pluginName: "custom-plugin",
        version: "0.0.1",
        executed: false
      }
    });
  });

  it("publishes plugin draft when dry_run is false", async () => {
    const client = {
      createPluginDraft: vi.fn(),
      updatePluginDraft: vi.fn(),
      publishPluginDraft: vi.fn(async () => ({
        item: { value: true },
        raw: { value: true }
      })),
      deletePluginDraft: vi.fn(),
      publishPlugin: vi.fn(),
      publishPluginBind: vi.fn(),
      updatePluginBaseInfo: vi.fn()
    };
    const handler = createPipelinePublishPluginDraftHandler(client);
    const result = await handler({
      domain_id: "domain-1",
      plugin_name: "custom-plugin",
      display_name: "Custom Plugin",
      version: "0.0.1",
      plugin_attribution: "custom",
      body: {
        version_attribution: "draft"
      },
      dry_run: false
    });

    expect(client.publishPluginDraft).toHaveBeenCalledWith({
      domain_id: "domain-1",
      body: {
        version_attribution: "draft",
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "0.0.1",
        plugin_attribution: "custom"
      }
    });
    expect(result.structuredContent).toMatchObject({
      summary: "Published Pipeline plugin draft custom-plugin",
      item: {
        executed: true,
        raw: { value: true }
      }
    });
  });
});

describe("pipeline additional query handlers", () => {
  it("maps plugin metrics as a raw list", async () => {
    const handler = createPipelineGetPluginMetricsHandler({
      getPluginMetrics: vi.fn(async () => ({
        records: [{ plugin_name: "custom-plugin", data: [] }],
        total: 1,
        raw: { data: [{ plugin_name: "custom-plugin", data: [] }], total: 1 }
      }))
    });
    const result = await handler({
      domain_id: "domain-1",
      body: [
        {
          plugin_name: "custom-plugin",
          version: "0.0.1",
          plugin_attribution: "custom"
        }
      ]
    });

    expect(result.structuredContent).toMatchObject({
      items: [
        {
          pluginMetric: {
            plugin_name: "custom-plugin",
            data: []
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 1,
        total: 1
      }
    });
  });
});
