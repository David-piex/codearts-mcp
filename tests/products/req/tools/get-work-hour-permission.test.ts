import { describe, expect, it, vi } from "vitest";
import {
  createReqGetWorkHourPermissionHandler,
  mapReqWorkHourPermission
} from "../../../../src/products/req/tools/get-work-hour-permission.js";

describe("mapReqWorkHourPermission", () => {
  it("returns normalized permission details", () => {
    const result = mapReqWorkHourPermission({
      project_id: "project-1",
      work_item_id: "70844211",
      is_history_processor: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "70844211",
      isHistoryProcessor: true
    });
  });
});

describe("createReqGetWorkHourPermissionHandler", () => {
  it("calls the client and returns visible permission fields", async () => {
    const client = {
      getWorkHourPermission: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "70844211",
        is_history_processor: true
      }))
    };
    const handler = createReqGetWorkHourPermissionHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "70844211"
    });

    expect(client.getWorkHourPermission).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "70844211"
    });
    expect(result.content[0]?.text).toContain("isHistoryProcessor: true");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      workItemId: "70844211",
      isHistoryProcessor: true
    });
  });
});
