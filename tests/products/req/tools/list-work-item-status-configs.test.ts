import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemStatusConfigsInput as reqListWorkItemStatusConfigsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemStatusConfigsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemStatusConfigsHandler,
  mapReqWorkItemStatusConfigs
} from "../../../../src/products/req/tools/list-work-item-status-configs.js";

describe("mapReqWorkItemStatusConfigs", () => {
  it("returns normalized work item status configs", () => {
    const result = mapReqWorkItemStatusConfigs({
      project_id: "project-1",
      tracker_id: 7,
      workitem_readonly_mode: true,
      issue_statuses: [
        {
          trackerList: [7],
          id: "status-1",
          statusId: 1,
          definedName: "新建",
          issueStatusAttribute: {
            id: 1,
            name: "开始态",
            type: "START"
          }
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      workItemReadonlyMode: true,
      statuses: [
        {
          trackerList: [7],
          id: "status-1",
          statusId: 1,
          definedName: "新建",
          description: undefined,
          position: undefined,
          flag: undefined,
          closed: undefined,
          initial: undefined,
          statusAttributeId: undefined,
          statusAttributeName: undefined,
          statusAttribute: {
            id: 1,
            name: "开始态",
            type: "START"
          },
          trackerId: undefined
        }
      ]
    });
  });
});

describe("reqListWorkItemStatusConfigsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqListWorkItemStatusConfigsInput.parse(input)).toEqual(input);
    expect(reqListWorkItemStatusConfigsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemStatusConfigsHandler", () => {
  it("returns normalized work item status configs", async () => {
    const client = {
      listWorkItemStatusConfigs: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        workitem_readonly_mode: true,
        issue_statuses: [
          {
            id: "status-1",
            statusId: 1,
            definedName: "新建"
          }
        ]
      }))
    };
    const handler = createReqListWorkItemStatusConfigsHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.listWorkItemStatusConfigs).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("Loaded work item status configs for tracker 7");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      trackerId: 7,
      workItemReadonlyMode: true
    });
  });
});
