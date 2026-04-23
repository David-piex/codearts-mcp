import { describe, expect, it, vi } from "vitest";
import { reqListOptionalWorkItemStatusConfigsInput as reqListOptionalWorkItemStatusConfigsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListOptionalWorkItemStatusConfigsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListOptionalWorkItemStatusConfigsHandler,
  mapReqOptionalWorkItemStatusConfigs
} from "../../../../src/products/req/tools/list-optional-work-item-status-configs.js";

describe("mapReqOptionalWorkItemStatusConfigs", () => {
  it("returns normalized optional work item status configs", () => {
    const result = mapReqOptionalWorkItemStatusConfigs({
      project_id: "project-1",
      tracker_id: 7,
      issue_statuses: [
        {
          trackerList: [7],
          id: "status-2",
          statusId: 2,
          definedName: "处理中"
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      statuses: [
        {
          trackerList: [7],
          id: "status-2",
          statusId: 2,
          definedName: "处理中",
          description: undefined,
          position: undefined,
          flag: undefined,
          closed: undefined,
          initial: undefined,
          statusAttributeId: undefined,
          statusAttributeName: undefined,
          statusAttribute: undefined,
          trackerId: undefined
        }
      ]
    });
  });
});

describe("reqListOptionalWorkItemStatusConfigsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqListOptionalWorkItemStatusConfigsInput.parse(input)).toEqual(input);
    expect(reqListOptionalWorkItemStatusConfigsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListOptionalWorkItemStatusConfigsHandler", () => {
  it("returns normalized optional work item status configs", async () => {
    const client = {
      listOptionalWorkItemStatusConfigs: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        issue_statuses: [
          {
            id: "status-2",
            statusId: 2,
            definedName: "处理中"
          }
        ]
      }))
    };
    const handler = createReqListOptionalWorkItemStatusConfigsHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.listOptionalWorkItemStatusConfigs).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("Loaded optional work item status configs for tracker 7");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      trackerId: 7
    });
  });
});
