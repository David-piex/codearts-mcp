import { describe, expect, it } from "vitest";
import { createBuildGetHistoryDetailsHandler } from "../../../../src/products/build/tools/get-history-details.js";

describe("createBuildGetHistoryDetailsHandler", () => {
  it("maps build history details into MCP output", async () => {
    const handler = createBuildGetHistoryDetailsHandler({
      getHistoryDetails: async () => ({
        job_id: "job-1",
        build_number: 5,
        job_name: "gateway-build",
        project_id: "project-1",
        project_name: "gateway",
        parameters: { branch: "main" },
        build_steps: [
          { name: "Code CheckOut", status: "success", build_time: 8366 },
          { name: "Maven Build", status: "error", build_time: 12000 }
        ]
      })
    });

    const result = await handler({ job_id: "job-1", build_number: 5 });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      buildNumber: 5,
      name: "gateway-build",
      projectId: "project-1",
      projectName: "gateway",
      parameterCount: 1,
      stepCount: 2
    });
  });
});
