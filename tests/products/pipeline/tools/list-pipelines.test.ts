import { describe, expect, it } from "vitest";
import {
  createPipelineListPipelinesHandler,
  mapPipelineList
} from "../../../../src/products/pipeline/tools/list-pipelines.js";

describe("mapPipelineList", () => {
  it("returns normalized pipelines with pagination", () => {
    const result = mapPipelineList(
      [
        {
          pipeline_id: "pipe-1",
          name: "release-pipeline",
          creator_name: "Bob",
          project_id: "project-1",
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
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "pipe-1",
        name: "release-pipeline",
        creatorName: "Bob",
        projectId: "project-1",
        projectName: "housekeeper",
        manifestVersion: "3.0",
        latestRunId: "run-1",
        latestRunStatus: "COMPLETED",
        latestRunNumber: 8,
        latestRunTriggerType: "Manual"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });

  it("renders readable preview text in MCP content", async () => {
    const handler = createPipelineListPipelinesHandler({
      listPipelines: async () => ({
        records: [
          {
            pipeline_id: "pipe-1",
            name: "release-pipeline",
            creator_name: "Bob",
            project_id: "project-1",
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

    expect(result.content[0]?.text).toContain("id: pipe-1");
    expect(result.content[0]?.text).toContain("name: release-pipeline");
    expect(result.content[0]?.text).toContain("latestRunStatus: COMPLETED");
  });
});
