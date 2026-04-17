import { describe, expect, it } from "vitest";
import { createGovernGetOsiStatisticsHandler } from "../../../../src/products/govern/tools/get-osi-statistics.js";

describe("createGovernGetOsiStatisticsHandler", () => {
  it("maps govern osi statistics into MCP output", async () => {
    const handler = createGovernGetOsiStatisticsHandler({
      getOsiStatistics: async () => ({
        total: {
          software: 10089
        }
      })
    });

    const result = await handler({
      project_id: "project-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "osi-statistics",
      totalSoftware: 10089
    });
  });
});
