import { describe, expect, it, vi } from "vitest";
import { reqAddIterationWorkItemsInput as reqAddIterationWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqAddIterationWorkItemsInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqAddIterationWorkItemsHandler,
  mapAddedIterationWorkItems,
  previewAddIterationWorkItems
} from "../../../../src/products/req/tools/add-iteration-work-items.js";

describe("previewAddIterationWorkItems", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewAddIterationWorkItems({
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      iterationId: "iteration-1",
      workItemIds: ["wi-9", "wi-10"],
      addedCount: 0,
      executed: false
    });
  });
});

describe("mapAddedIterationWorkItems", () => {
  it("returns normalized added work item data", () => {
    const result = mapAddedIterationWorkItems({
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"],
      addedCount: 2
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      iterationId: "iteration-1",
      workItemIds: ["wi-9", "wi-10"],
      addedCount: 2,
      executed: true
    });
  });
});

describe("reqAddIterationWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"]
    };

    expect(reqAddIterationWorkItemsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqAddIterationWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqAddIterationWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchUpdateWorkItems: vi.fn()
    };
    const handler = createReqAddIterationWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: true
    });

    expect(client.batchUpdateWorkItems).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: add 2 work items to iteration iteration-1" }],
      structuredContent: {
        summary: "Dry run: add 2 work items to iteration iteration-1",
        item: {
          projectId: "project-1",
          iterationId: "iteration-1",
          workItemIds: ["wi-9", "wi-10"],
          addedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed adds", async () => {
    const client = {
      batchUpdateWorkItems: vi.fn(async () => ({
        project_id: "project-1",
        iteration_id: "iteration-1",
        work_item_ids: ["wi-9", "wi-10"],
        updatedCount: 2
      }))
    };
    const handler = createReqAddIterationWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: false
    });

    expect(client.batchUpdateWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "iteration-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Added 2 work items to iteration iteration-1" }],
      structuredContent: {
        summary: "Added 2 work items to iteration iteration-1",
        item: {
          projectId: "project-1",
          iterationId: "iteration-1",
          workItemIds: ["wi-9", "wi-10"],
          addedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
