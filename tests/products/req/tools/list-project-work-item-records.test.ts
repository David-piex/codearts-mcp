import { describe, expect, it, vi } from "vitest";
import { reqListProjectWorkItemRecordsInput as reqListProjectWorkItemRecordsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListProjectWorkItemRecordsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListProjectWorkItemRecordsHandler,
  mapReqProjectWorkItemRecords
} from "../../../../src/products/req/tools/list-project-work-item-records.js";

describe("mapReqProjectWorkItemRecords", () => {
  it("returns normalized project work item records with pagination", () => {
    const result = mapReqProjectWorkItemRecords(
      [
        {
          id: 789,
          issue_id: 123,
          field_key: "status",
          field_name: "状态",
          old_value: "{\"id\":\"1\",\"name\":\"创建\"}",
          new_value: "{\"id\":\"2\",\"name\":\"开发中\"}",
          operated_time: 1601175640000,
          operation: "修改",
          property: "attr",
          operator: {
            id: 4091,
            name: "demo_user_name",
            nick_name: "张三",
            user_id: "user-1",
            user_num_id: 101,
            first_name: "demo"
          }
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "789",
        workItemId: "123",
        fieldKey: "status",
        fieldName: "状态",
        oldValue: "{\"id\":\"1\",\"name\":\"创建\"}",
        newValue: "{\"id\":\"2\",\"name\":\"开发中\"}",
        operatedTime: 1601175640000,
        operation: "修改",
        property: "attr",
        operator: {
          id: 4091,
          name: "demo_user_name",
          nickName: "张三",
          userId: "user-1",
          userNumId: 101,
          firstName: "demo"
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

describe("reqListProjectWorkItemRecordsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20,
      operated_time_interval: "1601175600000,1601262000000"
    };

    expect(reqListProjectWorkItemRecordsInput.parse(input)).toEqual(input);
    expect(reqListProjectWorkItemRecordsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListProjectWorkItemRecordsHandler", () => {
  it("returns normalized project work item records output", async () => {
    const client = {
      listProjectWorkItemRecords: vi.fn(async () => ({
        records: [
          {
            id: 789,
            issue_id: 123,
            field_key: "status",
            field_name: "状态",
            old_value: "{\"id\":\"1\",\"name\":\"创建\"}",
            new_value: "{\"id\":\"2\",\"name\":\"开发中\"}",
            operated_time: 1601175640000,
            operation: "修改",
            property: "attr",
            operator: {
              id: 4091,
              name: "demo_user_name",
              nick_name: "张三"
            }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListProjectWorkItemRecordsHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listProjectWorkItemRecords).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 project work item records found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "789",
        workItemId: "123",
        fieldKey: "status",
        fieldName: "状态",
        oldValue: "{\"id\":\"1\",\"name\":\"创建\"}",
        newValue: "{\"id\":\"2\",\"name\":\"开发中\"}",
        operatedTime: 1601175640000,
        operation: "修改",
        property: "attr",
        operator: {
          id: 4091,
          name: "demo_user_name",
          nickName: "张三",
          userId: undefined,
          userNumId: undefined,
          firstName: undefined
        }
      }
    ]);
  });

  it("returns a project-scoped hint when no project work item records are found", async () => {
    const handler = createReqListProjectWorkItemRecordsHandler({
      listProjectWorkItemRecords: async () => ({
        records: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 project work item records found");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
