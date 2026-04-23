import { describe, expect, it, vi } from "vitest";
import { reqListIterationWorkItemsInput as reqListIterationWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListIterationWorkItemsInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqListIterationWorkItemsHandler,
  mapReqIterationWorkItems
} from "../../../../src/products/req/tools/list-iteration-work-items.js";

describe("mapReqIterationWorkItems", () => {
  it("returns normalized iteration work items with pagination", () => {
    const result = mapReqIterationWorkItems(
      [
        {
          id: 102,
          subject: "Iteration item",
          tracker: {
            id: 7,
            name: "Story"
          },
          status: {
            id: 3,
            name: "Doing"
          }
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "102",
        title: "Iteration item",
        type: "Story",
        typeId: 7,
        status: "Doing",
        statusId: 3
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListIterationWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "iteration-1",
      page: 1,
      page_size: 20,
      keyword: "login",
      tracker_id: 7 as const,
      status_id: 3
    };

    expect(reqListIterationWorkItemsInput.parse(input)).toEqual(input);
    expect(reqListIterationWorkItemsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListIterationWorkItemsHandler", () => {
  it("returns normalized iteration work item output", async () => {
    const client = {
      listIterationWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 102,
            subject: "Iteration item",
            tracker: {
              id: 7,
              name: "Story"
            },
            status: {
              id: 3,
              name: "Doing"
            }
          }
        ],
        total: 12
      }))
    };
    const handler = createReqListIterationWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      page: 2,
      page_size: 10,
      keyword: "login",
      tracker_id: 7,
      status_id: 3
    });

    expect(client.listIterationWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "iteration-1",
      page: 2,
      page_size: 10,
      keyword: "login",
      tracker_id: 7,
      status_id: 3
    });
    expect(result.content[0]?.text).toContain("1 iteration work items found in this page");
    expect(result.structuredContent.items).toEqual([
      {
        id: "102",
        title: "Iteration item",
        type: "Story",
        typeId: 7,
        status: "Doing",
        statusId: 3
      }
    ]);
  });

  it("returns a project-scoped hint when no iteration work items are found", async () => {
    const handler = createReqListIterationWorkItemsHandler({
      listIterationWorkItems: async () => ({
        work_items: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      iteration_id: "iteration-empty",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 iteration work items found");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
