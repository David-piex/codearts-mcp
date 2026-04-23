import { describe, expect, it, vi } from "vitest";
import { reqListPlanAddableWorkItemsInput as reqListPlanAddableWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListPlanAddableWorkItemsInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqListPlanAddableWorkItemsHandler,
  mapReqPlanAddableWorkItems
} from "../../../../src/products/req/tools/list-plan-addable-work-items.js";

describe("mapReqPlanAddableWorkItems", () => {
  it("returns normalized addable work items with pagination", () => {
    const result = mapReqPlanAddableWorkItems(
      [
        {
          id: 101,
          subject: "Plan candidate",
          tracker: {
            id: 7,
            name: "Story"
          },
          status: {
            id: 1,
            name: "New"
          }
        }
      ],
      1,
      20,
      2
    );

    expect(result.items).toEqual([
      {
        id: "101",
        title: "Plan candidate",
        type: "Story",
        typeId: 7,
        status: "New",
        statusId: 1
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 2
    });
  });
});

describe("reqListPlanAddableWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20
    };

    expect(reqListPlanAddableWorkItemsInput.parse(input)).toEqual(input);
    expect(reqListPlanAddableWorkItemsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListPlanAddableWorkItemsHandler", () => {
  it("returns normalized addable work item output", async () => {
    const client = {
      listPlanAddableWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 101,
            subject: "Plan candidate",
            tracker: {
              id: 7,
              name: "Story"
            },
            status: {
              id: 1,
              name: "New"
            }
          }
        ],
        total: 2
      }))
    };
    const handler = createReqListPlanAddableWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20
    });

    expect(client.listPlanAddableWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 addable plan work items found in this page");
    expect(result.structuredContent.items).toEqual([
      {
        id: "101",
        title: "Plan candidate",
        type: "Story",
        typeId: 7,
        status: "New",
        statusId: 1
      }
    ]);
  });
});
