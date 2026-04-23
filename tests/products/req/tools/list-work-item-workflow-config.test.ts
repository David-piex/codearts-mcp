import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemWorkflowConfigInput as reqListWorkItemWorkflowConfigInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemWorkflowConfigInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemWorkflowConfigHandler,
  mapReqWorkItemWorkflowConfig
} from "../../../../src/products/req/tools/list-work-item-workflow-config.js";

describe("mapReqWorkItemWorkflowConfig", () => {
  it("returns normalized workflow config items", () => {
    const result = mapReqWorkItemWorkflowConfig([
      {
        id: "flow-1",
        name: "新建",
        status_id: 1,
        direct_to: [
          {
            id: "flow-2",
            name: "进行中",
            status_id: 2,
            enabled: true
          }
        ]
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "flow-1",
        name: "新建",
        statusId: 1,
        transitions: [
          {
            id: "flow-2",
            name: "进行中",
            statusId: 2,
            enabled: true
          }
        ]
      }
    ]);
  });
});

describe("reqListWorkItemWorkflowConfigInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqListWorkItemWorkflowConfigInput.parse(input)).toEqual(input);
    expect(reqListWorkItemWorkflowConfigInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemWorkflowConfigHandler", () => {
  it("returns normalized workflow config", async () => {
    const client = {
      listWorkItemWorkflowConfig: vi.fn(async () => ({
        workflows: [
          {
            id: "flow-1",
            name: "新建",
            status_id: 1,
            direct_to: [
              {
                id: "flow-2",
                name: "进行中",
                status_id: 2,
                enabled: true
              }
            ]
          }
        ]
      }))
    };
    const handler = createReqListWorkItemWorkflowConfigHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.listWorkItemWorkflowConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("1 workflow statuses found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "flow-1",
        name: "新建",
        statusId: 1,
        transitions: [
          {
            id: "flow-2",
            name: "进行中",
            statusId: 2,
            enabled: true
          }
        ]
      }
    ]);
  });
});
