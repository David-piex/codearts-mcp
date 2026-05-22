import { describe, expect, it, vi } from "vitest";
import { registerTestPlanTool } from "../../src/server/register-testplan-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerTestPlanTool", () => {
  it("registers a known testplan tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_plans",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_plans",
      expect.objectContaining({
        title: "testplan_list_plans",
        description: "List CodeArts TestPlan plans"
      }),
      expect.any(Function)
    );
  });

  it("registers a known testplan tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_run_cases",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_run_cases",
      expect.objectContaining({
        title: "testplan_run_cases",
        description: "Run CodeArts TestPlan cases"
      }),
      expect.any(Function)
    );
  });

  it("registers project local config read tool", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_get_project_local_config",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_get_project_local_config",
      expect.objectContaining({
        title: "testplan_get_project_local_config",
        description: "Get CodeArts TestPlan project local configuration"
      }),
      expect.any(Function)
    );
  });

  it("registers API test AW metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_api_test_child_basic_aws",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_api_test_child_basic_aws",
      expect.objectContaining({
        title: "testplan_list_api_test_child_basic_aws",
        description: "List CodeArts TestPlan API test child basic AW entries without script content"
      }),
      expect.any(Function)
    );
  });

  it("registers test design template download metadata tool", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_download_test_design_template",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_download_test_design_template",
      expect.objectContaining({
        title: "testplan_download_test_design_template",
        description: "Get CodeArts TestPlan test design template download metadata"
      }),
      expect.any(Function)
    );
  });

  it("registers functional test status read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_get_functional_test_parallel_summary",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_get_functional_test_parallel_summary",
      expect.objectContaining({
        title: "testplan_get_functional_test_parallel_summary",
        description: "Get CodeArts TestPlan functional test parallel summary"
      }),
      expect.any(Function)
    );
  });

  it("registers additional project metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_project_defects",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_project_defects",
      expect.objectContaining({
        title: "testplan_list_project_defects",
        description: "List CodeArts TestPlan project defects"
      }),
      expect.any(Function)
    );
  });

  it("registers dynamic global variable tools", () => {
    const registerTool = vi.fn();

    expect(
      registerTestPlanTool({
        toolName: "testplan_list_dynamic_global_variables",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_get_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_update_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_delete_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
  });

  it("returns false for non-testplan tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "repo_list_repositories",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
