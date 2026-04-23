import { describe, expect, it, vi } from "vitest";
import { reqBatchUpdateWorkItemsInput as reqBatchUpdateWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchUpdateWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqBatchUpdateWorkItemsHandler,
  mapBatchUpdatedWorkItems,
  previewBatchUpdateWorkItems
} from "../../../../src/products/req/tools/batch-update-work-items.js";

describe("previewBatchUpdateWorkItems", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewBatchUpdateWorkItems({
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3,
      priority_id: 2,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["wi-9", "wi-10"],
      statusId: 3,
      priorityId: 2,
      updatedCount: 0,
      executed: false
    });
  });
});

describe("mapBatchUpdatedWorkItems", () => {
  it("returns normalized batch update data", () => {
    const result = mapBatchUpdatedWorkItems({
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3,
      priority_id: 2,
      updatedCount: 2
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["wi-9", "wi-10"],
      statusId: 3,
      priorityId: 2,
      updatedCount: 2,
      executed: true
    });
  });
});

describe("reqBatchUpdateWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3
    };

    expect(reqBatchUpdateWorkItemsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchUpdateWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("rejects empty batch updates when no mutable fields are provided", () => {
    const input = {
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"]
    };

    expect(() => reqBatchUpdateWorkItemsInput.parse(input)).toThrow(
      /status_id|priority_id/i
    );
    expect(() => reqBatchUpdateWorkItemsInputFromBarrel.parse(input)).toThrow(
      /status_id|priority_id/i
    );
  });
});

describe("createReqBatchUpdateWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchUpdateWorkItems: vi.fn()
    };
    const handler = createReqBatchUpdateWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3,
      priority_id: 2,
      dry_run: true
    });

    expect(client.batchUpdateWorkItems).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: batch update 2 work items" }],
      structuredContent: {
        summary: "Dry run: batch update 2 work items",
        item: {
          projectId: "project-1",
          workItemIds: ["wi-9", "wi-10"],
          statusId: 3,
          priorityId: 2,
          updatedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      batchUpdateWorkItems: vi.fn(async () => ({
        project_id: "project-1",
        work_item_ids: ["wi-9", "wi-10"],
        status_id: 3,
        priority_id: 2,
        updatedCount: 2
      }))
    };
    const handler = createReqBatchUpdateWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3,
      priority_id: 2,
      dry_run: false
    });

    expect(client.batchUpdateWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_ids: ["wi-9", "wi-10"],
      status_id: 3,
      priority_id: 2,
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated 2 work items" }],
      structuredContent: {
        summary: "Updated 2 work items",
        item: {
          projectId: "project-1",
          workItemIds: ["wi-9", "wi-10"],
          statusId: 3,
          priorityId: 2,
          updatedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
