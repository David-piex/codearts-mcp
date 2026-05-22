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
  it("returns normalized official issue detail data", () => {
    const result = mapReqWorkItemIssueDetails({
      id: "2884248",
      subject: "33333",
      description: "<p>story desc</p>",
      status: { id: 1, name: "New" },
      tracker: { id: 7, name: "Story" },
      project: { identifier: "p-1", name: "Project A" },
      module: { id: 8, name: "Module A" },
      parent_issue: { id: 200, name: "Parent story" },
      assigned_to: {
        id: 16666,
        identifier: "user-uuid-2",
        name: "tenant/bob",
        assigned_nick_name: "Bob"
      },
      custom_fields: [{ name: "business_area", value: "payment" }],
      accessories_list: [{ id: 1, file_name: "demo.json" }],
      journals: [
        {
          id: "10",
          notes: "first comment",
          created_on: "2026-05-18T08:00:00Z",
          user: {
            id: "1",
            first_name: "Alice",
            last_name: "Wang",
            name: "alice",
            identifier: "user-1",
            user_num_id: 1
          }
        },
        {
          id: "11",
          notes: "latest comment",
          created_on: "2026-05-18T09:00:00Z",
          user: {
            id: "2",
            first_name: "Bob",
            last_name: "Li",
            name: "bob",
            identifier: "user-2",
            user_num_id: 2
          }
        }
      ]
    });

    expect(result.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      status: { id: 1, name: "New" },
      tracker: { id: 7, name: "Story" },
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      project: { identifier: "p-1", name: "Project A" },
      module: { id: 8, name: "Module A" },
      parentIssue: { id: 200, name: "Parent story" },
      customFields: [{ name: "business_area", value: "payment" }],
      attachments: [{ id: 1, file_name: "demo.json" }],
      latestComment: "latest comment",
      comments: [
        {
          id: "10",
          content: "first comment",
          createdTime: "2026-05-18T08:00:00Z",
          author: {
            id: "1",
            userName: "alice",
            nickName: "Alice Wang",
            userNumId: 1
          }
        },
        {
          id: "11",
          content: "latest comment",
          createdTime: "2026-05-18T09:00:00Z",
          author: {
            id: "2",
            userName: "bob",
            nickName: "Bob Li",
            userNumId: 2
          }
        }
      ]
    });
    expect(result.summary).toBe("Loaded work item issue details 2884248 (assignee: Bob)");
  });
});

describe("createReqGetWorkItemIssueDetailsHandler", () => {
  it("returns normalized official issue detail output", async () => {
    const client = {
      getWorkItemIssueDetails: vi.fn(async () => ({
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        status: { id: 1, name: "New" },
        tracker: { id: 7, name: "Story" },
        project: { identifier: "p-1", name: "Project A" },
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        },
        journals: [
          {
            id: "11",
            notes: "latest comment",
            created_on: "2026-05-18T09:00:00Z",
            user: {
              id: "2",
              first_name: "Bob",
              last_name: "Li",
              name: "bob",
              identifier: "user-2",
              user_num_id: 2
            }
          }
        ]
      }))
    };
    const handler = createReqGetWorkItemIssueDetailsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "2884248"
    });

    expect(client.getWorkItemIssueDetails).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "2884248",
      include: "children,parent"
    });
    expect(result.content[0]?.text).toContain("Loaded work item issue details 2884248 (assignee: Bob)");
    expect(result.structuredContent.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      status: { id: 1, name: "New" },
      tracker: { id: 7, name: "Story" },
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      project: { identifier: "p-1", name: "Project A" },
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
          author: {
            id: "2",
            userName: "bob",
            nickName: "Bob Li",
            userNumId: 2
          }
        }
      ]
    });
  });

  it("rethrows underlying provider errors from official V2 reads", async () => {
    const client = {
      getWorkItemIssueDetails: vi.fn(async () => {
        throw new AppError("provider_error", "network busy", "DEV_21_50000", "req-1", 400);
      })
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
