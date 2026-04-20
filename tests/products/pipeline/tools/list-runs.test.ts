import { describe, expect, it } from "vitest";
import {
  createPipelineListRunsHandler,
  mapPipelineRuns
} from "../../../../src/products/pipeline/tools/list-runs.js";

describe("mapPipelineRuns", () => {
  it("returns normalized pipeline runs with pagination", () => {
    const result = mapPipelineRuns(
      [{ pipeline_run_id: "run-1", status: "success", executor_name: "Bob" }],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "run-1",
        status: "success",
        executorName: "Bob"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });

  it("renders readable preview text in MCP content", async () => {
    const handler = createPipelineListRunsHandler({
      listRuns: async () => ({
        records: [{ pipeline_run_id: "run-1", status: "success", executor_name: "Bob" }],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipeline-1",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("id: run-1");
    expect(result.content[0]?.text).toContain("status: success");
    expect(result.content[0]?.text).toContain("executorName: Bob");
  });
});
