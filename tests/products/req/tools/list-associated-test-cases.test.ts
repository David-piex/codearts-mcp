import { describe, expect, it, vi } from "vitest";
import { reqListAssociatedTestCasesInput as reqListAssociatedTestCasesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListAssociatedTestCasesInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListAssociatedTestCasesHandler,
  mapReqAssociatedTestCases
} from "../../../../src/products/req/tools/list-associated-test-cases.js";

describe("mapReqAssociatedTestCases", () => {
  it("returns normalized associated test cases with pagination", () => {
    const result = mapReqAssociatedTestCases(
      [
        {
          case_id: "case-1",
          case_level: "P1",
          case_name: "Login succeeds",
          case_num: "TC-101",
          created_time: 1_745_392_000_000,
          creator: {
            nick_name: "Alice",
            user_id: "user-1",
            user_name: "alice",
            user_num_id: 101
          },
          owner: {
            nick_name: "Bob",
            user_id: "user-2",
            user_name: "bob",
            user_num_id: 102
          },
          project: {
            project_id: "project-1",
            project_name: "Payments"
          },
          status: {
            id: "5",
            name: "Ready"
          },
          type: "TestCase"
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "case-1",
        number: "TC-101",
        name: "Login succeeds",
        level: "P1",
        createdTime: 1_745_392_000_000,
        projectId: "project-1",
        projectName: "Payments",
        statusId: "5",
        status: "Ready",
        type: "TestCase",
        creator: {
          nickName: "Alice",
          userId: "user-1",
          userName: "alice",
          userNumId: 101
        },
        owner: {
          nickName: "Bob",
          userId: "user-2",
          userName: "bob",
          userNumId: 102
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

describe("reqListAssociatedTestCasesInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    };

    expect(reqListAssociatedTestCasesInput.parse(input)).toEqual(input);
    expect(reqListAssociatedTestCasesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListAssociatedTestCasesHandler", () => {
  it("returns content and structured output for normalized associated test cases", async () => {
    const client = {
      listAssociatedTestCases: vi.fn(async () => ({
        test_cases: [
          {
            case_id: "case-1",
            case_level: "P1",
            case_name: "Login succeeds",
            case_num: "TC-101",
            created_time: 1_745_392_000_000,
            creator: {
              nick_name: "Alice",
              user_id: "user-1",
              user_name: "alice",
              user_num_id: 101
            },
            owner: {
              nick_name: "Bob",
              user_id: "user-2",
              user_name: "bob",
              user_num_id: 102
            },
            project: {
              project_id: "project-1",
              project_name: "Payments"
            },
            status: {
              id: "5",
              name: "Ready"
            },
            type: "TestCase"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListAssociatedTestCasesHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listAssociatedTestCases).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 associated test cases found");
    expect(result.structuredContent).toEqual({
      summary: "1 associated test cases found",
      items: [
        {
          id: "case-1",
          number: "TC-101",
          name: "Login succeeds",
          level: "P1",
          createdTime: 1_745_392_000_000,
          projectId: "project-1",
          projectName: "Payments",
          statusId: "5",
          status: "Ready",
          type: "TestCase",
          creator: {
            nickName: "Alice",
            userId: "user-1",
            userName: "alice",
            userNumId: 101
          },
          owner: {
            nickName: "Bob",
            userId: "user-2",
            userName: "bob",
            userNumId: 102
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
});
