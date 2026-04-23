import { describe, expect, it, vi } from "vitest";
import { reqGetWorkItemTemplateConfigInput as reqGetWorkItemTemplateConfigInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetWorkItemTemplateConfigInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetWorkItemTemplateConfigHandler,
  mapReqWorkItemTemplateConfig
} from "../../../../src/products/req/tools/get-work-item-template-config.js";

describe("mapReqWorkItemTemplateConfig", () => {
  it("returns normalized work item template config", () => {
    const result = mapReqWorkItemTemplateConfig({
      project_id: "project-1",
      tracker_id: 7,
      templates: [
        {
          id: "tpl-1",
          name: "默认模板",
          issue_field_configs: [
            {
              field: "subject",
              name: "标题",
              field_type: "text",
              default_value: "",
              is_visible: true,
              is_required: true,
              position: 1,
              tracker_list: [7]
            }
          ]
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      templates: [
        {
          id: "tpl-1",
          name: "默认模板",
          issueFieldConfigs: [
            {
              field: "subject",
              name: "标题",
              fieldType: "text",
              defaultValue: "",
              visible: true,
              required: true,
              position: 1,
              trackerList: [7]
            }
          ]
        }
      ]
    });
  });
});

describe("reqGetWorkItemTemplateConfigInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqGetWorkItemTemplateConfigInput.parse(input)).toEqual(input);
    expect(reqGetWorkItemTemplateConfigInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetWorkItemTemplateConfigHandler", () => {
  it("returns normalized work item template config", async () => {
    const client = {
      getWorkItemTemplateConfig: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        templates: [
          {
            id: "tpl-1",
            name: "默认模板",
            issue_field_configs: [
              {
                field: "subject",
                name: "标题",
                field_type: "text",
                default_value: "",
                is_visible: true,
                is_required: true,
                position: 1,
                tracker_list: [7]
              }
            ]
          }
        ]
      }))
    };
    const handler = createReqGetWorkItemTemplateConfigHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.getWorkItemTemplateConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("Loaded work item template config for tracker 7");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      templates: [
        {
          id: "tpl-1",
          name: "默认模板",
          issueFieldConfigs: [
            {
              field: "subject",
              name: "标题",
              fieldType: "text",
              defaultValue: "",
              visible: true,
              required: true,
              position: 1,
              trackerList: [7]
            }
          ]
        }
      ]
    });
  });
});
