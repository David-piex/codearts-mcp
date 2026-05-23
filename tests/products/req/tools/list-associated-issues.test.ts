import { describe, expect, it, vi } from "vitest";
import { reqListAssociatedIssuesInput as reqListAssociatedIssuesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListAssociatedIssuesInput, reqListAssociatedIssuesV4Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListAssociatedIssuesHandler,
  createReqListAssociatedIssuesV4Handler,
  mapReqAssociatedIssues,
  mapReqAssociatedIssuesV4
} from "../../../../src/products/req/tools/list-associated-issues.js";

describe("mapReqAssociatedIssues", () => {
  it("returns normalized associated issues with pagination", () => {
    const result = mapReqAssociatedIssues(
      [
        {
          id: 9132318,
          subject: "Align acceptance criteria",
          status_id: 3,
          status_name: "Resolved",
          new_status_name: "Resolved",
          status_attribute_name: "Done",
          project_name: "Payments",
          identifier: "REQ-88",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice",
            name: "alice"
          }
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "9132318",
        title: "Align acceptance criteria",
        statusId: 3,
        status: "Resolved",
        newStatus: "Resolved",
        statusCategory: "Done",
        projectName: "Payments",
        identifier: "REQ-88",
        assignee: {
          userId: "user-1",
          userNumId: 101,
          nickName: "Alice",
          name: "alice"
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

describe("mapReqAssociatedIssuesV4", () => {
  it("returns normalized V4 associated issues and preserves the raw issue", () => {
    const result = mapReqAssociatedIssuesV4(
      [
        {
          issue_id: 9132318,
          subject: "Align acceptance criteria",
          status: { id: "3", name: "Resolved" },
          project: { project_id: "p-2", project_name: "Payments" },
          user: { id: 101, nick_name: "Alice", name: "alice" },
          relation_type: "relates_to"
        }
      ],
      2,
      10,
      12,
      { status: "success" }
    );

    expect(result.items).toEqual([
      {
        id: "9132318",
        title: "Align acceptance criteria",
        statusId: "3",
        status: "Resolved",
        projectId: "p-2",
        projectName: "Payments",
        assignee: {
          id: "101",
          name: "Alice"
        },
        rawIssue: {
          issue_id: 9132318,
          subject: "Align acceptance criteria",
          status: { id: "3", name: "Resolved" },
          project: { project_id: "p-2", project_name: "Payments" },
          user: { id: 101, nick_name: "Alice", name: "alice" },
          relation_type: "relates_to"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
    expect(result.raw).toEqual({ status: "success" });
  });
});

describe("reqListAssociatedIssuesInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    };

    expect(reqListAssociatedIssuesInput.parse(input)).toEqual(input);
    expect(reqListAssociatedIssuesInputFromBarrel.parse(input)).toEqual(input);
    expect(reqListAssociatedIssuesV4Input.parse(input)).toEqual(input);
  });
});

describe("createReqListAssociatedIssuesHandler", () => {
  it("returns content and structured output for normalized associated issues", async () => {
    const client = {
      listAssociatedIssues: vi.fn(async () => ({
        issues: [
          {
            id: 9132318,
            subject: "Align acceptance criteria",
            status_id: 3,
            status_name: "Resolved",
            new_status_name: "Resolved",
            status_attribute_name: "Done",
            project_name: "Payments",
            identifier: "REQ-88",
            assigned_to: {
              assigned_user_id: "user-1",
              assigned_user_num_id: 101,
              assigned_nick_name: "Alice",
              name: "alice"
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListAssociatedIssuesHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listAssociatedIssues).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 associated issues found");
    expect(result.structuredContent).toEqual({
      summary: "1 associated issues found",
      items: [
        {
          id: "9132318",
          title: "Align acceptance criteria",
          statusId: 3,
          status: "Resolved",
          newStatus: "Resolved",
          statusCategory: "Done",
          projectName: "Payments",
          identifier: "REQ-88",
          assignee: {
            userId: "user-1",
            userNumId: 101,
            nickName: "Alice",
            name: "alice"
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 1
      },
      raw: undefined
    });
  });

  it("returns content and structured output for official V4 associated issues", async () => {
    const client = {
      listAssociatedIssuesV4: vi.fn(async () => ({
        issues: [
          {
            issue_id: 9132318,
            subject: "Align acceptance criteria",
            status: { id: "3", name: "Resolved" },
            project: { project_id: "p-2", project_name: "Payments" },
            user: { id: 101, nick_name: "Alice", name: "alice" }
          }
        ],
        total: 1,
        raw: { status: "success" }
      }))
    };
    const handler = createReqListAssociatedIssuesV4Handler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listAssociatedIssuesV4).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 associated issues found from V4");
    expect(result.structuredContent).toEqual({
      summary: "1 associated issues found from V4",
      items: [
        {
          id: "9132318",
          title: "Align acceptance criteria",
          statusId: "3",
          status: "Resolved",
          projectId: "p-2",
          projectName: "Payments",
          assignee: {
            id: "101",
            name: "Alice"
          },
          rawIssue: {
            issue_id: 9132318,
            subject: "Align acceptance criteria",
            status: { id: "3", name: "Resolved" },
            project: { project_id: "p-2", project_name: "Payments" },
            user: { id: 101, nick_name: "Alice", name: "alice" }
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 1
      },
      raw: { status: "success" }
    });
  });

  it("adds a project-scoped hint when the associated issue list is empty", async () => {
    const handler = createReqListAssociatedIssuesHandler({
      listAssociatedIssues: async () => ({
        issues: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 associated issues found");
    expect(result.content[0]?.text).toContain("If you expected associated issues here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
