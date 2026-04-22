import { describe, expect, it } from "vitest";
import {
  mapDeletedPipeline,
  previewDeletePipeline
} from "../../../../src/products/pipeline/tools/delete-pipeline.js";
import {
  mapDisabledPipeline,
  previewDisablePipeline
} from "../../../../src/products/pipeline/tools/disable-pipeline.js";
import {
  mapEnabledPipeline,
  previewEnablePipeline
} from "../../../../src/products/pipeline/tools/enable-pipeline.js";
import {
  expectDryRunPreview,
  expectMappedItem
} from "./tool-test-helpers.js";

describe("previewDeletePipeline", () => {
  it("returns a dry-run summary for deleting a pipeline", () => {
    const result = previewDeletePipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      executed: false
    });
  });
});

describe("mapDeletedPipeline", () => {
  it("returns normalized deleted pipeline data", () => {
    const result = mapDeletedPipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1"
    });

    expectMappedItem(result, {
      id: "pipe-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      deleted: true,
      executed: true
    });
  });
});

describe("previewDisablePipeline", () => {
  it("returns a dry-run summary for disabling a pipeline", () => {
    const result = previewDisablePipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      executed: false
    });
  });
});

describe("mapDisabledPipeline", () => {
  it("returns normalized disabled pipeline data", () => {
    const result = mapDisabledPipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      success: true
    });

    expectMappedItem(result, {
      id: "pipe-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      success: true,
      executed: true
    });
  });
});

describe("previewEnablePipeline", () => {
  it("returns a dry-run summary for enabling a pipeline", () => {
    const result = previewEnablePipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      executed: false
    });
  });
});

describe("mapEnabledPipeline", () => {
  it("returns normalized enabled pipeline data", () => {
    const result = mapEnabledPipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      success: true
    });

    expectMappedItem(result, {
      id: "pipe-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      success: true,
      executed: true
    });
  });
});
