import { describe, it } from "vitest";
import {
  mapPipelineWrite,
  previewPipelineWrite
} from "../../../../src/products/pipeline/tools/manage-pipeline-notice-permission.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("previewPipelineWrite", () => {
  it("returns a dry-run summary for pipeline notice and permission writes", () => {
    const result = previewPipelineWrite("update official notice", {
      projectId: "project-1",
      pipelineId: "pipe-1"
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      executed: false
    });
  });
});

describe("mapPipelineWrite", () => {
  it("returns normalized write output for pipeline notice and permission writes", () => {
    const result = mapPipelineWrite("updated official notice", {
      projectId: "project-1",
      pipelineId: "pipe-1",
      status: "success"
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      status: "success",
      executed: true
    });
  });
});
