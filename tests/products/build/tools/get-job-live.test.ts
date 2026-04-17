import { describe, expect, it } from "vitest";
import { createBuildGetJobHandler } from "../../../../src/products/build/tools/get-job.js";

describe("createBuildGetJobHandler", () => {
  it("maps build job detail into MCP output", async () => {
    const handler = createBuildGetJobHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        project_id: "project-1",
        description: "main build"
      })
    });

    const result = await handler({ job_id: "job-1" });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      name: "gateway-build",
      projectId: "project-1",
      description: "main build"
    });
  });
});
