import { describe, expect, it } from "vitest";
import {
  mapCreatedPipelineTag,
  previewCreatePipelineTag
} from "../../../../src/products/pipeline/tools/create-tag.js";
import {
  mapUpdatedPipelineTag,
  previewUpdatePipelineTag
} from "../../../../src/products/pipeline/tools/update-tag.js";
import {
  mapDeletedPipelineTag,
  previewDeletePipelineTag
} from "../../../../src/products/pipeline/tools/delete-tag.js";
import { mapPipelineTagList } from "../../../../src/products/pipeline/tools/list-tags.js";
import {
  mapSetPipelineTagsForPipelines,
  previewSetPipelineTagsForPipelines
} from "../../../../src/products/pipeline/tools/set-tags-for-pipelines.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedItems
} from "./tool-test-helpers.js";

describe("previewCreatePipelineTag", () => {
  it("returns a dry-run summary for creating a pipeline tag", () => {
    const result = previewCreatePipelineTag({
      project_id: "project-1",
      name: "release",
      color: "#0b81f6",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "release",
      color: "#0b81f6",
      executed: false
    });
  });
});

describe("mapCreatedPipelineTag", () => {
  it("returns normalized created tag data", () => {
    const result = mapCreatedPipelineTag({
      project_id: "project-1",
      name: "release",
      color: "#0b81f6",
      success: true
    });

    expectMappedItem(result, {
      projectId: "project-1",
      name: "release",
      color: "#0b81f6",
      success: true,
      executed: true
    });
  });
});

describe("mapPipelineTagList", () => {
  it("returns normalized pipeline tag list data", () => {
    const result = mapPipelineTagList("project-1", [
      {
        tag_id: "tag-1",
        name: "release",
        color: "#0b81f6",
        project_id: "project-1",
        project_name: "Codearts-mcp"
      }
    ]);

    expectMappedItems(result, [
      {
        id: "tag-1",
        tagId: "tag-1",
        projectId: "project-1",
        projectName: "Codearts-mcp",
        name: "release",
        color: "#0b81f6"
      }
    ]);
  });
});

describe("previewUpdatePipelineTag", () => {
  it("returns a dry-run summary for updating a pipeline tag", () => {
    const result = previewUpdatePipelineTag({
      project_id: "project-1",
      tag_id: "tag-1",
      name: "release-v2",
      color: "#123456",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      tagId: "tag-1",
      name: "release-v2",
      color: "#123456",
      executed: false
    });
  });
});

describe("mapUpdatedPipelineTag", () => {
  it("returns normalized updated tag data", () => {
    const result = mapUpdatedPipelineTag({
      project_id: "project-1",
      tag_id: "tag-1",
      name: "release-v2",
      color: "#123456",
      success: true
    });

    expectMappedItem(result, {
      id: "tag-1",
      projectId: "project-1",
      tagId: "tag-1",
      name: "release-v2",
      color: "#123456",
      success: true,
      executed: true
    });
  });
});

describe("previewDeletePipelineTag", () => {
  it("returns a dry-run summary for deleting a pipeline tag", () => {
    const result = previewDeletePipelineTag({
      project_id: "project-1",
      tag_id: "tag-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      tagId: "tag-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineTag", () => {
  it("returns normalized deleted tag data", () => {
    const result = mapDeletedPipelineTag({
      project_id: "project-1",
      tag_id: "tag-1",
      success: true
    });

    expectMappedItem(result, {
      id: "tag-1",
      projectId: "project-1",
      tagId: "tag-1",
      success: true,
      executed: true
    });
  });
});

describe("previewSetPipelineTagsForPipelines", () => {
  it("returns a dry-run summary for assigning tags to pipelines", () => {
    const result = previewSetPipelineTagsForPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      tag_ids: ["tag-1"],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      tagIds: ["tag-1"],
      executed: false
    });
  });
});

describe("mapSetPipelineTagsForPipelines", () => {
  it("returns normalized batch tag assignment data", () => {
    const result = mapSetPipelineTagsForPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      tag_ids: ["tag-1"],
      success: true
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      tagIds: ["tag-1"],
      success: true,
      executed: true
    });
  });
});
