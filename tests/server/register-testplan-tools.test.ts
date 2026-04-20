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
