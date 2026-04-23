import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemCustomFieldsInput as reqListWorkItemCustomFieldsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemCustomFieldsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemCustomFieldsHandler,
  mapReqWorkItemCustomFields
} from "../../../../src/products/req/tools/list-work-item-custom-fields.js";

describe("mapReqWorkItemCustomFields", () => {
  it("returns normalized custom fields", () => {
    const result = mapReqWorkItemCustomFields([
      {
        tracker_list: ["2", "7"],
        region: "example",
        id: 492316,
        project_id: 34883337,
        tracker_id: -2,
        custom_field: "custom_field16",
        type: "text",
        name: "测试必填",
        sort: 1,
        memo: "",
        created: "2025-06-28 10:00:30",
        modified: "2025-06-28 10:00:30",
        is_delete: false
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "492316",
        projectId: 34883337,
        trackerId: -2,
        trackerList: ["2", "7"],
        region: "example",
        customField: "custom_field16",
        type: "text",
        name: "测试必填",
        sort: 1,
        memo: "",
        created: "2025-06-28 10:00:30",
        modified: "2025-06-28 10:00:30",
        deleted: false
      }
    ]);
  });
});

describe("reqListWorkItemCustomFieldsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 3
    };

    expect(reqListWorkItemCustomFieldsInput.parse(input)).toEqual(input);
    expect(reqListWorkItemCustomFieldsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemCustomFieldsHandler", () => {
  it("returns normalized custom fields", async () => {
    const client = {
      listWorkItemCustomFields: vi.fn(async () => ({
        custom_field: [
          {
            tracker_list: ["2", "7"],
            region: "example",
            id: 492316,
            project_id: 34883337,
            tracker_id: -2,
            custom_field: "custom_field16",
            type: "text",
            name: "测试必填",
            sort: 1,
            memo: "",
            created: "2025-06-28 10:00:30",
            modified: "2025-06-28 10:00:30",
            is_delete: false
          }
        ]
      }))
    };
    const handler = createReqListWorkItemCustomFieldsHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 3
    });

    expect(client.listWorkItemCustomFields).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 3
    });
    expect(result.content[0]?.text).toContain("1 work item custom fields found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "492316",
        projectId: 34883337,
        trackerId: -2,
        trackerList: ["2", "7"],
        region: "example",
        customField: "custom_field16",
        type: "text",
        name: "测试必填",
        sort: 1,
        memo: "",
        created: "2025-06-28 10:00:30",
        modified: "2025-06-28 10:00:30",
        deleted: false
      }
    ]);
  });
});
