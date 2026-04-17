import { describe, expect, it } from "vitest";
import { createReqCreateWorkItemHandler } from "../../../../src/products/req/tools/create-work-item.js";

describe("createReqCreateWorkItemHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqCreateWorkItemHandler({
      createWorkItem: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "story",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      title: "Add login",
      workItemType: "story",
      executed: false
    });
  });

  it("maps created work item into MCP output", async () => {
    const handler = createReqCreateWorkItemHandler({
      createWorkItem: async () => ({
        id: 123,
        name: "Add login",
        description: "story created",
        status: { id: 1, name: "新建" },
        tracker: { id: 7, name: "story" }
      })
    });

    const result = await handler({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "story",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "123",
      title: "Add login",
      description: "story created",
      status: "新建",
      statusId: 1,
      type: "story",
      typeId: 7,
      executed: true
    });
  });
});
