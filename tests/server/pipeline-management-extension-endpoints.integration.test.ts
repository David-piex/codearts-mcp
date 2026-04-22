import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateExtensionEndpointHandler,
  createSessionAwarePipelineDeleteExtensionEndpointHandler,
  createSessionAwarePipelineUpdateExtensionEndpointHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_create_extension_endpoint through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateExtensionEndpointHandler,
      input: {
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: "Maven Central",
        url: "https://repo.example.com",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao",
            password: "secret"
          }
        },
        data: {
          repo: "central"
        },
        dry_run: false
      },
      responsePayload: {
        result: {
          uuid: "endpoint-1",
          project_uuid: "project-1",
            region_name: "cn-north-4",
            module_id: "module-1",
            name: "Maven Central",
            url: "https://repo.example.com",
            authorization: {
              scheme: "endpoint-auth-scheme-basic",
              parameters: {
                username: "yao"
              }
            },
          data: {
            repo: "central"
          }
        }
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "endpoint-1",
          uuid: "endpoint-1",
          projectId: "project-1",
          moduleId: "module-1",
          regionName: "cn-north-4",
          name: "Maven Central",
          url: "https://repo.example.com",
          authorization: {
            scheme: "endpoint-auth-scheme-basic"
          },
          data: {
            repo: "central"
          },
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v1/serviceconnection/endpoints");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"project_uuid\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"module_id\":\"module-1\"");
    expect(String(request.init.body)).toContain("\"region_name\":\"cn-north-4\"");
    expect(String(request.init.body)).toContain("\"name\":\"Maven Central\"");
    expect(String(request.init.body)).toContain("\"url\":\"https://repo.example.com\"");
    expect(String(request.init.body)).toContain("\"scheme\":\"endpoint-auth-scheme-basic\"");
  });

  it("executes pipeline_update_extension_endpoint through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateExtensionEndpointHandler,
      input: {
        uuid: "endpoint-1",
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: "Maven Central v2",
        url: "https://repo.example.com/v2",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao",
            password: "secret"
          }
        },
        data: {
          repo: "mirror"
        },
        dry_run: false
      },
      responsePayload: {
        result: {
          uuid: "endpoint-1",
          project_uuid: "project-1",
            region_name: "cn-north-4",
            module_id: "module-1",
            name: "Maven Central v2",
            url: "https://repo.example.com/v2",
            authorization: {
              scheme: "endpoint-auth-scheme-basic",
              parameters: {
                username: "yao"
              }
            },
          data: {
            repo: "mirror"
          }
        }
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "endpoint-1",
          uuid: "endpoint-1",
          projectId: "project-1",
          moduleId: "module-1",
          regionName: "cn-north-4",
          name: "Maven Central v2",
          url: "https://repo.example.com/v2",
          authorization: {
            scheme: "endpoint-auth-scheme-basic"
          },
          data: {
            repo: "mirror"
          },
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v1/serviceconnection/endpoints/endpoint-1");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"project_uuid\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"module_id\":\"module-1\"");
    expect(String(request.init.body)).toContain("\"region_name\":\"cn-north-4\"");
    expect(String(request.init.body)).toContain("\"name\":\"Maven Central v2\"");
    expect(String(request.init.body)).toContain("\"url\":\"https://repo.example.com/v2\"");
  });

  it("executes pipeline_delete_extension_endpoint through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteExtensionEndpointHandler,
      input: {
        uuid: "endpoint-1",
        project_id: "project-1",
        dry_run: false
      },
      responsePayload: {
        status: "success"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "endpoint-1",
          uuid: "endpoint-1",
          projectId: "project-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v1/serviceconnection/endpoints/endpoint-1?");
    expect(String(request.url)).toContain("project_uuid=project-1");
    expect(request.init.method).toBe("DELETE");
  });
});
