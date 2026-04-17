import { describe, expect, it } from "vitest";
import { createGovernGetQuotaInfoHandler } from "../../../../src/products/govern/tools/get-quota-info.js";

describe("createGovernGetQuotaInfoHandler", () => {
  it("maps govern quota info into MCP output", async () => {
    const handler = createGovernGetQuotaInfoHandler({
      getQuotaInfo: async () => ({
        package_quota: 5000,
        concurrent_task: 3,
        valid: true,
        resource_id: "quota-1"
      })
    });

    const result = await handler({
      project_id: "project-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "quota-1",
      packageQuota: 5000,
      concurrentTask: 3,
      valid: true
    });
  });
});
