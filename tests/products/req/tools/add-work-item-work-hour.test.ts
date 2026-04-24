import { describe, expect, it } from "vitest";
import { reqAddWorkItemWorkHourInput as reqAddWorkItemWorkHourInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqAddWorkItemWorkHourInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqAddWorkItemWorkHourHandler,
  mapAddedWorkItemWorkHour,
  previewAddWorkItemWorkHour
} from "../../../../src/products/req/tools/add-work-item-work-hour.js";

describe("previewAddWorkItemWorkHour", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewAddWorkItemWorkHour({
      project_id: "p-1",
      work_item_id: "wi-9",
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25",
      region: "example",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      workHours: 1,
      startDate: "2025-07-25",
      dueDate: "2025-07-25",
      startDateTimestamp: undefined,
      dueDateTimestamp: undefined,
      region: "example",
      executed: false
    });
  });
});

describe("mapAddedWorkItemWorkHour", () => {
  it("returns normalized added work hour data", () => {
    const result = mapAddedWorkItemWorkHour({
      id: "wh-1",
      work_item_id: "wi-9",
      work_date: "2025/07/25",
      work_date_timestamp: "1753372800000",
      work_hours: "1.0",
      region: "example",
      user_id: "user-1",
      user_num_id: 1001,
      user_name: "alice",
      nick_name: "Alice"
    });

    expect(result.item).toEqual({
      id: "wh-1",
      workItemId: "wi-9",
      workDate: "2025/07/25",
      workDateTimestamp: "1753372800000",
      workHours: "1.0",
      region: "example",
      author: {
        userId: "user-1",
        userNumId: 1001,
        userName: "alice",
        nickName: "Alice"
      },
      executed: true
    });
  });
});

describe("reqAddWorkItemWorkHourInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25"
    };

    expect(reqAddWorkItemWorkHourInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqAddWorkItemWorkHourInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqAddWorkItemWorkHourHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqAddWorkItemWorkHourHandler({
      addWorkItemWorkHour: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      workHours: 1,
      startDate: "2025-07-25",
      dueDate: "2025-07-25",
      startDateTimestamp: undefined,
      dueDateTimestamp: undefined,
      region: undefined,
      executed: false
    });
  });

  it("maps added work item work hours into MCP output", async () => {
    const handler = createReqAddWorkItemWorkHourHandler({
      addWorkItemWorkHour: async () => ({
        id: "wh-1",
        work_item_id: "wi-9",
        work_date: "2025/07/25",
        work_date_timestamp: "1753372800000",
        work_hours: "1.0",
        region: "example",
        user_id: "user-1",
        user_num_id: 1001,
        user_name: "alice",
        nick_name: "Alice"
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "wh-1",
      workItemId: "wi-9",
      workDate: "2025/07/25",
      workDateTimestamp: "1753372800000",
      workHours: "1.0",
      region: "example",
      author: {
        userId: "user-1",
        userNumId: 1001,
        userName: "alice",
        nickName: "Alice"
      },
      executed: true
    });
  });
});
