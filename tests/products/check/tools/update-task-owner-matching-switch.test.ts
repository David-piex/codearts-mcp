import { describe, expect, it, vi } from "vitest";
import { createCheckUpdateTaskOwnerMatchingSwitchHandler } from "../../../../src/products/check/tools/update-task-owner-matching-switch.js";

describe("createCheckUpdateTaskOwnerMatchingSwitchHandler", () => {
  it("previews owner matching switch update by default", async () => {
    const handler = createCheckUpdateTaskOwnerMatchingSwitchHandler({
      updateTaskOwnerMatchingSwitch: async () => {
        throw new Error("dry run should not update owner matching switch");
      }
    });

    const result = await handler({ task_id: "task-1", enabled: true });
    expect(result.content[0]?.text).toContain("Dry run: update Check task owner matching switch task-1");
  });

  it("executes owner matching switch update when dry_run is false", async () => {
    const client = {
      updateTaskOwnerMatchingSwitch: vi.fn(async (input: { task_id: string; enabled: boolean }) => ({
        task_id: input.task_id,
        status: "ok",
        result: "success",
        raw: { enabled: input.enabled }
      }))
    };
    const handler = createCheckUpdateTaskOwnerMatchingSwitchHandler(client);

    const result = await handler({ task_id: "task-1", enabled: false, dry_run: false });
    expect(client.updateTaskOwnerMatchingSwitch).toHaveBeenCalledWith({
      task_id: "task-1",
      enabled: false,
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Updated Check task owner matching switch task-1");
  });
});
