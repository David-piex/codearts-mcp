import { describe, expect, it } from "vitest";
import { createBuildListJobsHandler } from "../../../../src/products/build/tools/list-jobs.js";

describe("createBuildListJobsHandler", () => {
  it("maps build jobs list into MCP output", async () => {
    const handler = createBuildListJobsHandler({
      listJobs: async () => ({
        jobs: [
          {
            job_id: "job-1",
            name: "gateway-build",
            project_id: "project-1",
            build_project_id: "build-project-1",
            is_running: false
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 build jobs");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "job-1",
      name: "gateway-build",
      projectId: "project-1",
      buildProjectId: "build-project-1",
      isRunning: false
    });
    expect(result.content[0]?.text).toContain("id: job-1");
    expect(result.content[0]?.text).toContain("name: gateway-build");
    expect(result.content[0]?.text).toContain("isRunning: false");
  });
});
