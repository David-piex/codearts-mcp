import { describe, expect, it, vi } from "vitest";
import { registerPipelineTool } from "../../src/server/register-pipeline-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerPipelineTool", () => {
  it("registers a known pipeline tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerPipelineTool({
      toolName: "pipeline_list_pipelines",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "pipeline_list_pipelines",
      expect.objectContaining({
        title: "pipeline_list_pipelines",
        description: "List CodeArts Pipelines"
      }),
      expect.any(Function)
    );
  });

  it("registers a known pipeline tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerPipelineTool({
      toolName: "pipeline_run_pipeline",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "pipeline_run_pipeline",
      expect.objectContaining({
        title: "pipeline_run_pipeline",
        description: "Run CodeArts Pipeline"
      }),
      expect.any(Function)
    );
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
