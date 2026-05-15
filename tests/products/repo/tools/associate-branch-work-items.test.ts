import { describe, expect, it } from "vitest";
import {
  mapAssociatedBranchWorkItems,
  previewAssociateBranchWorkItems
} from "../../../../src/products/repo/tools/associate-branch-work-items.js";

describe("previewAssociateBranchWorkItems", () => {
  it("returns a dry-run summary for branch work item association", () => {
    const result = previewAssociateBranchWorkItems({
      project_id: "project-1",
      repository_id: "repo-1",
      branch: "feature/demo",
      work_item_ids: ["70779173", "70779174"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      repositoryId: "repo-1",
      branch: "feature/demo",
      workItemIds: ["70779173", "70779174"],
      executed: false
    });
  });
});

describe("mapAssociatedBranchWorkItems", () => {
  it("returns normalized branch work item association data", () => {
    const result = mapAssociatedBranchWorkItems({
      status: "success",
      project_id: "project-1",
      repository_id: "repo-1",
      branch: "feature/demo",
      work_item_ids: ["70779173"]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      repositoryId: "repo-1",
      branch: "feature/demo",
      workItemIds: ["70779173"],
      status: "success",
      success: true,
      executed: true
    });
  });
});
