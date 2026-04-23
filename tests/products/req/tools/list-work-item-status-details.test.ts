import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemStatusDetailsInput as reqListWorkItemStatusDetailsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemStatusDetailsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemStatusDetailsHandler,
  mapReqWorkItemStatusDetails
} from "../../../../src/products/req/tools/list-work-item-status-details.js";

describe("mapReqWorkItemStatusDetails", () => {
  it("returns normalized work item status details", () => {
    const result = mapReqWorkItemStatusDetails({
      project_id: "project-1",
      tracker_id: 7,
      grouped_statuses: {
        initial: [
          {
            id: 1,
            status_id: "status-1",
            name: "新建",
            is_closed: 0,
            is_initial: 1
          }
        ]
      },
      issue_statuses: [
        {
          id: 1,
          status_id: "status-1",
          name: "新建",
          is_closed: 0,
          is_initial: 1,
          issue_field_configs: [
            {
              field: "subject",
              name: "标题",
              field_type: "text"
            }
          ],
          issue_status_attribute: {
            project_id: "project-1",
            name: "开始态",
            type: "START"
          }
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      groupKeys: ["initial"],
      groupedStatuses: {
        initial: [
          {
            id: 1,
            statusId: "status-1",
            name: "新建",
            closed: false,
            position: undefined,
            defaultDoneRatio: undefined,
            initial: true,
            issueFieldConfigs: [],
            flag: undefined,
            statusAttributeId: undefined,
            statusAttribute: undefined
          }
        ]
      },
      statuses: [
        {
          id: 1,
          statusId: "status-1",
          name: "新建",
          closed: false,
          position: undefined,
          defaultDoneRatio: undefined,
          initial: true,
          issueFieldConfigs: [
            {
              custom: undefined,
              defaultOption: [],
              defaultOptions: [],
              defaultValue: undefined,
              field: "subject",
              fieldType: "text",
              requiredFlag: undefined,
              visible: undefined,
              last: undefined,
              name: "标题",
              option: [],
              options: undefined,
              position: undefined,
              projectId: undefined,
              trackerList: undefined,
              typeOptions: undefined
            }
          ],
          flag: undefined,
          statusAttributeId: undefined,
          statusAttribute: {
            projectId: "project-1",
            name: "开始态",
            type: "START"
          }
        }
      ]
    });
  });
});

describe("reqListWorkItemStatusDetailsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqListWorkItemStatusDetailsInput.parse(input)).toEqual(input);
    expect(reqListWorkItemStatusDetailsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemStatusDetailsHandler", () => {
  it("returns normalized work item status details", async () => {
    const client = {
      listWorkItemStatusDetails: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        grouped_statuses: {
          initial: [
            {
              id: 1,
              status_id: "status-1",
              name: "新建",
              is_closed: 0
            }
          ]
        },
        issue_statuses: [
          {
            id: 1,
            status_id: "status-1",
            name: "新建",
            is_closed: 0
          }
        ]
      }))
    };
    const handler = createReqListWorkItemStatusDetailsHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.listWorkItemStatusDetails).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("Loaded work item status details for tracker 7");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      trackerId: 7,
      groupKeys: ["initial"]
    });
  });
});
