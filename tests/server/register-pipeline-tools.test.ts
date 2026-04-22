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
    ["pipeline_list_publishers", "List CodeArts Pipeline publishers"]
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
