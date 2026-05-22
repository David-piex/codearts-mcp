import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemRecordsInput as reqListWorkItemRecordsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemRecordsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemRecordsHandler,
  mapReqWorkItemRecords
} from "../../../../src/products/req/tools/list-work-item-records.js";

describe("mapReqWorkItemRecords", () => {
  it("returns normalized work item records with pagination", () => {
    const result = mapReqWorkItemRecords(
      [
        {
          id: 11,
          created_time: "2026-02-11T10:00:00Z",
          user: {
            user_id: "user-1",
            user_name: "alice",
            user_num_id: 101,
            nick_name: "Alice"
          },
          details: [
            {
              id: 91,
              name: "status",
              old_value: "New",
              new_value: "Doing",
              operation: "update",
              property: "status_id"
            }
          ]
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "11",
        createdTime: "2026-02-11T10:00:00Z",
        createdTimeText: "2026-02-11 18:00:00 Asia/Shanghai",
        actor: {
          id: "user-1",
          name: "alice",
          numberId: 101,
          nickName: "Alice"
        },
        changes: [
          {
            id: "91",
            name: "status",
            oldValue: "New",
            newValue: "Doing",
            operation: "update",
            property: "status_id"
          }
        ],
        rawRecord: {
          id: 11,
          created_time: "2026-02-11T10:00:00Z",
          user: {
            user_id: "user-1",
            user_name: "alice",
            user_num_id: 101,
            nick_name: "Alice"
          },
          details: [
            {
              id: 91,
              name: "status",
              old_value: "New",
              new_value: "Doing",
              operation: "update",
              property: "status_id"
            }
          ]
        }
      }
    ]);
    expect(result.raw).toEqual({
      records: [
        {
          id: 11,
          created_time: "2026-02-11T10:00:00Z",
          user: {
            user_id: "user-1",
            user_name: "alice",
            user_num_id: 101,
            nick_name: "Alice"
          },
          details: [
            {
              id: 91,
              name: "status",
              old_value: "New",
              new_value: "Doing",
              operation: "update",
              property: "status_id"
            }
          ]
        }
      ]
    });
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListWorkItemRecordsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    };

    expect(reqListWorkItemRecordsInput.parse(input)).toEqual({
      ...input,
      journalized_type: "Issue"
    });
    expect(reqListWorkItemRecordsInputFromBarrel.parse(input)).toEqual({
      ...input,
      journalized_type: "Issue"
    });
  });
});

describe("createReqListWorkItemRecordsHandler", () => {
  it("returns content and structured output for normalized records", async () => {
    const client = {
      listWorkItemRecords: vi.fn(async () => ({
        records: [
          {
            id: 11,
            created_time: "2026-02-11T10:00:00Z",
            user: {
              user_id: "user-1",
              user_name: "alice",
              user_num_id: 101,
              nick_name: "Alice"
            },
            details: [
              {
                id: 91,
                name: "status",
                old_value: "New",
                new_value: "Doing",
                operation: "update",
                property: "status_id"
              }
            ]
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListWorkItemRecordsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(client.listWorkItemRecords).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20,
      journalized_type: "Issue"
    });
    expect(result.content[0]?.text).toContain("1 work item records found");
    expect(result.structuredContent).toEqual({
      summary: "1 work item records found",
      items: [
        {
          id: "11",
          createdTime: "2026-02-11T10:00:00Z",
          createdTimeText: "2026-02-11 18:00:00 Asia/Shanghai",
          actor: {
            id: "user-1",
            name: "alice",
            numberId: 101,
            nickName: "Alice"
          },
          changes: [
            {
              id: "91",
              name: "status",
              oldValue: "New",
              newValue: "Doing",
              operation: "update",
              property: "status_id"
            }
          ],
          rawRecord: {
            id: 11,
            created_time: "2026-02-11T10:00:00Z",
            user: {
              user_id: "user-1",
              user_name: "alice",
              user_num_id: 101,
              nick_name: "Alice"
            },
            details: [
              {
                id: 91,
                name: "status",
                old_value: "New",
                new_value: "Doing",
                operation: "update",
                property: "status_id"
              }
            ]
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 1
      },
      raw: {
        records: [
          {
            id: 11,
            created_time: "2026-02-11T10:00:00Z",
            user: {
              user_id: "user-1",
              user_name: "alice",
              user_num_id: 101,
              nick_name: "Alice"
            },
            details: [
              {
                id: 91,
                name: "status",
                old_value: "New",
                new_value: "Doing",
                operation: "update",
                property: "status_id"
              }
            ]
          }
        ]
      }
    });
  });
});
