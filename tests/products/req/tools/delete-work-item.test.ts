import { describe, expect, it, vi } from "vitest";
import { reqDeleteWorkItemInput as reqDeleteWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqDeleteWorkItemHandler,
  mapDeletedWorkItem,
  previewDeleteWorkItem
} from "../../../../src/products/req/tools/delete-work-item.js";

describe("previewDeleteWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeleteWorkItem({
      project_id: "project-1",
      work_item_id: "wi-9",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "wi-9",
      projectId: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedWorkItem", () => {
  it("returns normalized deleted work item data", () => {
    const result = mapDeletedWorkItem({
      project_id: "project-1",
      work_item_id: "wi-9"
    });

    expect(result.item).toEqual({
      id: "wi-9",
      projectId: "project-1",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeleteWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "wi-9"
    };

    expect(reqDeleteWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqDeleteWorkItemHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteWorkItem: vi.fn()
    };
    const handler = createReqDeleteWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      dry_run: true
    });

    expect(client.deleteWorkItem).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: delete work item wi-9" }],
      structuredContent: {
        summary: "Dry run: delete work item wi-9",
        item: {
          id: "wi-9",
          projectId: "project-1",
          deleted: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      deleteWorkItem: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "wi-9",
        deleted: true as const
      }))
    };
    const handler = createReqDeleteWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "wi-9",
      dry_run: false
    });

    expect(client.deleteWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "wi-9",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted work item wi-9" }],
      structuredContent: {
        summary: "Deleted work item wi-9",
        item: {
          id: "wi-9",
          projectId: "project-1",
          deleted: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
