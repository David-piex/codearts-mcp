import { describe, expect, it } from "vitest";
import { createRepoListEventsHandler } from "../../../../src/products/repo/tools/list-events.js";

describe("createRepoListEventsHandler", () => {
  it("maps repository events into MCP output", async () => {
    const handler = createRepoListEventsHandler({
      listEvents: async () => ({
        events: [
          {
            id: "evt-1",
            action_name: "pushed to",
            ref_name: "main",
            author_name: "yao",
            created_at: "2026-04-15T22:00:00+08:00"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      repository_id: "1001",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "evt-1",
      actionName: "pushed to",
      refName: "main",
      authorName: "yao",
      createdAt: "2026-04-15T22:00:00+08:00"
    });
  });
});
