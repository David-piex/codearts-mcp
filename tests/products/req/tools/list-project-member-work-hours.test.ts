import { describe, expect, it, vi } from "vitest";
import {
  createReqListProjectMemberWorkHoursHandler,
  mapReqProjectMemberWorkHours
} from "../../../../src/products/req/tools/list-project-member-work-hours.js";

describe("mapReqProjectMemberWorkHours", () => {
  it("returns normalized member work hour records with pagination", () => {
    const result = mapReqProjectMemberWorkHours(
      [
        {
          issue_id: 70844211,
          issue_type: "Story",
          subject: "Operation",
          project_id: "project-1",
          project_name: "mall",
          user_id: "user-1",
          user_name: "szh",
          nick_name: "szh",
          work_date: "2026-05-23",
          work_hours_num: "2.0",
          summary: "development"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        issueId: "70844211",
        issueType: "Story",
        title: "Operation",
        projectId: "project-1",
        projectName: "mall",
        workDate: "2026-05-23",
        workHours: "2.0",
        summary: "development",
        author: {
          userId: "user-1",
          userName: "szh",
          nickName: "szh"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});

describe("createReqListProjectMemberWorkHoursHandler", () => {
  it("calls the client and returns visible text", async () => {
    const client = {
      listProjectMemberWorkHours: vi.fn(async () => ({
        work_hours: [
          {
            issue_id: 70844211,
            subject: "Operation",
            project_name: "mall",
            work_date: "2026-05-23",
            work_hours_num: "2.0"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListProjectMemberWorkHoursHandler(client);

    const result = await handler({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      staff_id: "user-1"
    });

    expect(client.listProjectMemberWorkHours).toHaveBeenCalledWith({
      page: 1,
      page_size: 20,
      project_id: "project-1",
      staff_id: "user-1"
    });
    expect(result.content[0]?.text).toContain("1 member work hours found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      issueId: "70844211",
      title: "Operation"
    });
  });
});
