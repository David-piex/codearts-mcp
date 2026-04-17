import { describe, expect, it } from "vitest";
import { createReqUpdateWorkItemHandler } from "../../../../src/products/req/tools/update-work-item.js";

describe("createReqUpdateWorkItemHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqUpdateWorkItemHandler({
      updateWorkItem: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "123",
      title: "Rename story",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      id: "123",
      projectId: "p-1",
      title: "Rename story",
      executed: false
    });
  });

  it("maps updated work item into MCP output", async () => {
    const handler = createReqUpdateWorkItemHandler({
      updateWorkItem: async () => ({
        id: 123,
        name: "Rename story",
        description: "updated",
        status: { id: 2, name: "进行中" },
        tracker: { id: 7, name: "story" }
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "123",
      title: "Rename story",
      status_id: 2,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "123",
      title: "Rename story",
      description: "updated",
      status: "进行中",
      statusId: 2,
      type: "story",
      typeId: 7,
      executed: true
    });
  });
});
