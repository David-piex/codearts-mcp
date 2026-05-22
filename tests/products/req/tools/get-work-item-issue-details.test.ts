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
      created_on: "1779267066000",
      updated_on: "1779328509000",
      start_date: "1779379200000",
      due_date: "1779984000000",
      done_ratio: 20,
      expected_work_hours: 8,
      actual_work_hours: 3,
      release_dev: "R1",
      find_release_dev: "R0",
      inner_text: "latest raw comment",
      closed_flag: 0,
      is_archived: false,
      deleted: false,
      is_private: false,
      is_watcher: true,
      isContainDetailWorkingHours: true,
      lockVersion: 3,
      order: "1",
      position: "2",
      root_id: 100,
      assignedImageId: "assigned-image",
      authorImageId: "author-image",
      projectAuthorDomainId: "domain-id",
      status: { id: 1, name: "New" },
      status_attribute: { type: "new" },
      tracker: { id: 7, name: "Story" },
      priority: { id: 2, name: "Medium" },
      severity: { id: 12, name: "Normal" },
      project: { identifier: "p-1", name: "Project A" },
      module: { id: 8, name: "Module A" },
      domain: { id: 14, name: "Performance" },
      story_point: { id: 3, name: "1" },
      fixed_version: { id: 4, name: "Sprint 1" },
      parent_issue: { id: 200, name: "Parent story" },
      children: [{ id: 300, subject: "Child task" }],
      author: { id: 15533, name: "tenant/alice" },
      developer: { id: 17777, name: "tenant/dev" },
      closeder: { id: 19999, name: "tenant/closer" },
      assigned_to: {
        id: 16666,
        identifier: "user-uuid-2",
        name: "tenant/bob",
        assigned_nick_name: "Bob"
      },
      assigned_cc_user: [{ id: 18888, name: "tenant/cc" }],
      custom_fields: [{ name: "business_area", value: "payment" }],
      custom_value_new: { field_name: "business_area", value: "payment" },
      tagList: [{ id: 1, name: "tag-a" }],
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
      ],
      journals_total: 2,
      official_extra_field: { keep: true }
    });

    expect(result.raw).toEqual(result.item?.rawIssue);
    expect(result.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: "1779267066000",
      createdOnText: "2026-05-20 16:51:06 Asia/Shanghai",
      updatedOn: "1779328509000",
      updatedOnText: "2026-05-21 09:55:09 Asia/Shanghai",
      startDate: "1779379200000",
      startDateText: "2026-05-22 00:00:00 Asia/Shanghai",
      dueDate: "1779984000000",
      dueDateText: "2026-05-29 00:00:00 Asia/Shanghai",
      doneRatio: 20,
      expectedWorkHours: 8,
      actualWorkHours: 3,
      releaseDev: "R1",
      findReleaseDev: "R0",
      innerText: "latest raw comment",
      closedFlag: 0,
      isArchived: false,
      deleted: false,
      isPrivate: false,
      isWatcher: true,
      isContainDetailWorkingHours: true,
      lockVersion: 3,
      order: "1",
      position: "2",
      rootId: 100,
      assignedImageId: "assigned-image",
      authorImageId: "author-image",
      projectAuthorDomainId: "domain-id",
      status: { id: 1, name: "New" },
      statusAttribute: { type: "new" },
      tracker: { id: 7, name: "Story" },
      priority: { id: 2, name: "Medium" },
      severity: { id: 12, name: "Normal" },
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      assignedCcUsers: [{ id: 18888, name: "tenant/cc" }],
      project: { identifier: "p-1", name: "Project A" },
      module: { id: 8, name: "Module A" },
      domain: { id: 14, name: "Performance" },
      storyPoint: { id: 3, name: "1" },
      fixedVersion: { id: 4, name: "Sprint 1" },
      parentIssue: { id: 200, name: "Parent story" },
      children: [{ id: 300, subject: "Child task" }],
      author: { id: 15533, name: "tenant/alice" },
      developer: { id: 17777, name: "tenant/dev" },
      closeder: { id: 19999, name: "tenant/closer" },
      customFields: [{ name: "business_area", value: "payment" }],
      customValueNew: { field_name: "business_area", value: "payment" },
      tagList: [{ id: 1, name: "tag-a" }],
      attachments: [{ id: 1, file_name: "demo.json" }],
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
      ],
      journalsTotal: 2,
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
      ],
      rawIssue: {
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        created_on: "1779267066000",
        updated_on: "1779328509000",
        start_date: "1779379200000",
        due_date: "1779984000000",
        done_ratio: 20,
        expected_work_hours: 8,
        actual_work_hours: 3,
        release_dev: "R1",
        find_release_dev: "R0",
        inner_text: "latest raw comment",
        closed_flag: 0,
        is_archived: false,
        deleted: false,
        is_private: false,
        is_watcher: true,
        isContainDetailWorkingHours: true,
        lockVersion: 3,
        order: "1",
        position: "2",
        root_id: 100,
        assignedImageId: "assigned-image",
        authorImageId: "author-image",
        projectAuthorDomainId: "domain-id",
        status: { id: 1, name: "New" },
        status_attribute: { type: "new" },
        tracker: { id: 7, name: "Story" },
        priority: { id: 2, name: "Medium" },
        severity: { id: 12, name: "Normal" },
        project: { identifier: "p-1", name: "Project A" },
        module: { id: 8, name: "Module A" },
        domain: { id: 14, name: "Performance" },
        story_point: { id: 3, name: "1" },
        fixed_version: { id: 4, name: "Sprint 1" },
        parent_issue: { id: 200, name: "Parent story" },
        children: [{ id: 300, subject: "Child task" }],
        author: { id: 15533, name: "tenant/alice" },
        developer: { id: 17777, name: "tenant/dev" },
        closeder: { id: 19999, name: "tenant/closer" },
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        },
        assigned_cc_user: [{ id: 18888, name: "tenant/cc" }],
        custom_fields: [{ name: "business_area", value: "payment" }],
        custom_value_new: { field_name: "business_area", value: "payment" },
        tagList: [{ id: 1, name: "tag-a" }],
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
        ],
        journals_total: 2,
        official_extra_field: { keep: true }
      }
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
        created_on: "1779267066000",
        updated_on: "1779328509000",
        start_date: "1779379200000",
        due_date: "1779984000000",
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
    expect(result.content[0]?.text).toContain("title: 33333");
    expect(result.content[0]?.text).toContain("status: New");
    expect(result.content[0]?.text).toContain("type: Story");
    expect(result.content[0]?.text).toContain("assignee: Bob");
    expect(result.content[0]?.text).toContain("description: <p>story desc</p>");
    expect(result.content[0]?.text).toContain("createdOn: 2026-05-20 16:51:06 Asia/Shanghai");
    expect(result.content[0]?.text).toContain("latestComment: latest comment");
    expect(result.structuredContent.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: "1779267066000",
      createdOnText: "2026-05-20 16:51:06 Asia/Shanghai",
      updatedOn: "1779328509000",
      updatedOnText: "2026-05-21 09:55:09 Asia/Shanghai",
      startDate: "1779379200000",
      startDateText: "2026-05-22 00:00:00 Asia/Shanghai",
      dueDate: "1779984000000",
      dueDateText: "2026-05-29 00:00:00 Asia/Shanghai",
      doneRatio: undefined,
      expectedWorkHours: undefined,
      actualWorkHours: undefined,
      releaseDev: undefined,
      findReleaseDev: undefined,
      innerText: undefined,
      closedFlag: undefined,
      isArchived: undefined,
      deleted: undefined,
      isPrivate: undefined,
      isWatcher: undefined,
      isContainDetailWorkingHours: undefined,
      lockVersion: undefined,
      order: undefined,
      position: undefined,
      rootId: undefined,
      assignedImageId: undefined,
      authorImageId: undefined,
      projectAuthorDomainId: undefined,
      status: { id: 1, name: "New" },
      statusAttribute: undefined,
      tracker: { id: 7, name: "Story" },
      priority: undefined,
      severity: undefined,
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      assignedCcUsers: [],
      project: { identifier: "p-1", name: "Project A" },
      module: undefined,
      domain: undefined,
      storyPoint: undefined,
      fixedVersion: undefined,
      parentIssue: undefined,
      children: [],
      author: undefined,
      developer: undefined,
      closeder: undefined,
      customFields: [],
      customValueNew: undefined,
      tagList: [],
      attachments: [],
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
      ],
      journalsTotal: undefined,
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
      ],
      rawIssue: {
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        created_on: "1779267066000",
        updated_on: "1779328509000",
        start_date: "1779379200000",
        due_date: "1779984000000",
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
      }
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
