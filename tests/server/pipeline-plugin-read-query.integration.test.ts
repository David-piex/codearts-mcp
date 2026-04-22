import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineGetPluginVersionHandler,
  createSessionAwarePipelineListPluginVersionsHandler,
  createSessionAwarePipelineListPluginsHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("read path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_plugins through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListPluginsHandler,
      input: {
        domain_id: "domain-1",
        offset: 40,
        limit: 10,
        plugin_attribution: "custom",
        business_type: ["Build"],
        maintainer: "yao",
        plugin_name: "custom-plugin"
      },
      responsePayload: {
        data: [
          {
            unique_id: "plugin-1",
            plugin_name: "custom-plugin",
            display_name: "Custom Plugin",
            plugin_attribution: "custom"
          }
        ],
        total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 5,
          pageSize: 10,
          total: 1
        },
        items: [
          {
            id: "plugin-1",
            uniqueId: "plugin-1",
            pluginName: "custom-plugin",
            displayName: "Custom Plugin",
            pluginAttribution: "custom"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/query-all?offset=40&limit=10");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"plugin_attribution\":\"custom\"");
    expect(String(request.init.body)).toContain("\"plugin_name\":\"custom-plugin\"");
  });

  it("executes pipeline_list_plugin_versions through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListPluginVersionsHandler,
      input: {
        domain_id: "domain-1",
        plugin_name: "custom-plugin",
        offset: 20,
        limit: 10
      },
      responsePayload: {
        data: [
          {
            unique_id: "plugin-1@1.0.0",
            plugin_name: "custom-plugin",
            display_name: "Custom Plugin",
            version: "1.0.0"
          }
        ],
        total: 21
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 3,
          pageSize: 10,
          total: 21
        },
        items: [
          {
            id: "plugin-1@1.0.0",
            uniqueId: "plugin-1@1.0.0",
            pluginName: "custom-plugin",
            displayName: "Custom Plugin",
            version: "1.0.0"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/query?plugin_name=custom-plugin&offset=20&limit=10");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_get_plugin_version through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetPluginVersionHandler,
      input: {
        domain_id: "domain-1",
        plugin_name: "custom-plugin",
        version: "1.0.0"
      },
      responsePayload: {
        data: {
          unique_id: "plugin-1@1.0.0",
          plugin_name: "custom-plugin",
          display_name: "Custom Plugin",
          version: "1.0.0",
          plugin_attribution: "custom"
        }
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "plugin-1@1.0.0",
          uniqueId: "plugin-1@1.0.0",
          pluginName: "custom-plugin",
          displayName: "Custom Plugin",
          version: "1.0.0",
          pluginAttribution: "custom"
        }
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/detail?plugin_name=custom-plugin&version=1.0.0");
    expect(request.init.method).toBe("GET");
  });
});
