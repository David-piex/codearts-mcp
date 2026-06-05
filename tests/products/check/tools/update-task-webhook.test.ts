import { describe, expect, it, vi } from "vitest";
import { createCheckUpdateTaskWebhookHandler } from "../../../../src/products/check/tools/update-task-webhook.js";

describe("createCheckUpdateTaskWebhookHandler", () => {
  it("previews task webhook update by default", async () => {
    const handler = createCheckUpdateTaskWebhookHandler({
      updateTaskWebhook: async () => {
        throw new Error("dry run should not update webhook");
      }
    });

    const result = await handler({
      task_id: "task-1",
      body: { enabled: true, url: "https://example.com/hook" }
    });
    expect(result.content[0]?.text).toContain("Dry run: update Check task webhook task-1");
  });

  it("executes task webhook update when dry_run is false", async () => {
    const client = {
      updateTaskWebhook: vi.fn(async (input: { task_id: string; body: Record<string, unknown> }) => ({
        task_id: input.task_id,
        status: "ok",
        result: "success",
        raw: input.body
      }))
    };
    const handler = createCheckUpdateTaskWebhookHandler(client);

    const result = await handler({
      task_id: "task-1",
      body: { enabled: false, url: "https://example.com/hook" },
      dry_run: false
    });
    expect(client.updateTaskWebhook).toHaveBeenCalledWith({
      task_id: "task-1",
      body: { enabled: false, url: "https://example.com/hook" },
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Updated Check task webhook task-1");
  });
});
