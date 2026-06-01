import { describe, expect, it } from "vitest";
import {
  createTestPlanDeleteAssetHandler,
  createTestPlanDeleteBasicAwsV1Handler,
  createTestPlanDeleteBasicAwsV2Handler,
  createTestPlanDeleteMindmapBackupHandler,
  createTestPlanDeleteMindmapHandler,
  createTestPlanDeleteMindmapRecycleHandler,
  createTestPlanDeleteTestDesignTemplateHandler
} from "../../../../src/products/testplan/tools/delete-official-resources.js";

describe("official TestPlan delete handlers", () => {
  it("returns dry-run previews by default", async () => {
    const assetHandler = createTestPlanDeleteAssetHandler({
      deleteAsset: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const mindmapHandler = createTestPlanDeleteMindmapHandler({
      deleteMindmap: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const templateHandler = createTestPlanDeleteTestDesignTemplateHandler({
      deleteTestDesignTemplate: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const recycleHandler = createTestPlanDeleteMindmapRecycleHandler({
      deleteMindmapRecycle: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const backupHandler = createTestPlanDeleteMindmapBackupHandler({
      deleteMindmapBackup: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const basicAwV1Handler = createTestPlanDeleteBasicAwsV1Handler({
      deleteBasicAwsV1: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const basicAwV2Handler = createTestPlanDeleteBasicAwsV2Handler({
      deleteBasicAwsV2: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(assetHandler({ project_id: "project-1", id: "asset-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete asset asset-1",
        item: { id: "asset-1", executed: false }
      }
    });
    await expect(mindmapHandler({ project_id: "project-1", id: "mindmap-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete mindmap mindmap-1",
        item: { id: "mindmap-1", executed: false }
      }
    });
    await expect(templateHandler({ project_id: "project-1", id: "template-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete test design template template-1",
        item: { id: "template-1", executed: false }
      }
    });
    await expect(recycleHandler({ project_id: "project-1", id: "recycle-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete mindmap recycle recycle-1",
        item: { id: "recycle-1", executed: false }
      }
    });
    await expect(backupHandler({ project_id: "project-1", id: "backup-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete mindmap backup backup-1",
        item: { id: "backup-1", executed: false }
      }
    });
    await expect(
      basicAwV1Handler({ project_id: "project-1", aw_ids: ["aw-1", "aw-2"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete 2 basic AW keywords via v1",
        item: { id: "aw-1,aw-2", executed: false, deletedCount: 2 }
      }
    });
    await expect(basicAwV2Handler({ project_id: "project-1", aw_ids: ["aw-3"] })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete 1 basic AW keywords via v2",
        item: { id: "aw-3", executed: false, deletedCount: 1 }
      }
    });
  });

  it("executes official delete calls when dry_run is false", async () => {
    const assetHandler = createTestPlanDeleteAssetHandler({
      deleteAsset: async () => ({ raw: { status: "success" } })
    });
    const basicAwV2Handler = createTestPlanDeleteBasicAwsV2Handler({
      deleteBasicAwsV2: async (input) => ({
        aw_ids: input.aw_ids,
        value: "success",
        raw: { status: "success", result: "success" }
      })
    });

    await expect(
      assetHandler({ project_id: "project-1", id: "asset-1", dry_run: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Deleted asset asset-1",
        item: { id: "asset-1", executed: true, asset: { status: "success" } }
      }
    });
    await expect(
      basicAwV2Handler({ project_id: "project-1", aw_ids: ["aw-1"], dry_run: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Deleted 1 basic AW keywords via v2",
        item: {
          id: "aw-1",
          executed: true,
          deletedCount: 1,
          value: "success",
          basicAws: { status: "success", result: "success" }
        }
      }
    });
  });
});
