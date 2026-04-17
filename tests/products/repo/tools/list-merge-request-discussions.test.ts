import { describe, expect, it } from "vitest";
import { mapMergeRequestDiscussions } from "../../../../src/products/repo/tools/list-merge-request-discussions.js";

describe("mapMergeRequestDiscussions", () => {
  it("returns normalized merge request discussions with pagination", () => {
    const result = mapMergeRequestDiscussions(
      [
        {
          discussion_id: "d-1",
          body: "Looks good",
          created_at: "2026-04-17T08:00:00Z",
          author: { name: "Alice", nick_name: "alice" }
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "d-1",
        body: "Looks good",
        createdAt: "2026-04-17T08:00:00Z",
        authorName: "Alice",
        authorNickName: "alice"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
