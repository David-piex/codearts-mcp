import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineGetPluginInputsHandler,
  createSessionAwarePipelineGetPluginOutputsHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("read path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  const pluginPartInput = {
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    display_name: "Custom Plugin",
    version: "1.0.0",
    plugin_attribution: "custom"
  };

  it("executes pipeline_get_plugin_inputs through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetPluginInputsHandler,
      input: pluginPartInput,
      responsePayload: {
        data: [
          {
            name: "image",
            type: "string"
          }
        ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "custom-plugin@1.0.0:inputs",
          pluginName: "custom-plugin",
          displayName: "Custom Plugin",
          version: "1.0.0",
          pluginAttribution: "custom",
          items: [
            {
              name: "image",
              type: "string"
            }
          ]
        }
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/plugin-input");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"plugin_name\":\"custom-plugin\"");
    expect(String(request.init.body)).toContain("\"version\":\"1.0.0\"");
  });

  it("executes pipeline_get_plugin_outputs through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineGetPluginOutputsHandler,
      input: pluginPartInput,
      responsePayload: {
        data: [
          {
            name: "digest",
            type: "string"
          }
        ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "custom-plugin@1.0.0:outputs",
          pluginName: "custom-plugin",
          displayName: "Custom Plugin",
          version: "1.0.0",
          pluginAttribution: "custom",
          items: [
            {
              name: "digest",
              type: "string"
            }
          ]
        }
      }
    });

    expect(String(request.url)).toContain("/v1/domain-1/agent-plugin/plugin-output");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"display_name\":\"Custom Plugin\"");
    expect(String(request.init.body)).toContain("\"plugin_attribution\":\"custom\"");
  });
});
