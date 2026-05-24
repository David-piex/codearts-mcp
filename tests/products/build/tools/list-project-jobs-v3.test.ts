import { describe, expect, it } from "vitest";
import { createBuildListProjectJobsV3Handler } from "../../../../src/products/build/tools/list-project-jobs-v3.js";

describe("createBuildListProjectJobsV3Handler", () => {
  it("maps v3 project jobs into MCP output with raw payload", async () => {
    const handler = createBuildListProjectJobsV3Handler({
      listProjectJobsV3: async () => ({
        jobs: [
          {
            id: "job-1",
            job_name: "gateway-build"
          }
        ],
        total: 1,
        raw: { total: 1 }
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("Build v3 project jobs");
    expect(result.structuredContent.items).toEqual([
      {
        id: "job-1",
        name: undefined,
        job: {
          id: "job-1",
          job_name: "gateway-build"
        }
      }
    ]);
    expect(result.structuredContent.raw).toEqual({ total: 1 });
  });
});
