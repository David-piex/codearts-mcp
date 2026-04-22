import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineListAvailablePublishersHandler,
  createSessionAwarePipelineListBasePluginsHandler,
  createSessionAwarePipelineListBasePluginsPagedHandler,
  createSessionAwarePipelineListPublishersHandler,
  createSessionAwarePipelineListStagePluginsHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("read path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_publishers through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListPublishersHandler,
      input: {
        domain_id: "domain-1",
        offset: 0,
        limit: 20
      },
      responsePayload: {
        data: [
          {
            publisher_unique_id: "pub-1",
            name: "Huawei",
            en_name: "huawei",
            auth_status: "accept"
          }
        ],
        total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 20,
          total: 1
        },
        items: [
          {
            id: "pub-1",
            publisherUniqueId: "pub-1",
            name: "Huawei",
            enName: "huawei",
            authStatus: "accept"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/publisher/query-all?offset=0&limit=20");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_list_available_publishers through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListAvailablePublishersHandler,
      input: {
        domain_id: "domain-1"
      },
      responsePayload: {
        data: [
          {
            publisher_unique_id: "pub-2",
            name: "Partner",
            auth_status: "pending"
          }
        ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 1,
          total: 1
        },
        items: [
          {
            id: "pub-2",
            publisherUniqueId: "pub-2",
            name: "Partner",
            authStatus: "pending"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/publisher/optional-publisher");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_list_stage_plugins through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListStagePluginsHandler,
      input: {
        domain_id: "domain-1",
        use_condition: "pipeline",
        business_type: ["Build"],
        deploy_type: "image",
        comp_extend_type: "official"
      },
      responsePayload: {
        full_stage_plugins_item_list: [
          {
            stage_name: "Build",
            plugins_list: [
              {
                plugin_name: "build-plugin",
                display_name: "Build Plugin"
              }
            ]
          }
        ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 1,
          total: 1
        },
        items: [
          {
            stage_name: "Build",
            plugins_list: [
              {
                plugin_name: "build-plugin",
                display_name: "Build Plugin"
              }
            ]
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/relation/stage-plugins");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"use_condition\":\"pipeline\"");
    expect(String(request.init.body)).toContain("\"deploy_type\":\"image\"");
  });

  it("executes pipeline_list_base_plugins through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListBasePluginsHandler,
      input: {
        domain_id: "domain-1"
      },
      responsePayload: {
        data: [
          {
            plugin_name: "base-plugin",
            display_name: "Base Plugin"
          }
        ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 1,
          total: 1
        },
        items: [
          {
            id: "base-plugin",
            pluginName: "base-plugin",
            displayName: "Base Plugin"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/relation/plugin/single");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_list_base_plugins_paged through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListBasePluginsPagedHandler,
      input: {
        domain_id: "domain-1",
        offset: 40,
        limit: 20
      },
      responsePayload: {
        data: [
          {
            plugin_name: "base-plugin",
            display_name: "Base Plugin"
          }
        ],
        total: 41
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 3,
          pageSize: 20,
          total: 41
        },
        items: [
          {
            id: "base-plugin",
            pluginName: "base-plugin",
            displayName: "Base Plugin"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/relation/plugins?offset=40&limit=20");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("{}");
  });
});
