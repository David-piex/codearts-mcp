import { describe, expect, it, vi } from "vitest";
import { reqUpdateWorkingHoursInput as reqUpdateWorkingHoursInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateWorkingHoursInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqUpdateWorkingHoursHandler,
  mapUpdatedWorkingHours,
  previewUpdateWorkingHours
} from "../../../../src/products/req/tools/update-working-hours.js";

describe("previewUpdateWorkingHours", () => {
  it("returns a dry-run summary", () => {
    const result = previewUpdateWorkingHours({
      project_id: "p-1",
      issue_id: "9049242",
      work_hours_id: "wh-1",
      summary: "Implementation",
      work_hours: 0.5,
      work_hour_type: 27
    });

    expect(result.item).toEqual({
      projectId: "p-1",
      issueId: "9049242",
      workHoursId: "wh-1",
      summary: "Implementation",
      workHours: 0.5,
      workHourType: 27,
      executed: false
    });
  });
});

describe("mapUpdatedWorkingHours", () => {
  it("normalizes camelCase and snake_case response fields", () => {
    const result = mapUpdatedWorkingHours({
      project_id: "p-1",
      issue_id: "9049242",
      work_hours_id: "wh-1",
      total: 1,
      work_hours: [
        {
          id: "wh-1",
          issueId: 9049242,
          userId: "u-1",
          userName: "alice",
          nickName: "Alice",
          summary: "Implementation",
          workDateTimestamp: "1747065600000",
          workHours: 0.5,
          status: 1,
          workHourTypeId: 27,
          workHourTypeName: "Dev"
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "p-1",
      issueId: "9049242",
      workHoursId: "wh-1",
      total: 1,
      workHours: [
        {
          id: "wh-1",
          issueId: "9049242",
          summary: "Implementation",
          workDate: undefined,
          workDateTimestamp: "1747065600000",
          workHours: "0.5",
          status: 1,
          region: undefined,
          workHourTypeId: 27,
          workHourTypeName: "Dev",
          author: {
            userId: "u-1",
            userNumId: undefined,
            userName: "alice",
            nickName: "Alice"
          }
        }
      ],
      executed: true
    });
  });
});

describe("reqUpdateWorkingHoursInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      issue_id: 9049242,
      work_hours_id: "wh-1",
      work_hours: 0.5
    };

    expect(reqUpdateWorkingHoursInput.parse(input)).toEqual({
      ...input,
      issue_id: "9049242",
      dry_run: true
    });
    expect(reqUpdateWorkingHoursInputFromBarrel.parse(input)).toEqual({
      ...input,
      issue_id: "9049242",
      dry_run: true
    });
  });
});

describe("createReqUpdateWorkingHoursHandler", () => {
  it("does not call the client in dry-run mode", async () => {
    const updateWorkingHours = vi.fn();
    const handler = createReqUpdateWorkingHoursHandler({ updateWorkingHours });

    const result = await handler({
      project_id: "p-1",
      issue_id: "9049242",
      work_hours_id: "wh-1",
      summary: "Implementation"
    });

    expect(updateWorkingHours).not.toHaveBeenCalled();
    expect(result.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueId: "9049242", workHoursId: "wh-1" })
    );
  });

  it("maps updated working hours into MCP output", async () => {
    const handler = createReqUpdateWorkingHoursHandler({
      updateWorkingHours: async () => ({
        total: 1,
        work_hours: [{ id: "wh-1", issue_id: "9049242", work_hours: "0.5", summary: "Implementation" }]
      })
    });

    const result = await handler({
      project_id: "p-1",
      issue_id: "9049242",
      work_hours_id: "wh-1",
      work_hours: 0.5,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual(
      expect.objectContaining({
        executed: true,
        issueId: "9049242",
        workHoursId: "wh-1",
        total: 1
      })
    );
  });
});
