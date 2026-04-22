import { describe, expect, it } from "vitest";
import {
  mapCreatedPipelineVariableGroup,
  previewCreatePipelineVariableGroup
} from "../../../../src/products/pipeline/tools/create-variable-group.js";
import {
  mapUpdatedPipelineVariableGroup,
  previewUpdatePipelineVariableGroup
} from "../../../../src/products/pipeline/tools/update-variable-group.js";
import {
  mapDeletedPipelineVariableGroup,
  previewDeletePipelineVariableGroup
} from "../../../../src/products/pipeline/tools/delete-variable-group.js";
import {
  mapBoundPipelineVariableGroups,
  previewBindPipelineVariableGroupsToPipeline
} from "../../../../src/products/pipeline/tools/bind-variable-groups-to-pipeline.js";
import { mapPipelineVariableGroupDetail } from "../../../../src/products/pipeline/tools/get-variable-group.js";
import {
  mapPipelineVariableGroupList,
  mapPipelineVariableGroupsForPipeline
} from "../../../../src/products/pipeline/tools/list-variable-groups.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedItems,
  expectMappedPage
} from "./tool-test-helpers.js";

describe("previewCreatePipelineVariableGroup", () => {
  it("returns a dry-run summary for creating a variable group", () => {
    const result = previewCreatePipelineVariableGroup({
      project_id: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variables: [{ name: "ENV", value: "prod", is_secret: false }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variableCount: 1,
      executed: false
    });
  });
});

describe("mapCreatedPipelineVariableGroup", () => {
  it("returns normalized created variable-group data", () => {
    const result = mapCreatedPipelineVariableGroup({
      id: "vg-1",
      project_id: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variables: [{ name: "ENV", value: "prod", is_secret: false }]
    });

    expectMappedItem(result, {
      id: "vg-1",
      projectId: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variables: [{ name: "ENV", value: "prod", isSecret: false }],
      relatedPipelines: [],
      executed: true
    });
  });
});

describe("previewUpdatePipelineVariableGroup", () => {
  it("returns a dry-run summary for updating a variable group", () => {
    const result = previewUpdatePipelineVariableGroup({
      project_id: "project-1",
      id: "vg-1",
      name: "Release Vars v2",
      description: "updated release variables",
      variables: [{ name: "ENV", value: "staging", is_secret: false }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      id: "vg-1",
      name: "Release Vars v2",
      description: "updated release variables",
      variableCount: 1,
      executed: false
    });
  });
});

describe("mapUpdatedPipelineVariableGroup", () => {
  it("returns normalized updated variable-group data", () => {
    const result = mapUpdatedPipelineVariableGroup({
      project_id: "project-1",
      id: "vg-1",
      name: "Release Vars v2",
      success: true
    });

    expectMappedItem(result, {
      id: "vg-1",
      projectId: "project-1",
      name: "Release Vars v2",
      success: true,
      executed: true
    });
  });
});

describe("previewDeletePipelineVariableGroup", () => {
  it("returns a dry-run summary for deleting a variable group", () => {
    const result = previewDeletePipelineVariableGroup({
      project_id: "project-1",
      id: "vg-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      id: "vg-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineVariableGroup", () => {
  it("returns normalized deleted variable-group data", () => {
    const result = mapDeletedPipelineVariableGroup({
      project_id: "project-1",
      id: "vg-1",
      success: true
    });

    expectMappedItem(result, {
      id: "vg-1",
      projectId: "project-1",
      success: true,
      executed: true
    });
  });
});

describe("previewBindPipelineVariableGroupsToPipeline", () => {
  it("returns a dry-run summary for binding variable groups", () => {
    const result = previewBindPipelineVariableGroupsToPipeline({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      pipeline_group_ids: ["vg-1", "vg-2"],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineGroupIds: ["vg-1", "vg-2"],
      executed: false
    });
  });
});

describe("mapBoundPipelineVariableGroups", () => {
  it("returns normalized bind results", () => {
    const result = mapBoundPipelineVariableGroups({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      pipeline_group_ids: ["vg-1", "vg-2"],
      success: true
    });

    expectMappedItem(result, {
      id: "pipe-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineGroupIds: ["vg-1", "vg-2"],
      success: true,
      executed: true
    });
  });
});

describe("mapPipelineVariableGroupDetail", () => {
  it("returns normalized variable-group detail data", () => {
    const result = mapPipelineVariableGroupDetail({
      id: "vg-1",
      project_id: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variables: [{ name: "ENV", value: "prod", is_secret: false }],
      related_pipelines: [{ pipeline_id: "pipe-1", pipeline_name: "release-main" }],
      creator_name: "yao"
    });

    expectMappedItem(result, {
      id: "vg-1",
      projectId: "project-1",
      name: "Release Vars",
      description: "shared release variables",
      variables: [{ name: "ENV", value: "prod", isSecret: false }],
      relatedPipelines: [{ pipelineId: "pipe-1", pipelineName: "release-main" }],
      creatorName: "yao"
    });
  });
});

describe("mapPipelineVariableGroupsForPipeline", () => {
  it("returns normalized variable groups for a pipeline", () => {
    const result = mapPipelineVariableGroupsForPipeline("project-1", "pipe-1", [
      {
        id: "vg-1",
        name: "Release Vars"
      }
    ]);

    expectMappedItems(result, [
      {
        id: "vg-1",
        projectId: "project-1",
        pipelineId: "pipe-1",
        name: "Release Vars",
        relatedPipelines: [],
        variables: []
      }
    ]);
  });
});

describe("mapPipelineVariableGroupList", () => {
  it("returns normalized variable-group list data", () => {
    const result = mapPipelineVariableGroupList(
      "project-1",
      [{ id: "vg-1", name: "Release Vars" }],
      {
        page: 1,
        page_size: 20,
        total: 1
      }
    );

    expectMappedPage(result, {
      items: [
        {
          id: "vg-1",
          projectId: "project-1",
          name: "Release Vars",
          relatedPipelines: [],
          variables: []
        }
      ],
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 1
      }
    });
  });
});
