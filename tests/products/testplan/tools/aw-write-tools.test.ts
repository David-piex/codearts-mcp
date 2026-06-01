import { describe, expect, it } from "vitest";
import {
  createTestPlanCreateAwCataFirstHandler,
  createTestPlanDeleteAwCatasHandler,
  createTestPlanDeleteCustomAwFileHandler,
  createTestPlanSaveAwRefreshToAllHandler,
  createTestPlanUpdateAwNameViewHandler,
  createTestPlanUpdateTimeOutViewHandler
} from "../../../../src/products/testplan/tools/aw-write-tools.js";

describe("official TestPlan AW write handlers", () => {
  it("returns dry-run previews by default", async () => {
    const createHandler = createTestPlanCreateAwCataFirstHandler({
      createAwCataFirst: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const deleteHandler = createTestPlanDeleteAwCatasHandler({
      deleteAwCatas: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const fileHandler = createTestPlanDeleteCustomAwFileHandler({
      deleteCustomAwFile: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const nameViewHandler = createTestPlanUpdateAwNameViewHandler({
      updateAwNameView: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const timeoutHandler = createTestPlanUpdateTimeOutViewHandler({
      updateTimeOutView: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const refreshHandler = createTestPlanSaveAwRefreshToAllHandler({
      saveAwRefreshToAll: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      createHandler({ project_id: "project-1", name: "Smoke", parent_id: "TOP" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create AW catalog Smoke",
        item: { executed: false, awCatalog: { name: "Smoke", parent_id: "TOP" } }
      }
    });
    await expect(
      deleteHandler({ project_id: "project-1", items: [{ id: "cata-1", is_folder: true }] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete 1 AW catalogs",
        item: { id: "cata-1", executed: false, deletedCount: 1 }
      }
    });
    await expect(
      fileHandler({ project_id: "project-1", basic_aw_id: "aw-1", aw_lib_id: "lib-1" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete custom AW file lib-1",
        item: { id: "lib-1", executed: false }
      }
    });
    await expect(
      nameViewHandler({ project_id: "project-1", name_view: "1" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update AW name view",
        item: { id: "project-1", executed: false, awNameView: { body: { project_id: "project-1", name_view: "1" } } }
      }
    });
    await expect(
      timeoutHandler({ project_id: "project-1", time_out: 30 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update timeout view",
        item: { id: "project-1", executed: false, timeOutView: { body: { project_id: "project-1", time_out: 30 } } }
      }
    });
    await expect(
      refreshHandler({ project_id: "project-1", aw_id: "aw-1", body: { operation_type: "refresh" } })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: refresh AW aw-1 to all",
        item: { id: "aw-1", executed: false, awRefresh: { operation_type: "refresh" } }
      }
    });
  });

  it("executes official AW write calls when dry_run is false", async () => {
    const createHandler = createTestPlanCreateAwCataFirstHandler({
      createAwCataFirst: async () => ({
        cata_id: "cata-1",
        value: { id: "cata-1" },
        raw: { status: "success", result: { id: "cata-1" } }
      })
    });
    const deleteHandler = createTestPlanDeleteAwCatasHandler({
      deleteAwCatas: async (input) => ({
        ids: input.items.map((item) => item.id),
        value: "success",
        raw: { status: "success", result: "success" }
      })
    });
    const refreshHandler = createTestPlanSaveAwRefreshToAllHandler({
      saveAwRefreshToAll: async (input) => ({
        aw_id: input.aw_id,
        value: { id: "progress-1" },
        raw: { status: "success", result: { id: "progress-1" } }
      })
    });

    await expect(
      createHandler({ project_id: "project-1", name: "Smoke", dry_run: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Created AW catalog cata-1",
        item: { id: "cata-1", executed: true, value: { id: "cata-1" } }
      }
    });
    await expect(
      deleteHandler({
        project_id: "project-1",
        items: [{ id: "cata-1", is_folder: true }],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Deleted 1 AW catalogs",
        item: { id: "cata-1", executed: true, deletedCount: 1, value: "success" }
      }
    });
    await expect(
      refreshHandler({
        project_id: "project-1",
        aw_id: "aw-1",
        body: { operation_type: "refresh" },
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Started refresh for AW aw-1",
        item: { id: "aw-1", executed: true, value: { id: "progress-1" } }
      }
    });
  });
});
