import { describe, expect, it } from "vitest";
import { createPipelineListArtifactsHandler } from "../../../../src/products/pipeline/tools/list-artifacts.js";

describe("createPipelineListArtifactsHandler", () => {
  it("maps pipeline artifacts into MCP output", async () => {
    const handler = createPipelineListArtifactsHandler({
      listArtifacts: async () => ({
        artifacts: [
          {
            name: "gateway.jar",
            artifact_version: "1.0.0",
            upload_target: "artifact",
            artifact_package_type: "jar",
            artifact_uri: "/com/demo/gateway/1.0.0/gateway.jar",
            artifact_download_url_with_id: "https://download.example.com/gateway.jar",
            artifact_type: "generic",
            job_id: "job-1",
            build_no: 33
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1"
    });

    expect(result.structuredContent.summary).toContain("1 pipeline artifacts");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "/com/demo/gateway/1.0.0/gateway.jar",
      name: "gateway.jar",
      version: "1.0.0",
      uploadTarget: "artifact",
      packageType: "jar",
      downloadUrl: "https://download.example.com/gateway.jar",
      artifactType: "generic",
      jobId: "job-1",
      buildNo: 33
    });
  });
});
