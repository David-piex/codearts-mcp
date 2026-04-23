import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemCommentsInput as reqListWorkItemCommentsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemCommentsInput } from "../../../../src/products/req/schemas/comment.js";
import {
  createReqListWorkItemCommentsHandler,
  mapReqWorkItemComments
} from "../../../../src/products/req/tools/list-work-item-comments.js";

describe("mapReqWorkItemComments", () => {
  it("returns normalized work item comments with pagination", () => {
    const result = mapReqWorkItemComments(
      [
        {
          id: 88,
          comment: "Looks good",
          created_time: "2026-04-20T10:00:00Z",
          timestamp: 1_745_145_600_000,
          user: {
            nick_name: "Alice",
            user_name: "alice",
            user_num_id: 1001
          }
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "88",
        content: "Looks good",
        createdTime: "2026-04-20T10:00:00Z",
        timestamp: 1_745_145_600_000,
        author: {
          nickName: "Alice",
          userName: "alice",
          userNumId: 1001
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

describe("reqListWorkItemCommentsInput exports", () => {
  it("keeps the barrel export compatible with the comment schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    };

    expect(reqListWorkItemCommentsInput.parse(input)).toEqual(input);
    expect(reqListWorkItemCommentsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemCommentsHandler", () => {
  it("returns content and structured output for normalized comments", async () => {
    const client = {
      listWorkItemComments: vi.fn(async () => ({
        comments: [
          {
            id: 88,
            comment: "Looks good",
            created_time: "2026-04-20T10:00:00Z",
            timestamp: 1_745_145_600_000,
            user: {
              nick_name: "Alice",
              user_name: "alice",
              user_num_id: 1001
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListWorkItemCommentsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listWorkItemComments).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 work item comments found");
    expect(result.structuredContent).toEqual({
      summary: "1 work item comments found",
      items: [
        {
          id: "88",
          content: "Looks good",
          createdTime: "2026-04-20T10:00:00Z",
          timestamp: 1_745_145_600_000,
          author: {
            nickName: "Alice",
            userName: "alice",
            userNumId: 1001
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

  it("adds a project-scoped hint when the work item comment list is empty", async () => {
    const handler = createReqListWorkItemCommentsHandler({
      listWorkItemComments: async () => ({
        comments: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 work item comments found");
    expect(result.content[0]?.text).toContain("If you expected work item comments here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
