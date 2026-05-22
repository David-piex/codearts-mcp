import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../../../src/core/errors/app-error.js";
import { reqGetWorkItemIssueDetailsInput as reqGetWorkItemIssueDetailsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetWorkItemIssueDetailsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetWorkItemIssueDetailsHandler,
  mapReqWorkItemIssueDetails
} from "../../../../src/products/req/tools/get-work-item-issue-details.js";

describe("reqGetWorkItemIssueDetailsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "2884248"
    };

    expect(reqGetWorkItemIssueDetailsInput.parse(input)).toEqual({
      ...input,
      include: "children,parent"
    });
    expect(reqGetWorkItemIssueDetailsInputFromBarrel.parse(input)).toEqual({
      ...input,
      include: "children,parent"
    });
  });
});

describe("mapReqWorkItemIssueDetails", () => {
  it("returns normalized aggregated issue detail data", () => {
    const result = mapReqWorkItemIssueDetails({
      workItem: {
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        status: { id: 1, name: "New" },
        tracker_name: "Story",
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        }
      },
      comments: [
        {
          id: "10",
          comment: "first comment",
          created_time: "2026-05-18T08:00:00Z",
          timestamp: 100,
          user: {
            nick_name: "Alice",
            user_name: "alice",
            user_num_id: 1
          }
        },
        {
          id: "11",
          comment: "latest comment",
          created_time: "2026-05-18T09:00:00Z",
          timestamp: 200,
          user: {
            nick_name: "Bob",
            user_name: "bob",
            user_num_id: 2
          }
        }
      ]
    });

    expect(result.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: undefined,
      updatedOn: undefined,
      status: { id: 1, name: "New" },
      tracker: { name: "Story" },
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      project: undefined,
      module: undefined,
      parentIssue: undefined,
      customFields: [],
      attachments: [],
      latestComment: "latest comment",
      comments: [
        {
          id: "10",
          content: "first comment",
          createdTime: "2026-05-18T08:00:00Z",
          timestamp: 100,
          author: {
            nickName: "Alice",
            userName: "alice",
            userNumId: 1
          }
        },
        {
          id: "11",
          content: "latest comment",
          createdTime: "2026-05-18T09:00:00Z",
          timestamp: 200,
          author: {
            nickName: "Bob",
            userName: "bob",
            userNumId: 2
          }
        }
      ]
    });
    expect(result.summary).toBe("Loaded work item issue details 2884248 (assignee: Bob)");
  });
});

describe("createReqGetWorkItemIssueDetailsHandler", () => {
  it("returns normalized aggregated issue detail output", async () => {
    const client = {
      getWorkItem: vi.fn(async () => ({
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        status: { id: 1, name: "New" },
        tracker_name: "Story",
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        }
      })),
      listWorkItemComments: vi.fn(async () => ({
        comments: [
          {
            id: "11",
            comment: "latest comment",
            created_time: "2026-05-18T09:00:00Z",
            timestamp: 200,
            user: {
              nick_name: "Bob",
              user_name: "bob",
              user_num_id: 2
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqGetWorkItemIssueDetailsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "2884248"
    });

    expect(client.getWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "2884248"
    });
    expect(client.listWorkItemComments).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "2884248",
      page: 1,
      page_size: 100
    });
    expect(result.content[0]?.text).toContain("Loaded work item issue details 2884248 (assignee: Bob)");
    expect(result.structuredContent.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: undefined,
      updatedOn: undefined,
      status: { id: 1, name: "New" },
      tracker: { name: "Story" },
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      project: undefined,
      module: undefined,
      parentIssue: undefined,
      customFields: [],
      attachments: [],
      latestComment: "latest comment",
      comments: [
        {
          id: "11",
          content: "latest comment",
          createdTime: "2026-05-18T09:00:00Z",
          timestamp: 200,
          author: {
            nickName: "Bob",
            userName: "bob",
            userNumId: 2
          }
        }
      ]
    });
  });

  it("rethrows underlying provider errors from summary reads", async () => {
    const client = {
      getWorkItem: vi.fn(async () => {
        throw new AppError("provider_error", "network busy", "DEV_21_50000", "req-1", 400);
      }),
      listWorkItemComments: vi.fn()
    };
    const handler = createReqGetWorkItemIssueDetailsHandler(client);

    await expect(
      handler({
        project_id: "project-1",
        work_item_id: "2884248"
      })
    ).rejects.toMatchObject({
      category: "provider_error",
      message: "network busy",
      code: "DEV_21_50000",
      requestId: "req-1",
      status: 400
    });
  });
});
