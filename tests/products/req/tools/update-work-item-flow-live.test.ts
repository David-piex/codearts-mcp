import { describe, expect, it } from "vitest";
import { createReqUpdateWorkItemFlowHandler } from "../../../../src/products/req/tools/update-work-item-flow.js";

describe("createReqUpdateWorkItemFlowHandler", () => {
  it("maps provider flow transition results into MCP output", async () => {
    const handler = createReqUpdateWorkItemFlowHandler({
      updateWorkItemFlow: async () => ({
        work_item_id: "101",
        title: "Live style flow transition",
        status_id: 3,
        status_name: "Resolved",
        type_id: 7,
        type_name: "Story"
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "101",
      status_id: 3,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      workItemId: "101",
      title: "Live style flow transition",
      statusId: 3,
      status: "Resolved",
      typeId: 7,
      type: "Story",
      updatedOn: undefined,
      executed: true
    });
  });
});
