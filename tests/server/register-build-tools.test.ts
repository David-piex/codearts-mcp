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
      ["build_get_job_running_status_v3", "Get CodeArts Build v3 job running status"],
      ["build_get_job_step_status", "Get CodeArts Build job step status"],
      ["build_list_all_jobs", "List CodeArts Build jobs visible to the current user"],
      ["build_list_brief_records", "List CodeArts Build brief records by build project IDs"],
      ["build_list_job_history_v3", "List CodeArts Build v3 job history records"],
      ["build_list_project_endpoints", "List CodeArts Build project endpoints"],
      ["build_get_task_log_page", "Get CodeArts Build finished task step log page"],
      ["build_download_build_log_v4", "Download CodeArts Build v4 full log file"],
      ["build_download_task_log_v4", "Download CodeArts Build v4 task log file"],
      ["build_download_keystore_v2", "Download CodeArts Build v2 keystore file"],
      ["build_download_keystore_v3", "Download CodeArts Build v3 keystore file"],
      ["build_list_usable_keystore_names", "List CodeArts Build usable keystore names"],
      ["build_get_keystore_permission", "Get CodeArts Build keystore permission"],
      ["build_delete_job", "Delete CodeArts Build job"],
      ["build_set_keep_time", "Set CodeArts Build recycling keep time"],
      ["build_delete_recycling_jobs", "Delete CodeArts Build recycling jobs permanently"],
      ["build_clear_recycling_jobs", "Clear all CodeArts Build recycling jobs"],
      ["build_restore_recycling_jobs", "Restore CodeArts Build recycling jobs"],
      ["build_follow_job", "Follow CodeArts Build job"],
      ["build_unfollow_job", "Unfollow CodeArts Build job"],
      ["build_delete_template", "Delete CodeArts Build template"],
      ["build_save_template_used_info", "Save CodeArts Build template usage record"],
      ["build_follow_custom_template", "Follow CodeArts Build custom template"],
      ["build_unfollow_custom_template", "Unfollow CodeArts Build custom template"],
      ["build_follow_official_template", "Follow CodeArts Build official template"],
      ["build_unfollow_official_template", "Unfollow CodeArts Build official template"],
      ["build_delete_keystore", "Delete CodeArts Build keystore"],
      ["build_delete_keystore_permission", "Delete CodeArts Build keystore permission"],
      ["build_delete_job_v3", "Delete CodeArts Build v3 job"],
      ["build_recover_job_v3", "Recover CodeArts Build v3 job"],
      ["build_check_webhook_url", "Check CodeArts Build webhook URL parameters"],
      ["build_auto_execute_job", "Auto-execute CodeArts Build job from source update event payload"],
      ["build_batch_update_job_permissions", "Batch update CodeArts Build job permissions"],
      ["build_batch_delete_jobs", "Batch delete CodeArts Build jobs"],
      ["build_batch_set_agency", "Batch set CodeArts Build job agency"],
      ["build_update_job_role_permission", "Update CodeArts Build job role permission"],
      ["build_move_job_group", "Move CodeArts Build jobs to a target group"],
      ["build_create_job", "Create CodeArts Build job"],
      ["build_copy_job", "Copy CodeArts Build job"],
      ["build_update_job_notice", "Update CodeArts Build job notice"],
      ["build_create_job_group", "Create CodeArts Build job group"],
      ["build_upload_keystore", "Upload CodeArts Build keystore file"],
      ["build_delete_job_group", "Delete CodeArts Build job group"],
      ["build_swap_job_group", "Swap CodeArts Build job group order"],
      ["build_add_keystore_permission", "Add CodeArts Build keystore permission"]
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
