import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_extension_endpoint executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_extension_endpoint",
      responsePayload: {
        result: {
          uuid: "endpoint-1",
          project_uuid: "project-1",
          module_id: "module-1",
          name: "Maven Central"
        }
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: `Maven Central ${index}`,
        url: "https://repo.example.com",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao"
          }
        },
        data: {
          repo: "central"
        },
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: "Maven Central blocked",
        url: "https://repo.example.com",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao"
          }
        },
        data: {
          repo: "central"
        },
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_update_extension_endpoint executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_extension_endpoint",
      responsePayload: {
        result: {
          uuid: "endpoint-1",
          project_uuid: "project-1",
          module_id: "module-1",
          name: "Maven Central v2"
        }
      },
      allowedInput: (index) => ({
        uuid: "endpoint-1",
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: `Maven Central ${index}`,
        url: "https://repo.example.com",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao"
          }
        },
        data: {
          repo: "central"
        },
        dry_run: false
      }),
      blockedInput: {
        uuid: "endpoint-1",
        project_id: "project-1",
        module_id: "module-1",
        region_name: "cn-north-4",
        name: "Maven Central blocked",
        url: "https://repo.example.com",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "yao"
          }
        },
        data: {
          repo: "central"
        },
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_extension_endpoint executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_extension_endpoint",
      responsePayload: {
        status: "success"
      },
      allowedInput: (index) => ({
        uuid: `endpoint-${index}`,
        project_id: "project-1",
        dry_run: false
      }),
      blockedInput: {
        uuid: "endpoint-blocked",
        project_id: "project-1",
        dry_run: false
      }
    });
  });
});
