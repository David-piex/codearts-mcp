import { describe, expect, it } from "vitest";
import { mapPipelineList } from "../../../../src/products/pipeline/tools/list-pipelines.js";

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
});
