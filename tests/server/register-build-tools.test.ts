import { describe, expect, it, vi } from "vitest";
import { registerBuildTool } from "../../src/server/register-build-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerBuildTool", () => {
  it("registers a known build tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "build_list_jobs",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "build_list_jobs",
      expect.objectContaining({
        title: "build_list_jobs",
        description: "List CodeArts Build jobs"
      }),
      expect.any(Function)
    );
  });

  it("registers a known build tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "build_get_job",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "build_get_job",
      expect.objectContaining({
        title: "build_get_job",
        description: "Get CodeArts Build job detail"
      }),
      expect.any(Function)
    );
  });

  it("registers a Build metadata read tool", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "build_get_domain_job_summary",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "build_get_domain_job_summary",
      expect.objectContaining({
        title: "build_get_domain_job_summary",
        description: "Get CodeArts Build domain job summary"
      }),
      expect.any(Function)
    );
  });

  it("registers additional Build read tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["build_get_project_default_permission", "Get CodeArts Build project default permission"],
      ["build_get_job_info", "Get CodeArts Build job build information"],
      ["build_get_build_details", "Get CodeArts Build build status details"],
      ["build_get_output_info_v3", "Get CodeArts Build v3 output info"],
      ["build_get_record_info_v4", "Get CodeArts Build v4 record info"],
      ["build_list_official_templates", "List CodeArts Build official templates"],
      ["build_list_templates", "List CodeArts Build templates"],
      ["build_list_custom_templates", "List CodeArts Build custom templates"],
      ["build_list_job_notices_v3", "List CodeArts Build v3 job notices"],
      ["build_get_job_output", "Get CodeArts Build job output"],
      ["build_get_job_step_status", "Get CodeArts Build job step status"],
      ["build_list_project_endpoints", "List CodeArts Build project endpoints"],
      ["build_get_task_log_page", "Get CodeArts Build finished task step log page"],
      ["build_download_build_log_v4", "Download CodeArts Build v4 full log file"],
      ["build_download_task_log_v4", "Download CodeArts Build v4 task log file"],
      ["build_list_usable_keystore_names", "List CodeArts Build usable keystore names"],
      ["build_get_keystore_permission", "Get CodeArts Build keystore permission"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerBuildTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("returns false for non-build tools", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "artifact_get_file",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
