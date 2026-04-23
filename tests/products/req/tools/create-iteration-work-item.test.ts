import { describe, expect, it, vi } from "vitest";
import { reqCreateIterationWorkItemInput as reqCreateIterationWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateIterationWorkItemInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqCreateIterationWorkItemHandler,
  mapCreatedIterationWorkItem,
  previewCreateIterationWorkItem
} from "../../../../src/products/req/tools/create-iteration-work-item.js";

describe("previewCreateIterationWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateIterationWorkItem({
      project_id: "project-1",
      iteration_id: "iteration-1",
      title: "Story A",
      work_item_type: "Story",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: create iteration work item Story A");
    expect(result.item).toEqual({
      projectId: "project-1",
      iterationId: "iteration-1",
      title: "Story A",
      workItemType: "Story",
      executed: false
    });
  });
});

describe("mapCreatedIterationWorkItem", () => {
  it("returns normalized created iteration work item data", () => {
    const result = mapCreatedIterationWorkItem({
      id: 101,
      name: "Story A",
      description: "Iteration item",
      status: { id: 1, name: "New" },
      tracker: { id: 5, name: "Story" },
      project_id: "project-1",
      iteration_id: "iteration-1"
    });

    expect(result.item).toEqual({
      id: "101",
      title: "Story A",
      description: "Iteration item",
      status: "New",
      statusId: 1,
      type: "Story",
      typeId: 5,
      projectId: "project-1",
      iterationId: "iteration-1",
      executed: true
    });
  });
});

describe("reqCreateIterationWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "iteration-1",
      title: "Story A",
      work_item_type: "Story"
    };

    expect(reqCreateIterationWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateIterationWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreateIterationWorkItemHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createWorkItem: vi.fn()
    };
    const handler = createReqCreateIterationWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      title: "Story A",
      work_item_type: "Story",
      dry_run: true
    });

    expect(client.createWorkItem).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: create iteration work item Story A" }],
      structuredContent: {
        summary: "Dry run: create iteration work item Story A",
        item: {
          projectId: "project-1",
          iterationId: "iteration-1",
          title: "Story A",
          workItemType: "Story",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed creates", async () => {
    const client = {
      createWorkItem: vi.fn(async () => ({
        id: 101,
        name: "Story A",
        description: "Iteration item",
        status: { id: 1, name: "New" },
        tracker: { id: 5, name: "Story" }
      }))
    };
    const handler = createReqCreateIterationWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      title: "Story A",
      work_item_type: "Story",
      dry_run: false
    });

    expect(client.createWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "iteration-1",
      title: "Story A",
      work_item_type: "Story",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Created iteration work item Story A" }],
      structuredContent: {
        summary: "Created iteration work item Story A",
        item: {
          id: "101",
          title: "Story A",
          description: "Iteration item",
          status: "New",
          statusId: 1,
          type: "Story",
          typeId: 5,
          projectId: "project-1",
          iterationId: "iteration-1",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
