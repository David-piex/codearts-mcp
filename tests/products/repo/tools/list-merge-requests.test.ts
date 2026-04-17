import { describe, expect, it } from "vitest";
import { mapMergeRequests } from "../../../../src/products/repo/tools/list-merge-requests.js";

describe("mapMergeRequests", () => {
  it("returns normalized merge requests with pagination", () => {
    const result = mapMergeRequests(
      [
        {
          id: 101,
          iid: 12,
          title: "Release 1.2.0",
          state: "opened",
          source_branch: "release/1.2.0",
          target_branch: "main",
          created_at: "2026-04-16T10:00:00Z",
          updated_at: "2026-04-16T10:30:00Z",
          author: { name: "Alice", nick_name: "alice" },
          web_url: "https://example.com/mr/12"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "101",
        iid: 12,
        title: "Release 1.2.0",
        state: "opened",
        sourceBranch: "release/1.2.0",
        targetBranch: "main",
        createdAt: "2026-04-16T10:00:00Z",
        updatedAt: "2026-04-16T10:30:00Z",
        authorName: "Alice",
        authorNickName: "alice",
        webUrl: "https://example.com/mr/12"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
