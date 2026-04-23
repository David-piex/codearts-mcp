import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemStatusesInput as reqListWorkItemStatusesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemStatusesInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemStatusesHandler,
  mapReqWorkItemStatuses
} from "../../../../src/products/req/tools/list-work-item-statuses.js";

describe("mapReqWorkItemStatuses", () => {
  it("returns normalized work item statuses", () => {
    const result = mapReqWorkItemStatuses([
      {
        id: "status-1",
        status_id: 1,
        name: "新建",
        tracker_ids: [2, 7],
        status_attribute: {
          id: 1,
          name: "开始态"
        }
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "status-1",
        statusId: 1,
        name: "新建",
        trackerIds: [2, 7],
        statusCategoryId: 1,
        statusCategory: "开始态"
      }
    ]);
  });
});

describe("reqListWorkItemStatusesInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListWorkItemStatusesInput.parse(input)).toEqual(input);
    expect(reqListWorkItemStatusesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemStatusesHandler", () => {
  it("returns normalized work item statuses", async () => {
    const client = {
      listWorkItemStatuses: vi.fn(async () => ({
        issue_statuses: [
          {
            id: "status-1",
            status_id: 1,
            name: "新建",
            tracker_ids: [2, 7],
            status_attribute: {
              id: 1,
              name: "开始态"
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListWorkItemStatusesHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listWorkItemStatuses).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("1 work item statuses found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "status-1",
        statusId: 1,
        name: "新建",
        trackerIds: [2, 7],
        statusCategoryId: 1,
        statusCategory: "开始态"
      }
    ]);
  });
});
