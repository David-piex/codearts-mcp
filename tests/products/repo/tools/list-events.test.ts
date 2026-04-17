import { describe, expect, it } from "vitest";
import { mapRepoEvents } from "../../../../src/products/repo/tools/list-events.js";

describe("mapRepoEvents", () => {
  it("returns normalized repo events with pagination", () => {
    const result = mapRepoEvents(
      [
        {
          id: "evt-1",
          action_name: "pushed to",
          ref_name: "main",
          author_name: "Bob",
          created_at: "2026-04-16T09:00:00Z"
        }
      ],
      2,
      10,
      21
    );

    expect(result.items).toEqual([
      {
        id: "evt-1",
        actionName: "pushed to",
        refName: "main",
        authorName: "Bob",
        createdAt: "2026-04-16T09:00:00Z"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 21
    });
  });
});
