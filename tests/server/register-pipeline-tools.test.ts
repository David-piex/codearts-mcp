import { describe, expect, it, vi } from "vitest";
import { registerPipelineTool } from "../../src/server/register-pipeline-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

function expectPipelineToolRegistration(options: {
  toolName: string;
  description: string;
  mode?: "stdio" | "http";
}) {
  const registerTool = vi.fn();

  const handled = registerPipelineTool({
    toolName: options.toolName,
    server: { registerTool },
    mode: options.mode ?? "http",
    ...(options.mode === "stdio"
      ? {
          stdioClient: {} as never
        }
      : {
          sessionStore: createSessionCredentialStore()
        })
  });

  expect(handled).toBe(true);
  expect(registerTool).toHaveBeenCalledWith(
    options.toolName,
    expect.objectContaining({
      title: options.toolName,
      description: options.description
    }),
    expect.any(Function)
  );
}

describe("registerPipelineTool", () => {
  it("registers a known pipeline tool in stdio mode", () => {
    expectPipelineToolRegistration({
      toolName: "pipeline_list_pipelines",
      description: "List CodeArts Pipelines",
      mode: "stdio",
    });
  });

  it.each([
    ["pipeline_run_pipeline", "Run CodeArts Pipeline"],
    ["pipeline_list_groups", "List CodeArts Pipeline groups"],
    ["pipeline_list_variable_groups", "List CodeArts Pipeline variable groups"],
    ["pipeline_list_rules", "List CodeArts Pipeline rules"],
    ["pipeline_list_tags", "List CodeArts Pipeline tags"],
    ["pipeline_list_strategies", "List CodeArts Pipeline strategies"],
    ["pipeline_list_project_strategies", "List CodeArts Pipeline project strategies"],
    ["pipeline_list_extension_modules", "List CodeArts Pipeline extension modules"],
    ["pipeline_list_publishers", "List CodeArts Pipeline publishers"],
    ["pipeline_get_webhook_info", "Get CodeArts Pipeline webhook info"],
    ["pipeline_list_related_projects", "List CodeArts Pipeline related projects"],
    ["pipeline_list_code_repositories", "List CodeArts Pipeline code repositories"],
    ["pipeline_list_code_branches", "List CodeArts Pipeline code branches"],
    ["pipeline_get_repository_number", "Get CodeArts Pipeline repository number"],
    ["pipeline_get_tenant_package_is_freeze", "Get CodeArts Pipeline tenant package freeze status"],
    ["pipeline_get_package_usage", "Get CodeArts Pipeline package usage"],
    ["pipeline_get_tenant_version_detail", "Get CodeArts Pipeline tenant version detail"],
    ["pipeline_list_pipeline_vars", "List CodeArts Pipeline variables"],
    ["pipeline_get_template", "Get CodeArts Pipeline template detail"],
    ["pipeline_batch_get_pipeline_status", "Batch get CodeArts Pipeline status records"],
    ["pipeline_get_notice_messages", "Get CodeArts Pipeline notice messages"],
    ["pipeline_update_project_notice_event_switch", "Update CodeArts Pipeline project notice event switch"],
    ["pipeline_update_pipeline_notice_conf", "Update CodeArts Pipeline notice configuration"],
    ["pipeline_batch_update_pipeline_permission", "Batch update CodeArts Pipeline permissions"],
    ["pipeline_check_project", "Check CodeArts Pipeline project"],
    ["pipeline_check_component", "Check CodeArts Pipeline component"],
    ["pipeline_check_variable_group_rights", "Check CodeArts Pipeline variable group rights"],
    ["pipeline_list_execution_plans", "List CodeArts Pipeline execution plans"],
    ["pipeline_list_reusable_jobs", "List CodeArts Pipeline reusable jobs"],
    ["pipeline_list_dashboard_pipeline_counts", "List CodeArts Pipeline dashboard pipeline counts"],
    ["pipeline_get_dashboard_executions_overview", "Get CodeArts Pipeline dashboard executions overview"],
    ["pipeline_get_dashboard_concurrency", "Get CodeArts Pipeline dashboard concurrency"],
    ["pipeline_create_change_request", "Create CodeArts Pipeline change request"],
    ["pipeline_update_change_request_status", "Update CodeArts Pipeline change request status"],
    ["pipeline_list_change_requests", "List CodeArts Pipeline change requests"],
    ["pipeline_list_change_request_creators", "List CodeArts Pipeline change request creators"],
    ["pipeline_get_change_request", "Get CodeArts Pipeline change request"],
    ["pipeline_list_change_request_operation_logs", "List CodeArts Pipeline change request operation logs"],
    ["pipeline_list_change_request_work_items", "List CodeArts Pipeline change request work items"],
    ["pipeline_update_change_request_work_items", "Update CodeArts Pipeline change request work items"],
    ["pipeline_create_component", "Create CodeArts Pipeline component"],
    ["pipeline_follow_component", "Follow a CodeArts Pipeline component"],
    ["pipeline_list_components", "List CodeArts Pipeline components"],
    ["pipeline_get_component", "Get CodeArts Pipeline component"],
    ["pipeline_get_component_follow_status", "Get CodeArts Pipeline component follow status"],
    ["pipeline_delete_component", "Delete CodeArts Pipeline component"],
    ["pipeline_unfollow_component", "Unfollow a CodeArts Pipeline component"],
    ["pipeline_update_component", "Update CodeArts Pipeline component"],
    ["pipeline_update_component_repos", "Update CodeArts Pipeline component repos"],
    ["pipeline_list_pac_actions", "List CodeArts Pipeline PAC actions"],
    ["pipeline_get_pac_action", "Get CodeArts Pipeline PAC action"],
    ["pipeline_get_oauth_authorization_url", "Get CodeArts Pipeline OAuth authorization URL"],
    ["pipeline_get_devuc_auth", "Get CodeArts Pipeline DevUC authorization status"],
    ["pipeline_create_template", "Create CodeArts Pipeline template"],
    ["pipeline_update_template", "Update CodeArts Pipeline template"],
    ["pipeline_delete_template", "Delete CodeArts Pipeline template"],
    ["pipeline_favorite_template", "Favorite or unfavorite a CodeArts Pipeline template"]
  ])("registers %s in http mode", (toolName, description) => {
    expectPipelineToolRegistration({
      toolName,
      description
    });
  });

  it("returns false for non-pipeline tools", () => {
    const registerTool = vi.fn();

    const handled = registerPipelineTool({
      toolName: "testplan_list_plans",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
