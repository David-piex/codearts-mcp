import { describe, expect, it, vi } from "vitest";
import { reqBatchDeleteWorkItemsInput as reqBatchDeleteWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchDeleteWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqBatchDeleteWorkItemsHandler,
  mapBatchDeletedWorkItems,
  previewBatchDeleteWorkItems
} from "../../../../src/products/req/tools/batch-delete-work-items.js";

describe("previewBatchDeleteWorkItems", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewBatchDeleteWorkItems({
      project_id: "project-1",
      work_item_ids: ["401", "402"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["401", "402"],
      deletedCount: 0,
      executed: false
    });
  });
});

describe("reqBatchDeleteWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_ids: ["401", "402"]
    };

    expect(reqBatchDeleteWorkItemsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchDeleteWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("mapBatchDeletedWorkItems", () => {
  it("returns normalized batch delete data", () => {
    const result = mapBatchDeletedWorkItems({
      project_id: "project-1",
      work_item_ids: ["401", "402"]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["401", "402"],
      deletedCount: 2,
      executed: true
    });
  });
});

describe("createReqBatchDeleteWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchDeleteWorkItems: vi.fn()
    };
    const handler = createReqBatchDeleteWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["401", "402"],
      dry_run: true
    });

    expect(client.batchDeleteWorkItems).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: batch delete 2 work items" }],
      structuredContent: {
        summary: "Dry run: batch delete 2 work items",
        item: {
          projectId: "project-1",
          workItemIds: ["401", "402"],
          deletedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      batchDeleteWorkItems: vi.fn(async () => ({
        project_id: "project-1",
        work_item_ids: ["401", "402"],
        deletedCount: 2
      }))
    };
    const handler = createReqBatchDeleteWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["401", "402"],
      dry_run: false
    });

    expect(client.batchDeleteWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_ids: ["401", "402"],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted 2 work items" }],
      structuredContent: {
        summary: "Deleted 2 work items",
        item: {
          projectId: "project-1",
          workItemIds: ["401", "402"],
          deletedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
