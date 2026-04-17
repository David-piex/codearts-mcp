import { describe, expect, it } from "vitest";
import { createBuildGetProjectRecordStatisticsHandler } from "../../../../src/products/build/tools/get-project-record-statistics.js";

describe("createBuildGetProjectRecordStatisticsHandler", () => {
  it("maps project record statistics into MCP output", async () => {
    const handler = createBuildGetProjectRecordStatisticsHandler({
      getProjectRecordStatistics: async () => ({
        total: 12,
        success: 8,
        failed: 2,
        aborted: 1,
        running: 1
      })
    });

    const result = await handler({ project_id: "project-1", build_project_id: "build-project-1" });

    expect(result.structuredContent.item).toEqual({
      id: "build-project-1",
      projectId: "project-1",
      buildProjectId: "build-project-1",
      total: 12,
      success: 8,
      failed: 2,
      aborted: 1,
      running: 1
    });
  });
});
