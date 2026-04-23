import { describe, expect, it, vi } from "vitest";
import { reqListCacheDataInput as reqListCacheDataInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListCacheDataInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListCacheDataHandler,
  mapReqCacheData
} from "../../../../src/products/req/tools/list-cache-data.js";

describe("mapReqCacheData", () => {
  it("returns normalized cache data", () => {
    const result = mapReqCacheData({
      project_id: "project-1",
      type: "backlog",
      fields: [
        {
          trackerList: [2, 7],
          name: "标题",
          field: "subject",
          isCustom: false,
          type: "text",
          required: true,
          fieldGroup: "basic",
          sortable: true,
          priorityOption: [
            {
              id: "1",
              name: "低"
            }
          ]
        }
      ],
      visible_fields: [
        {
          trackerList: [7],
          name: "状态",
          field: "status",
          isCustom: false,
          type: "select",
          required: false,
          fieldGroup: "basic",
          sortable: true
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      fieldCount: 1,
      visibleFieldCount: 1,
      fields: [
        {
          trackerList: [2, 7],
          name: "标题",
          field: "subject",
          isCustom: false,
          option: [],
          optionSource: undefined,
          type: "text",
          required: true,
          fieldGroup: "basic",
          sortable: true,
          priorityOption: [
            {
              id: "1",
              name: "低"
            }
          ],
          severityOption: [],
          trackerOption: [],
          doneRatioOption: []
        }
      ],
      visibleFields: [
        {
          trackerList: [7],
          name: "状态",
          field: "status",
          isCustom: false,
          option: [],
          optionSource: undefined,
          type: "select",
          required: false,
          fieldGroup: "basic",
          sortable: true,
          priorityOption: [],
          severityOption: [],
          trackerOption: [],
          doneRatioOption: []
        }
      ]
    });
  });
});

describe("reqListCacheDataInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqListCacheDataInput.parse({})).toEqual({
      type: "backlog"
    });
    expect(reqListCacheDataInputFromBarrel.parse({ project_id: "project-1" })).toEqual({
      project_id: "project-1",
      type: "backlog"
    });
  });
});

describe("createReqListCacheDataHandler", () => {
  it("returns normalized cache data", async () => {
    const client = {
      listCacheData: vi.fn(async () => ({
        project_id: "project-1",
        type: "backlog",
        fields: [
          {
            trackerList: [2, 7],
            name: "标题",
            field: "subject",
            isCustom: false,
            type: "text",
            required: true,
            fieldGroup: "basic",
            sortable: true
          }
        ],
        visible_fields: []
      }))
    };
    const handler = createReqListCacheDataHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listCacheData).toHaveBeenCalledWith({
      project_id: "project-1",
      type: "backlog"
    });
    expect(result.content[0]?.text).toContain("Loaded cache data for type backlog");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      fieldCount: 1,
      visibleFieldCount: 0,
      fields: [
        {
          trackerList: [2, 7],
          name: "标题",
          field: "subject",
          isCustom: false,
          option: [],
          optionSource: undefined,
          type: "text",
          required: true,
          fieldGroup: "basic",
          sortable: true,
          priorityOption: [],
          severityOption: [],
          trackerOption: [],
          doneRatioOption: []
        }
      ],
      visibleFields: []
    });
  });
});
