import { describe, expect, it, vi } from "vitest";
import { getOfficialEndpointToolsByFamily } from "../../src/products/official-endpoint-tools.js";
import {
  registerProductTool,
  resolveProductToolFamily
} from "../../src/server/register-product-tools.js";
import { collectToolNames } from "../../src/server/register-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerProductTool", () => {
  it("dispatches to the matching product registrar", () => {
    const registerTool = vi.fn();

    const handled = registerProductTool({
      toolName: "pipeline_list_pipelines",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      stdioClients: undefined
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "pipeline_list_pipelines",
      expect.objectContaining({
        title: "pipeline_list_pipelines"
      }),
      expect.any(Function)
    );
  });

  it("registers generated official endpoint tools", () => {
    const registerTool = vi.fn();
    const endpointTool = getOfficialEndpointToolsByFamily("build").find(
      (tool) => tool.pathTemplate === "/v1/log/{job_id}/{build_no}/real-time-log"
    );

    expect(endpointTool).toBeDefined();
    expect(resolveProductToolFamily(endpointTool!.name)).toBe("build");

    const handled = registerProductTool({
      toolName: endpointTool!.name,
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      stdioClients: undefined
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      endpointTool!.name,
      expect.objectContaining({
        title: endpointTool!.name,
        description: endpointTool!.description
      }),
      expect.any(Function)
    );
  });

  it("registers the latest Check and Req official endpoint additions", () => {
    const registerTool = vi.fn();
    const expectedEndpoints = [
      ["check", "PUT", "/v2/plugins"],
      ["check", "GET", "/v2/system-configs"],
      ["check", "PUT", "/v1/tenant-configs/{id}"],
      ["check", "DELETE", "/v1/tenant-configs/{id}"],
      ["check", "GET", "/v1/tenant-configs"],
      ["check", "POST", "/v1/tenant-configs"],
      ["check", "GET", "/v1/config/simple/{config_id}"],
      ["check", "POST", "/v1/task/recover-data"],
      ["check", "GET", "/v2/backup/backup-infos"],
      ["check", "POST", "/v2/tasks/"],
      ["check", "GET", "/v2/tasks/"],
      ["req", "GET", "/v4/iterations/{iteration_id}/histories"]
    ] as const;

    for (const [family, method, pathTemplate] of expectedEndpoints) {
      const endpointTool = getOfficialEndpointToolsByFamily(family).find(
        (tool) => tool.method === method && tool.pathTemplate === pathTemplate
      );

      expect(endpointTool, `${family} ${method} ${pathTemplate}`).toBeDefined();
      expect(resolveProductToolFamily(endpointTool!.name)).toBe(family);
      expect(
        registerProductTool({
          toolName: endpointTool!.name,
          server: { registerTool },
          mode: "http",
          sessionStore: createSessionCredentialStore(),
          stdioClients: undefined
        })
      ).toBe(true);
    }

    expect(registerTool).toHaveBeenCalledTimes(expectedEndpoints.length);
  });

  it("returns false when no product registrar handles the tool", () => {
    const registerTool = vi.fn();

    const handled = registerProductTool({
      toolName: "totally_unknown_tool",
      server: { registerTool },
      mode: "stdio",
      stdioClients: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });

  it("resolves every published product tool to a direct module family", () => {
    expect(resolveProductToolFamily("pipeline_list_pipelines")).toBe("pipeline");
    expect(resolveProductToolFamily("req_list_projects")).toBe("req");
    expect(resolveProductToolFamily("totally_unknown_tool")).toBeUndefined();
    expect(resolveProductToolFamily("req_not_in_manifest")).toBeUndefined();

    expect(
      collectToolNames().every((toolName) => resolveProductToolFamily(toolName) !== undefined)
    ).toBe(true);
  });
});
