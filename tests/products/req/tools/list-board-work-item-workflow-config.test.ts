import { describe, expect, it, vi } from "vitest";
import { reqListBoardWorkItemWorkflowConfigInput as reqListBoardWorkItemWorkflowConfigInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListBoardWorkItemWorkflowConfigInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListBoardWorkItemWorkflowConfigHandler,
  mapReqBoardWorkItemWorkflowConfig
} from "../../../../src/products/req/tools/list-board-work-item-workflow-config.js";

describe("mapReqBoardWorkItemWorkflowConfig", () => {
  it("returns normalized board work item workflow config", () => {
    const result = mapReqBoardWorkItemWorkflowConfig([
      {
        parent_name: "进行中",
        parent_type: "IN_PROGRESS",
        status_id: "status-1",
        name: "研发",
        status_type: "IN_PROGRESS",
        direct_to: [
          {
            parent_name: "已完成",
            parent_type: "COMPLETE",
            status_id: "status-2",
            name: "测试",
            status_type: "COMPLETE",
            enabled: true,
            parent_id: "parent-2"
          }
        ],
        assign_to: "user-1",
        comment: "A transfer to B",
        required_assign: false,
        required_notes: true,
        field_type: false,
        parent_id: "parent-1"
      }
    ]);

    expect(result.items).toEqual([
      {
        parentName: "进行中",
        parentType: "IN_PROGRESS",
        statusId: "status-1",
        name: "研发",
        statusType: "IN_PROGRESS",
        transitions: [
          {
            parentName: "已完成",
            parentType: "COMPLETE",
            statusId: "status-2",
            name: "测试",
            statusType: "COMPLETE",
            enabled: true,
            parentId: "parent-2"
          }
        ],
        assignTo: "user-1",
        comment: "A transfer to B",
        requiredAssign: false,
        requiredNotes: true,
        fieldType: false,
        parentId: "parent-1"
      }
    ]);
  });
});

describe("reqListBoardWorkItemWorkflowConfigInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      board_id: "board-1"
    };

    expect(reqListBoardWorkItemWorkflowConfigInput.parse(input)).toEqual(input);
    expect(reqListBoardWorkItemWorkflowConfigInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListBoardWorkItemWorkflowConfigHandler", () => {
  it("returns normalized board work item workflow config", async () => {
    const client = {
      listBoardWorkItemWorkflowConfig: vi.fn(async () => ({
        workflows: [
          {
            parent_name: "进行中",
            parent_type: "IN_PROGRESS",
            status_id: "status-1",
            name: "研发",
            status_type: "IN_PROGRESS",
            direct_to: [
              {
                parent_name: "已完成",
                parent_type: "COMPLETE",
                status_id: "status-2",
                name: "测试",
                status_type: "COMPLETE",
                enabled: true,
                parent_id: "parent-2"
              }
            ],
            assign_to: "user-1",
            comment: "A transfer to B",
            required_assign: false,
            required_notes: true,
            field_type: false,
            parent_id: "parent-1"
          }
        ]
      }))
    };
    const handler = createReqListBoardWorkItemWorkflowConfigHandler(client);

    const result = await handler({
      project_id: "project-1",
      board_id: "board-1"
    });

    expect(client.listBoardWorkItemWorkflowConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      board_id: "board-1"
    });
    expect(result.content[0]?.text).toContain("1 board workflow statuses found");
    expect(result.structuredContent.items).toEqual([
      {
        parentName: "进行中",
        parentType: "IN_PROGRESS",
        statusId: "status-1",
        name: "研发",
        statusType: "IN_PROGRESS",
        transitions: [
          {
            parentName: "已完成",
            parentType: "COMPLETE",
            statusId: "status-2",
            name: "测试",
            statusType: "COMPLETE",
            enabled: true,
            parentId: "parent-2"
          }
        ],
        assignTo: "user-1",
        comment: "A transfer to B",
        requiredAssign: false,
        requiredNotes: true,
        fieldType: false,
        parentId: "parent-1"
      }
    ]);
  });
});
