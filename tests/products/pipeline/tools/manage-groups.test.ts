import { describe, expect, it } from "vitest";
import {
  mapPipelineGroupList
} from "../../../../src/products/pipeline/tools/list-groups.js";
import {
  mapCreatedPipelineGroup,
  previewCreatePipelineGroup
} from "../../../../src/products/pipeline/tools/create-group.js";
import {
  mapUpdatedPipelineGroup,
  previewUpdatePipelineGroup
} from "../../../../src/products/pipeline/tools/update-group.js";
import {
  mapDeletedPipelineGroup,
  previewDeletePipelineGroup
} from "../../../../src/products/pipeline/tools/delete-group.js";
import {
  mapMovedPipelinesToGroup,
  previewMovePipelinesToGroup
} from "../../../../src/products/pipeline/tools/move-pipelines-to-group.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedItems
} from "./tool-test-helpers.js";

describe("mapPipelineGroupList", () => {
  it("returns normalized pipeline groups with nested children", () => {
    const result = mapPipelineGroupList("project-1", [
      {
        id: "group-root",
        name: "Root",
        path_id: "group-root",
        children: [
          {
            id: "group-child",
            name: "Child",
            parent_id: "group-root",
            path_id: "group-root.group-child"
          }
        ]
      }
    ]);

    expectMappedItems(result, [
      {
        id: "group-root",
        projectId: "project-1",
        name: "Root",
        pathId: "group-root",
        childCount: 1,
        children: [
          {
            id: "group-child",
            projectId: "project-1",
            name: "Child",
            parentId: "group-root",
            pathId: "group-root.group-child",
            childCount: 0,
            children: []
          }
        ]
      }
    ]);
  });
});

describe("previewCreatePipelineGroup", () => {
  it("returns a dry-run summary for creating a group", () => {
    const result = previewCreatePipelineGroup({
      project_id: "project-1",
      name: "Release",
      parent_id: "root",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "Release",
      parentId: "root",
      executed: false
    });
  });
});

describe("mapCreatedPipelineGroup", () => {
  it("returns normalized created group data", () => {
    const result = mapCreatedPipelineGroup({
      id: "group-1",
      project_id: "project-1",
      name: "Release",
      parent_id: "root"
    });

    expectMappedItem(result, {
      id: "group-1",
      projectId: "project-1",
      name: "Release",
      parentId: "root",
      executed: true
    });
  });
});

describe("previewUpdatePipelineGroup", () => {
  it("returns a dry-run summary for updating a group", () => {
    const result = previewUpdatePipelineGroup({
      project_id: "project-1",
      id: "group-1",
      name: "Release v2",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      id: "group-1",
      name: "Release v2",
      executed: false
    });
  });
});

describe("mapUpdatedPipelineGroup", () => {
  it("returns normalized updated group data", () => {
    const result = mapUpdatedPipelineGroup({
      project_id: "project-1",
      id: "group-1",
      name: "Release v2",
      success: true
    });

    expectMappedItem(result, {
      id: "group-1",
      projectId: "project-1",
      name: "Release v2",
      success: true,
      executed: true
    });
  });
});

describe("previewDeletePipelineGroup", () => {
  it("returns a dry-run summary for deleting a group", () => {
    const result = previewDeletePipelineGroup({
      project_id: "project-1",
      id: "group-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      id: "group-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineGroup", () => {
  it("returns normalized deleted group data", () => {
    const result = mapDeletedPipelineGroup({
      project_id: "project-1",
      id: "group-1",
      success: true
    });

    expectMappedItem(result, {
      id: "group-1",
      projectId: "project-1",
      success: true,
      executed: true
    });
  });
});

describe("previewMovePipelinesToGroup", () => {
  it("returns a dry-run summary for moving pipelines to a group", () => {
    const result = previewMovePipelinesToGroup({
      project_id: "project-1",
      group_id: "group-1",
      pipelines: [{ pipeline_id: "pipe-1", pipeline_name: "release-main" }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      groupId: "group-1",
      pipelineCount: 1,
      executed: false
    });
  });
});

describe("mapMovedPipelinesToGroup", () => {
  it("returns normalized move results", () => {
    const result = mapMovedPipelinesToGroup("project-1", "group-1", [
      {
        code: "success",
        pipeline_id: "pipe-1",
        pipeline_name: "release-main"
      }
    ]);

    expectMappedItems(result, [
      {
        id: "pipe-1",
        projectId: "project-1",
        groupId: "group-1",
        code: "success",
        pipelineId: "pipe-1",
        pipelineName: "release-main"
      }
    ]);
  });
});
