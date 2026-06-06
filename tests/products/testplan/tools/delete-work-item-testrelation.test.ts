import { describe, expect, it } from "vitest";
import {
  createTestPlanDeleteWorkItemTestRelationHandler
} from "../../../../src/products/testplan/tools/delete-work-item-testrelation.js";

describe("testplan delete work item testrelation handler", () => {
  it("returns dry-run preview by default", async () => {
    const handler = createTestPlanDeleteWorkItemTestRelationHandler({
      deleteWorkItemTestRelation: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      work_item_id: "REQ-1",
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "REQ-1",
      workItemId: "REQ-1",
      deletedCount: 2,
      executed: false
    });
  });

  it("deletes relations when dry_run is false", async () => {
    const handler = createTestPlanDeleteWorkItemTestRelationHandler({
      deleteWorkItemTestRelation: async (input) => ({
        ...input,
        value: "success",
        deleted: true,
        raw: { value: "success" }
      })
    });

    const result = await handler({
      work_item_id: "REQ-1",
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "REQ-1",
      workItemId: "REQ-1",
      deletedCount: 2,
      value: "success",
      deleted: true,
      executed: true
    });
  });
});
