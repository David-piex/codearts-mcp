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
  mapBatchDeletedPipelines,
  mapBatchRunPipelines,
  mapCreatedPipeline,
  mapUpdatedPipelineInfo,
  previewBatchDeletePipelines,
  previewBatchRunPipelines,
  previewCreatePipeline,
  previewCreatePipelineByTemplate,
  previewUpdatePipelineInfo
} from "../../../../src/products/pipeline/tools/manage-pipeline-core.js";
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

describe("previewCreatePipelineByTemplate", () => {
  it("returns a dry-run summary for creating a pipeline from a template", () => {
    const result = previewCreatePipelineByTemplate({
      project_id: "project-1",
      template_id: "template-1",
      name: "Release Flow",
      description: "desc",
      group_id: "group-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      templateId: "template-1",
      name: "Release Flow",
      description: "desc",
      groupId: "group-1",
      executed: false
    });
  });
});

describe("mapCreatedPipeline", () => {
  it("returns normalized created pipeline data", () => {
    const result = mapCreatedPipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      name: "Release Flow"
    });

    expectMappedItem(result, {
      id: "pipe-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      name: "Release Flow",
      executed: true
    });
  });
});

describe("previewCreatePipeline", () => {
  it("returns a dry-run summary for creating a pipeline", () => {
    const result = previewCreatePipeline({
      project_id: "project-1",
      name: "Release Flow",
      description: "desc",
      manifest_version: "3.0",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "Release Flow",
      description: "desc",
      manifestVersion: "3.0",
      executed: false
    });
  });
});

describe("previewUpdatePipelineInfo", () => {
  it("returns a dry-run summary for updating a pipeline", () => {
    const result = previewUpdatePipelineInfo({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      name: "Release Flow V2",
      description: "desc",
      is_publish: true,
      manifest_version: "3.1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      name: "Release Flow V2",
      description: "desc",
      isPublish: true,
      manifestVersion: "3.1",
      executed: false
    });
  });
});

describe("mapUpdatedPipelineInfo", () => {
  it("returns normalized updated pipeline data", () => {
    const result = mapUpdatedPipelineInfo({
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

describe("previewBatchDeletePipelines", () => {
  it("returns a dry-run summary for batch deleting pipelines", () => {
    const result = previewBatchDeletePipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      executed: false
    });
  });
});

describe("mapBatchDeletedPipelines", () => {
  it("returns normalized batch delete data", () => {
    const result = mapBatchDeletedPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"]
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      deleted: true,
      executed: true
    });
  });
});

describe("previewBatchRunPipelines", () => {
  it("returns a dry-run summary for batch running pipelines", () => {
    const result = previewBatchRunPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      branch: "main",
      description: "release",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      branch: "main",
      description: "release",
      executed: false
    });
  });
});

describe("mapBatchRunPipelines", () => {
  it("returns normalized batch run data", () => {
    const result = mapBatchRunPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"]
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      success: true,
      executed: true
    });
  });
});
