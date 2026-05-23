import { describe, expect, it, vi } from "vitest";
import { reqListProjectUserWorkHoursInput, reqListProjectWorkHoursInput as reqListProjectWorkHoursInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListProjectWorkHoursInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListProjectUserWorkHoursHandler,
  createReqListProjectWorkHoursHandler,
  mapReqProjectWorkHours
} from "../../../../src/products/req/tools/list-project-work-hours.js";

describe("mapReqProjectWorkHours", () => {
  it("returns normalized project work hours with pagination", () => {
    const result = mapReqProjectWorkHours(
      [
        {
          issue_id: 69813204,
          issue_type: "Story",
          subject: "Align acceptance criteria",
          project_name: "Payments",
          user_id: "user-1",
          user_name: "alice",
          nick_name: "Alice",
          work_date: "2020-02-19",
          work_hours_num: "1.0",
          summary: "Backend development"
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        issueId: "69813204",
        issueType: "Story",
        title: "Align acceptance criteria",
        projectName: "Payments",
        workDate: "2020-02-19",
        workHours: "1.0",
        summary: "Backend development",
        author: {
          userId: "user-1",
          userName: "alice",
          nickName: "Alice"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListProjectWorkHoursInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      page: 1,
      page_size: 20,
      project_ids: ["project-1"],
      begin_time: "2025-07-01",
      end_time: "2025-07-31"
    };

    expect(reqListProjectWorkHoursInput.parse(input)).toEqual(input);
    expect(reqListProjectWorkHoursInputFromBarrel.parse(input)).toEqual(input);
    expect(reqListProjectUserWorkHoursInput.parse({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      user_id: "user-1"
    })).toEqual({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      user_id: "user-1"
    });
  });
});

describe("createReqListProjectWorkHoursHandler", () => {
  it("returns normalized project work hour output", async () => {
    const client = {
      listProjectWorkHours: vi.fn(async () => ({
        work_hours: [
          {
            issue_id: 69813204,
            issue_type: "Story",
            subject: "Align acceptance criteria",
            project_name: "Payments",
            user_id: "user-1",
            user_name: "alice",
            nick_name: "Alice",
            work_date: "2020-02-19",
            work_hours_num: "1.0",
            summary: "Backend development"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListProjectWorkHoursHandler(client);

    const result = await handler({
      page: 1,
      page_size: 20,
      project_ids: ["project-1"],
      begin_time: "2025-07-01",
      end_time: "2025-07-31"
    });

    expect(client.listProjectWorkHours).toHaveBeenCalledWith({
      page: 1,
      page_size: 20,
      project_ids: ["project-1"],
      begin_time: "2025-07-01",
      end_time: "2025-07-31"
    });
    expect(result.content[0]?.text).toContain("1 project work hours found");
    expect(result.structuredContent.items).toEqual([
      {
        issueId: "69813204",
        issueType: "Story",
        title: "Align acceptance criteria",
        projectName: "Payments",
        workDate: "2020-02-19",
        workHours: "1.0",
        summary: "Backend development",
        author: {
          userId: "user-1",
          userName: "alice",
          nickName: "Alice"
        }
      }
    ]);
  });

  it("returns normalized single-project user work hour output", async () => {
    const client = {
      listProjectUserWorkHours: vi.fn(async () => ({
        work_hours: [
          {
            issue_id: 69813204,
            issue_type: "Story",
            subject: "Align acceptance criteria",
            project_name: "Payments",
            user_id: "user-1",
            user_name: "alice",
            nick_name: "Alice",
            work_date: "2020-02-19",
            work_hours_num: "1.0",
            summary: "Backend development"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListProjectUserWorkHoursHandler(client);

    const result = await handler({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      user_id: "user-1",
      begin_time: "2025-07-01",
      end_time: "2025-07-31"
    });

    expect(client.listProjectUserWorkHours).toHaveBeenCalledWith({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      user_id: "user-1",
      begin_time: "2025-07-01",
      end_time: "2025-07-31"
    });
    expect(result.content[0]?.text).toContain("1 project work hours found");
    expect(result.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({
        issueId: "69813204",
        title: "Align acceptance criteria",
        workHours: "1.0"
      })
    );
  });
});
