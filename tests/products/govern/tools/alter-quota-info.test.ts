import { describe, expect, it } from "vitest";
import { createGovernAlterQuotaInfoHandler } from "../../../../src/products/govern/tools/alter-quota-info.js";

describe("createGovernAlterQuotaInfoHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernAlterQuotaInfoHandler({
      alterQuotaInfo: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      resource_id: "resource-1",
      change_mode: 1,
      product_info: [{ resource_size: 5, resource_size_measure_id: 17 }],
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "resource-1",
      projectId: "project-1",
      executed: false
    });
  });

  it("maps altered quota result into MCP output", async () => {
    const handler = createGovernAlterQuotaInfoHandler({
      alterQuotaInfo: async () => ({
        order_id: "order-1"
      })
    });

    const result = await handler({
      project_id: "project-1",
      resource_id: "resource-1",
      change_mode: 1,
      product_info: [{ resource_size: 5, resource_size_measure_id: 17 }],
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "order-1",
      orderId: "order-1",
      executed: true
    });
  });
});
