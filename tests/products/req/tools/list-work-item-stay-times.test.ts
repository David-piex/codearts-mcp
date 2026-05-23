import { describe, expect, it, vi } from "vitest";
import {
  createReqListWorkItemStayTimesHandler,
  mapReqWorkItemStayTimes
} from "../../../../src/products/req/tools/list-work-item-stay-times.js";

describe("mapReqWorkItemStayTimes", () => {
  it("returns normalized stay time data with readable duration text", () => {
    const result = mapReqWorkItemStayTimes({
      data: [{ id: "6330741", stay_time: 90061 }],
      fails: ["1212123"],
      total: 1,
      total_stay_time: 90061
    });

    expect(result.items).toEqual([
      {
        id: "6330741",
        stayTimeSeconds: "90061",
        stayTimeText: "1d 1h 1m 1s",
        rawStayTime: { id: "6330741", stay_time: 90061 }
      }
    ]);
    expect(result.raw).toEqual({
      fails: ["1212123"],
      total: 1,
      total_stay_time: 90061,
      totalStayTimeText: "1d 1h 1m 1s"
    });
  });
});

describe("createReqListWorkItemStayTimesHandler", () => {
  it("calls the client and returns normalized output", async () => {
    const client = {
      listWorkItemStayTimes: vi.fn(async () => ({
        data: [{ id: "6330741", stay_time: 60 }],
        fails: [],
        total: 1,
        total_stay_time: 60
      }))
    };
    const handler = createReqListWorkItemStayTimesHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["6330741"]
    });

    expect(client.listWorkItemStayTimes).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_ids: ["6330741"]
    });
    expect(result.content[0]?.text).toContain("1 work item stay times found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "6330741",
        stayTimeSeconds: "60",
        stayTimeText: "1m 0s",
        rawStayTime: { id: "6330741", stay_time: 60 }
      }
    ]);
  });
});
