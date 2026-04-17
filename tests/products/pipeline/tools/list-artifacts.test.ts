import { describe, expect, it } from "vitest";
import { mapPipelineArtifacts } from "../../../../src/products/pipeline/tools/list-artifacts.js";

describe("mapPipelineArtifacts", () => {
  it("returns normalized pipeline artifacts", () => {
    const result = mapPipelineArtifacts([
      {
        name: "demo-image",
        artifact_version: "1.0.0",
        upload_target: "artifact",
        artifact_package_type: "docker",
        artifact_uri: "artifact://demo-image:1.0.0",
        artifact_download_url_with_id: "https://example.com/download/1",
        artifact_type: "image",
        job_id: "job-1",
        build_no: 42
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "artifact://demo-image:1.0.0",
        name: "demo-image",
        version: "1.0.0",
        uploadTarget: "artifact",
        packageType: "docker",
        downloadUrl: "https://example.com/download/1",
        artifactType: "image",
        jobId: "job-1",
        buildNo: 42
      }
    ]);
  });
});
