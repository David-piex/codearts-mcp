import { describe, expect, it, vi } from "vitest";
import { createCheckUpdateTaskConfigParametersHandler } from "../../../../src/products/check/tools/update-task-config-parameters.js";

describe("createCheckUpdateTaskConfigParametersHandler", () => {
  it("previews config parameters update by default", async () => {
    const handler = createCheckUpdateTaskConfigParametersHandler({
      updateTaskConfigParameters: async () => {
        throw new Error("dry run should not update config parameters");
      }
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "full" }
    });
    expect(result.content[0]?.text).toContain("Dry run: update Check task config parameters task-1");
  });

  it("executes config parameters update when dry_run is false", async () => {
    const client = {
      updateTaskConfigParameters: vi.fn(async (input: { project_id: string; task_id: string; body: Record<string, unknown> }) => ({
        task_id: input.task_id,
        status: "ok",
        result: "success",
        raw: input.body
      }))
    };
    const handler = createCheckUpdateTaskConfigParametersHandler(client);

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "incremental" },
      dry_run: false
    });
    expect(client.updateTaskConfigParameters).toHaveBeenCalledWith({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "incremental" },
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Updated Check task config parameters task-1");
  });
});
