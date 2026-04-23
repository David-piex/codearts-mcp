import { describe, expect, it, vi } from "vitest";
import { reqListPlanWorkItemsInput as reqListPlanWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListPlanWorkItemsInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqListPlanWorkItemsHandler,
  mapReqPlanWorkItems
} from "../../../../src/products/req/tools/list-plan-work-items.js";

describe("mapReqPlanWorkItems", () => {
  it("returns normalized plan work items with pagination and summary counts", () => {
    const result = mapReqPlanWorkItems(
      [
        {
          id: 102,
          subject: "Planned work item",
          tracker: {
            id: 6,
            name: "Epic"
          },
          status: {
            id: 2,
            name: "Doing"
          }
        }
      ],
      2,
      10,
      3,
      {
        milestone_cur_count: 1,
        issue_cur_count: 1,
        issues_count: 3
      }
    );

    expect(result.items).toEqual([
      {
        id: "102",
        title: "Planned work item",
        type: "Epic",
        typeId: 6,
        status: "Doing",
        statusId: 2
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 3
    });
    expect(result.raw).toEqual({
      milestoneCurCount: 1,
      issueCurCount: 1,
      issuesCount: 3
    });
  });
});

describe("reqListPlanWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20,
      show_type: "list" as const
    };

    expect(reqListPlanWorkItemsInput.parse(input)).toEqual(input);
    expect(reqListPlanWorkItemsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListPlanWorkItemsHandler", () => {
  it("returns normalized plan work item output", async () => {
    const client = {
      listPlanWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 102,
            subject: "Planned work item",
            tracker: {
              id: 6,
              name: "Epic"
            },
            status: {
              id: 2,
              name: "Doing"
            }
          }
        ],
        total: 3,
        milestone_cur_count: 1,
        issue_cur_count: 1,
        issues_count: 3
      }))
    };
    const handler = createReqListPlanWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20,
      show_type: "tree"
    });

    expect(client.listPlanWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20,
      show_type: "tree"
    });
    expect(result.content[0]?.text).toContain("1 plan work items found in this page");
    expect(result.structuredContent.items).toEqual([
      {
        id: "102",
        title: "Planned work item",
        type: "Epic",
        typeId: 6,
        status: "Doing",
        statusId: 2
      }
    ]);
    expect(result.structuredContent.raw).toEqual({
      milestoneCurCount: 1,
      issueCurCount: 1,
      issuesCount: 3
    });
  });
});
