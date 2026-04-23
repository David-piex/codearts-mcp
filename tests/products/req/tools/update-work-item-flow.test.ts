import { describe, expect, it, vi } from "vitest";
import { reqUpdateWorkItemFlowInput as reqUpdateWorkItemFlowInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateWorkItemFlowInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqUpdateWorkItemFlowHandler,
  mapUpdatedWorkItemFlow,
  previewUpdateWorkItemFlow
} from "../../../../src/products/req/tools/update-work-item-flow.js";

describe("previewUpdateWorkItemFlow", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateWorkItemFlow({
      project_id: "project-1",
      work_item_id: "wi-9",
      status_id: 3,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "wi-9",
      statusId: 3,
      executed: false
    });
  });
});

describe("mapUpdatedWorkItemFlow", () => {
  it("returns normalized work item flow data", () => {
    const result = mapUpdatedWorkItemFlow({
      work_item_id: "wi-9",
      title: "Align acceptance criteria",
      status_id: 3,
      status_name: "Resolved",
      type_id: 7,
      type_name: "Story",
      updated_on: "2026-04-23T10:00:00Z"
    });

    expect(result.item).toEqual({
      workItemId: "wi-9",
      title: "Align acceptance criteria",
      statusId: 3,
      status: "Resolved",
      typeId: 7,
      type: "Story",
      updatedOn: "2026-04-23T10:00:00Z",
      executed: true
    });
  });
});

describe("reqUpdateWorkItemFlowInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9",
      status_id: 3
    };

    expect(reqUpdateWorkItemFlowInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateWorkItemFlowInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateWorkItemFlowHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateWorkItemFlow: vi.fn()
    };
    const handler = createReqUpdateWorkItemFlowHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      status_id: 3,
      dry_run: true
    });

    expect(client.updateWorkItemFlow).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update work item flow wi-9" }],
      structuredContent: {
        summary: "Dry run: update work item flow wi-9",
        item: {
          projectId: "project-1",
          workItemId: "wi-9",
          statusId: 3,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed work item flow transitions", async () => {
    const client = {
      updateWorkItemFlow: vi.fn(async () => ({
        work_item_id: "wi-9",
        title: "Align acceptance criteria",
        status_id: 3,
        status_name: "Resolved",
        type_id: 7,
        type_name: "Story",
        updated_on: "2026-04-23T10:00:00Z"
      }))
    };
    const handler = createReqUpdateWorkItemFlowHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      status_id: 3,
      dry_run: false
    });

    expect(client.updateWorkItemFlow).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      status_id: 3,
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated work item flow wi-9" }],
      structuredContent: {
        summary: "Updated work item flow wi-9",
        item: {
          workItemId: "wi-9",
          title: "Align acceptance criteria",
          statusId: 3,
          status: "Resolved",
          typeId: 7,
          type: "Story",
          updatedOn: "2026-04-23T10:00:00Z",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
