import { describe, expect, it } from "vitest";
import { createBuildGetLastHistoryV3Handler } from "../../../../src/products/build/tools/get-last-history-v3.js";

describe("createBuildGetLastHistoryV3Handler", () => {
  it("maps v3 last successful history into MCP output", async () => {
    const handler = createBuildGetLastHistoryV3Handler({
      getLastHistoryV3: async () => ({
        project_id: "project-1",
        repository_name: "gateway",
        raw: {
          record_id: "20260524.1",
          job_id: "job-1",
          result: "SUCCESS"
        }
      })
    });

    const result = await handler({ project_id: "project-1", repository_name: "gateway" });

    expect(result.content[0]?.text).toContain("Loaded Build v3 last successful history");
    expect(result.structuredContent.item).toMatchObject({
      id: "project-1",
      projectId: "project-1",
      repositoryName: "gateway",
      history: {
        record_id: "20260524.1",
        job_id: "job-1",
        result: "SUCCESS"
      }
    });
  });
});
