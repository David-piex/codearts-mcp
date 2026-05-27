import { describe, expect, it, vi } from "vitest";
import { registerCheckTool } from "../../src/server/register-check-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerCheckTool", () => {
  it("registers a known check tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_list_tasks",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_list_tasks",
      expect.objectContaining({
        title: "check_list_tasks",
        description: "List CodeArts Check tasks"
      }),
      expect.any(Function)
    );
  });

  it("registers a known check tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_get_task",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_get_task",
      expect.objectContaining({
        title: "check_get_task",
        description: "Get CodeArts Check task detail"
      }),
      expect.any(Function)
    );
  });

  it("registers additional check task metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_get_task_resource_pool",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_get_task_resource_pool",
      expect.objectContaining({
        title: "check_get_task_resource_pool",
        description: "Get CodeArts Check task resource pool"
      }),
      expect.any(Function)
    );
  });

  it("registers new read-only check tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["check_list_task_files", "List CodeArts Check task files"],
      ["check_list_task_all_files", "List CodeArts Check task all files"],
      ["check_detect_task_language", "Detect CodeArts Check task language"],
      ["check_list_codehub_repositories", "List CodeArts Check CodeHub repositories"],
      ["check_get_domain_checkers_version", "Get CodeArts Check domain checkers version"],
      ["check_list_task_check_records", "List CodeArts Check task check records"],
      ["check_list_rules", "List CodeArts Check rules"],
      ["check_list_default_rulesets", "List CodeArts Check default rulesets"],
      ["check_list_supported_languages", "List CodeArts Check supported languages"],
      ["check_get_task_notification", "Get CodeArts Check task notification settings"],
      ["check_get_code_sum_measures", "Get CodeArts Check tenant code sum measures"],
      ["check_list_plugins", "List CodeArts Check plugins"],
      ["check_get_task_webhook_info", "Get CodeArts Check task webhook info"],
      ["check_get_code_health_svg", "Get CodeArts Check code health SVG"],
      ["check_list_task_repository_branches", "List CodeArts Check task repository branches"],
      ["check_get_transmission_notification", "Get CodeArts Check transmission notification settings"],
      ["check_get_tenant_package_status", "Get CodeArts Check tenant package status"],
      ["check_list_template_tasks", "List CodeArts Check template tasks"],
      ["check_list_ruleset_rules", "List CodeArts Check ruleset rules"],
      ["check_list_criterionsets_by_language", "List CodeArts Check criterionsets by language"],
      ["check_get_criterion_rule", "Get CodeArts Check criterion rule"],
      ["check_list_third_tools", "List CodeArts Check third tools"],
      ["check_get_criterionset", "Get CodeArts Check criterionset"],
      ["check_list_all_criterionsets", "List all CodeArts Check criterionsets"],
      ["check_list_criterion_filters", "List CodeArts Check criterion filters"],
      ["check_list_criterions", "List CodeArts Check criterions"],
      ["check_get_defect_task_statistics", "Get CodeArts Check defect task statistics"],
      ["check_get_task_by_id", "Get CodeArts Check task by ID"],
      ["check_get_task_issue_statistics", "Get CodeArts Check task issue statistics"],
      ["check_get_defect_metric_trend", "Get CodeArts Check defect metric trend"],
      ["check_list_defect_next_statuses", "List CodeArts Check defect next statuses"],
      ["check_get_single_defect", "Get CodeArts Check single defect detail"],
      ["check_get_async_job_v2", "Get CodeArts Check async job V2 progress"],
      ["check_get_task_measures", "Get CodeArts Check task measures"],
      ["check_download_log_file", "Get CodeArts Check log file content"],
      ["check_get_defect_file_content", "Get CodeArts Check defect source file content"],
      ["check_get_vpcep_authorization", "Get CodeArts Check VPC endpoint authorization"],
      ["check_list_task_check_list", "List CodeArts Check task check list"],
      ["check_list_task_jobs_v4", "List CodeArts Check task jobs via official v4 API"],
      ["check_list_task_last_jobs_v4", "List CodeArts Check task last jobs via official v4 API"],
      ["check_list_task_file_list_v4", "List CodeArts Check task file list via official v4 API"],
      ["check_list_task_all_files_v4", "List CodeArts Check task all files via official v4 API"],
      ["check_get_task_webhook_info_v4", "Get CodeArts Check task webhook info via official v4 API"],
      ["check_list_task_branches_v4", "List CodeArts Check task branches via official v4 API"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerCheckTool({
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

  it("returns false for non-check tools", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "build_list_jobs",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
