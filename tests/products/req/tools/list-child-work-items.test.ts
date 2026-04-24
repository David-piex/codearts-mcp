import { describe, expect, it, vi } from "vitest";
import { reqListChildWorkItemsInput as reqListChildWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListChildWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListChildWorkItemsHandler,
  mapReqChildWorkItems
} from "../../../../src/products/req/tools/list-child-work-items.js";

describe("mapReqChildWorkItems", () => {
  it("returns normalized child work items with pagination", () => {
    const result = mapReqChildWorkItems(
      [
        {
          id: 9184453,
          subject: "task-标签过滤01",
          parent_issue: {
            id: 9184452,
            subject: "story-标签过滤01"
          },
          project: {
            identifier: "project-1",
            name: "Demo"
          },
          tracker: {
            id: 2,
            name: "Task"
          },
          status: {
            id: 1,
            name: "新建"
          },
          status_attribute: {
            id: 35160238,
            name: "开始态"
          },
          severity: {
            id: 12,
            name: "一般"
          },
          priority: {
            id: 2,
            name: "中"
          },
          assigned_to: {
            name: "alice"
          },
          done_ratio: 0,
          is_parent: false
        }
      ],
      1,
      10,
      1
    );

    expect(result.items).toEqual([
      {
        id: "9184453",
        title: "task-标签过滤01",
        parentIssueId: "9184452",
        parentIssueTitle: "story-标签过滤01",
        projectId: "project-1",
        projectName: "Demo",
        type: "Task",
        typeId: 2,
        status: "新建",
        statusId: 1,
        statusAttribute: "开始态",
        severity: "一般",
        priority: "中",
        assignedTo: "alice",
        doneRatio: 0,
        isParent: false
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 10,
      total: 1
    });
  });
});

describe("reqListChildWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      parent_id: "9184452",
      page: 1,
      page_size: 10,
      query_type: "basic" as const
    };

    expect(reqListChildWorkItemsInput.parse(input)).toEqual(input);
    expect(reqListChildWorkItemsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListChildWorkItemsHandler", () => {
  it("returns normalized child work item output", async () => {
    const client = {
      listChildWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 9184453,
            subject: "task-标签过滤01",
            parent_issue: {
              id: 9184452,
              subject: "story-标签过滤01"
            },
            project: {
              identifier: "project-1",
              name: "Demo"
            },
            tracker: {
              id: 2,
              name: "Task"
            },
            status: {
              id: 1,
              name: "新建"
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListChildWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      parent_id: "9184452",
      page: 1,
      page_size: 10,
      query_type: "basic"
    });

    expect(client.listChildWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      parent_id: "9184452",
      page: 1,
      page_size: 10,
      query_type: "basic"
    });
    expect(result.content[0]?.text).toContain("1 child work items found in this page");
    expect(result.structuredContent.items).toEqual([
      {
        id: "9184453",
        title: "task-标签过滤01",
        parentIssueId: "9184452",
        parentIssueTitle: "story-标签过滤01",
        projectId: "project-1",
        projectName: "Demo",
        type: "Task",
        typeId: 2,
        status: "新建",
        statusId: 1,
        statusAttribute: undefined,
        severity: undefined,
        priority: undefined,
        assignedTo: undefined,
        doneRatio: undefined,
        isParent: undefined
      }
    ]);
  });

  it("returns a project-scoped hint when no child work items are found", async () => {
    const handler = createReqListChildWorkItemsHandler({
      listChildWorkItems: async () => ({
        work_items: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      parent_id: "9184452",
      page: 1,
      page_size: 10,
      query_type: "basic"
    });

    expect(result.content[0]?.text).toContain("0 child work items found");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
