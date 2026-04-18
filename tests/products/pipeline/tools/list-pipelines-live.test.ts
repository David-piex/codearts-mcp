import { describe, expect, it } from "vitest";
import { createPipelineListPipelinesHandler } from "../../../../src/products/pipeline/tools/list-pipelines.js";

describe("createPipelineListPipelinesHandler", () => {
  it("maps pipeline list responses into MCP output", async () => {
    const handler = createPipelineListPipelinesHandler({
      listPipelines: async () => ({
        records: [
          {
            pipeline_id: "pipe-1",
            name: "release-main",
            creator_name: "yao",
            project_id: "owner-project",
            project_name: "housekeeper",
            manifest_version: "3.0",
            latest_run: {
              pipeline_run_id: "run-1",
              status: "COMPLETED",
              run_number: 8,
              trigger_type: "Manual"
            }
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 pipelines");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "pipe-1",
      name: "release-main",
      creatorName: "yao",
      projectId: "owner-project",
      projectName: "housekeeper",
      manifestVersion: "3.0",
      latestRunId: "run-1",
      latestRunStatus: "COMPLETED",
      latestRunNumber: 8,
      latestRunTriggerType: "Manual"
    });
  });
});
