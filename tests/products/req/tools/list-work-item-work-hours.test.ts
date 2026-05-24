import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemWorkHoursInput as reqListWorkItemWorkHoursInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemWorkHoursInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemWorkHoursHandler,
  mapReqWorkItemWorkHours
} from "../../../../src/products/req/tools/list-work-item-work-hours.js";

describe("mapReqWorkItemWorkHours", () => {
  it("returns normalized work item work hours", () => {
    const result = mapReqWorkItemWorkHours([
      {
        id: "wh-1",
        work_date: "2025/07/25",
        work_date_timestamp: "1753372800000",
        work_hours: "1.0",
        region: "example",
        user_id: "user-1",
        user_num_id: 1001,
        user_name: "alice",
        nick_name: "Alice"
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "wh-1",
        workDate: "2025/07/25",
        workDateTimestamp: "1753372800000",
        workDateText: "2025-07-25 00:00:00 Asia/Shanghai",
        workHours: "1.0",
        region: "example",
        author: {
          userId: "user-1",
          userNumId: 1001,
          userName: "alice",
          nickName: "Alice"
        },
        rawWorkHour: expect.objectContaining({
          id: "wh-1",
          work_date_timestamp: "1753372800000"
        })
      }
    ]);
  });
});

describe("reqListWorkItemWorkHoursInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9"
    };

    expect(reqListWorkItemWorkHoursInput.parse(input)).toEqual(input);
    expect(reqListWorkItemWorkHoursInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemWorkHoursHandler", () => {
  it("returns normalized work item work hour output", async () => {
    const client = {
      listWorkItemWorkHours: vi.fn(async () => ({
        work_hours: [
          {
            id: "wh-1",
            work_date: "2025/07/25",
            work_date_timestamp: "1753372800000",
            work_hours: "1.0",
            region: "example",
            user_id: "user-1",
            user_num_id: 1001,
            user_name: "alice",
            nick_name: "Alice"
          }
        ]
      }))
    };
    const handler = createReqListWorkItemWorkHoursHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9"
    });

    expect(client.listWorkItemWorkHours).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9"
    });
    expect(result.content[0]?.text).toContain("1 work item work hours found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "wh-1",
        workDate: "2025/07/25",
        workDateTimestamp: "1753372800000",
        workDateText: "2025-07-25 00:00:00 Asia/Shanghai",
        workHours: "1.0",
        region: "example",
        author: {
          userId: "user-1",
          userNumId: 1001,
          userName: "alice",
          nickName: "Alice"
        },
        rawWorkHour: expect.objectContaining({
          id: "wh-1",
          work_date_timestamp: "1753372800000"
        })
      }
    ]);
  });
});
