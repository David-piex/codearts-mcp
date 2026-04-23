import { describe, expect, it, vi } from "vitest";
import { reqListAssociatedCommitsInput as reqListAssociatedCommitsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListAssociatedCommitsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListAssociatedCommitsHandler,
  mapReqAssociatedCommits
} from "../../../../src/products/req/tools/list-associated-commits.js";

describe("mapReqAssociatedCommits", () => {
  it("returns normalized associated commits with pagination", () => {
    const result = mapReqAssociatedCommits(
      [
        {
          branch_name: "feature/login",
          commit_id: "abc123def456",
          commit_msg: "feat: add login flow",
          commit_short_id: "abc123d",
          commit_url: "https://example.com/commit/abc123def456",
          create_date: "2026-04-23T10:00:00Z",
          repository_id: "repo-1",
          type: "commit",
          update_date: "2026-04-23T10:05:00Z",
          user: {
            nick_name: "Alice",
            user_id: "user-1"
          }
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "abc123def456",
        branchName: "feature/login",
        message: "feat: add login flow",
        shortId: "abc123d",
        url: "https://example.com/commit/abc123def456",
        createDate: "2026-04-23T10:00:00Z",
        repositoryId: "repo-1",
        type: "commit",
        updateDate: "2026-04-23T10:05:00Z",
        author: {
          nickName: "Alice",
          userId: "user-1"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListAssociatedCommitsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    };

    expect(reqListAssociatedCommitsInput.parse(input)).toEqual({
      ...input,
      type: "commit"
    });
    expect(reqListAssociatedCommitsInputFromBarrel.parse(input)).toEqual({
      ...input,
      type: "commit"
    });
  });
});

describe("createReqListAssociatedCommitsHandler", () => {
  it("returns content and structured output for normalized associated commits", async () => {
    const client = {
      listAssociatedCommits: vi.fn(async () => ({
        commits: [
          {
            branch_name: "feature/login",
            commit_id: "abc123def456",
            commit_msg: "feat: add login flow",
            commit_short_id: "abc123d",
            commit_url: "https://example.com/commit/abc123def456",
            create_date: "2026-04-23T10:00:00Z",
            repository_id: "repo-1",
            type: "commit",
            update_date: "2026-04-23T10:05:00Z",
            user: {
              nick_name: "Alice",
              user_id: "user-1"
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListAssociatedCommitsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listAssociatedCommits).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20,
      type: "commit"
    });
    expect(result.content[0]?.text).toContain("1 associated commits found");
    expect(result.structuredContent).toEqual({
      summary: "1 associated commits found",
      items: [
        {
          id: "abc123def456",
          branchName: "feature/login",
          message: "feat: add login flow",
          shortId: "abc123d",
          url: "https://example.com/commit/abc123def456",
          createDate: "2026-04-23T10:00:00Z",
          repositoryId: "repo-1",
          type: "commit",
          updateDate: "2026-04-23T10:05:00Z",
          author: {
            nickName: "Alice",
            userId: "user-1"
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 1
      },
      raw: undefined
    });
  });
});
