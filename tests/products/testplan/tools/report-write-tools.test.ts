import { describe, expect, it } from "vitest";
import {
  createTestPlanCreateProgressReportHandler,
  createTestPlanCreateCustomTemplateReportHandler,
  createTestPlanCreateTestReportHandler,
  createTestPlanDeleteCustomTemplateReportHandler,
  createTestPlanDeleteProgressReportHandler,
  createTestPlanRefreshProgressReportHandler,
  createTestPlanRefreshCustomTemplateReportHandler,
  createTestPlanUpdateCustomTemplateReportHandler,
  createTestPlanUpdateProgressReportHandler,
  createTestPlanUpdateTestReportHandler,
  createTestPlanUpdateTestReportQualityAttributesHandler
} from "../../../../src/products/testplan/tools/report-write-tools.js";

describe("testplan report write handlers", () => {
  it("returns dry-run previews by default", async () => {
    const createHandler = createTestPlanCreateTestReportHandler({
      createTestReport: async () => {
        throw new Error("should not execute");
      }
    });
    const createCustomHandler = createTestPlanCreateCustomTemplateReportHandler({
      createCustomTemplateReport: async () => {
        throw new Error("should not execute");
      }
    });
    const updateCustomHandler = createTestPlanUpdateCustomTemplateReportHandler({
      updateCustomTemplateReport: async () => {
        throw new Error("should not execute");
      }
    });
    const deleteCustomHandler = createTestPlanDeleteCustomTemplateReportHandler({
      deleteCustomTemplateReport: async () => {
        throw new Error("should not execute");
      }
    });
    const updateHandler = createTestPlanUpdateTestReportHandler({
      updateTestReport: async () => {
        throw new Error("should not execute");
      }
    });
    const qualityHandler = createTestPlanUpdateTestReportQualityAttributesHandler({
      updateTestReportQualityAttributes: async () => {
        throw new Error("should not execute");
      }
    });
    const refreshHandler = createTestPlanRefreshCustomTemplateReportHandler({
      refreshCustomTemplateReport: async () => {
        throw new Error("should not execute");
      }
    });
    const refreshProgressHandler = createTestPlanRefreshProgressReportHandler({
      refreshProgressReport: async () => {
        throw new Error("should not execute");
      }
    });
    const createProgressHandler = createTestPlanCreateProgressReportHandler({
      createProgressReport: async () => {
        throw new Error("should not execute");
      }
    });
    const updateProgressHandler = createTestPlanUpdateProgressReportHandler({
      updateProgressReport: async () => {
        throw new Error("should not execute");
      }
    });
    const deleteProgressHandler = createTestPlanDeleteProgressReportHandler({
      deleteProgressReport: async () => {
        throw new Error("should not execute");
      }
    });

    await expect(
      createHandler({ project_id: "project-1", version_uri: "version-1", name: "report-a" })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      createCustomHandler({ project_id: "project-1", version_uri: "version-1", name: "report-custom" })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      updateCustomHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-1",
        name: "report-custom"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      deleteCustomHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-1"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      updateHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1",
        name: "report-a"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      qualityHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1",
        body: { value: [] }
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      refreshHandler({ project_id: "project-1", version_uri: "version-1", name: "report-a" })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      refreshProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-refresh"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      createProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-create",
        type: "2",
        workpiece_type: "progress",
        analysis_dim_row: "progress",
        filter: { featureUris: ["feature-1"] }
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      updateProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "progress-1",
        name: "progress-report"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
    await expect(
      deleteProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "progress-1"
      })
    ).resolves.toMatchObject({ structuredContent: { item: { executed: false } } });
  });

  it("executes when dry_run is false", async () => {
    const createHandler = createTestPlanCreateTestReportHandler({
      createTestReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: "report-1",
        name: input.name,
        value: "report-1",
        raw: { value: "report-1" }
      })
    });
    const createCustomHandler = createTestPlanCreateCustomTemplateReportHandler({
      createCustomTemplateReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: "report-custom-1",
        name: input.name,
        value: "report-custom-1",
        raw: { value: "report-custom-1" }
      })
    });
    const updateCustomHandler = createTestPlanUpdateCustomTemplateReportHandler({
      updateCustomTemplateReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        name: input.name,
        value: "success",
        raw: { value: "success" }
      })
    });
    const deleteCustomHandler = createTestPlanDeleteCustomTemplateReportHandler({
      deleteCustomTemplateReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        deleted: true,
        value: "deleted",
        raw: { value: "deleted" }
      })
    });
    const updateHandler = createTestPlanUpdateTestReportHandler({
      updateTestReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        name: input.name,
        value: "success",
        raw: { value: "success" }
      })
    });
    const qualityHandler = createTestPlanUpdateTestReportQualityAttributesHandler({
      updateTestReportQualityAttributes: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: "success",
        raw: { value: "success" }
      })
    });
    const refreshHandler = createTestPlanRefreshCustomTemplateReportHandler({
      refreshCustomTemplateReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: "report-2",
        name: input.name,
        value: "report-2",
        raw: { value: "report-2" }
      })
    });
    const refreshProgressHandler = createTestPlanRefreshProgressReportHandler({
      refreshProgressReport: async (input) => ({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        operation_uri: "operation-refresh-1",
        is_async_operate: true,
        return_value: "refresh-queued",
        value: undefined,
        raw: { async_uri: "operation-refresh-1", is_async_operate: true, return_value: "refresh-queued" }
      })
    });
    const createProgressHandler = createTestPlanCreateProgressReportHandler({
      createProgressReport: async (input) => ({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        operation_uri: "operation-create-1",
        is_async_operate: true,
        return_value: undefined,
        value: undefined,
        raw: { async_uri: "operation-create-1", is_async_operate: true }
      })
    });
    const updateProgressHandler = createTestPlanUpdateProgressReportHandler({
      updateProgressReport: async (input) => ({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: "success",
        raw: { value: "success" }
      })
    });
    const deleteProgressHandler = createTestPlanDeleteProgressReportHandler({
      deleteProgressReport: async (input) => ({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        deleted: true,
        value: "success",
        raw: { value: "success" }
      })
    });

    await expect(
      createHandler({
        project_id: "project-1",
        version_uri: "version-1",
        name: "report-a",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-1", executed: true } } });
    await expect(
      createCustomHandler({
        project_id: "project-1",
        version_uri: "version-1",
        name: "report-custom",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-custom-1", executed: true } } });
    await expect(
      updateCustomHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-1",
        name: "report-custom",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "custom-1", executed: true } } });
    await expect(
      deleteCustomHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: { item: { id: "custom-1", executed: true, deleted: true } }
    });
    await expect(
      updateHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1",
        name: "report-b",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-1", executed: true } } });
    await expect(
      qualityHandler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1",
        body: { value: [] },
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-1", executed: true } } });
    await expect(
      refreshHandler({
        project_id: "project-1",
        version_uri: "version-1",
        name: "report-c",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-2", executed: true } } });
    await expect(
      refreshProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-refresh",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: { item: { id: "operation-refresh-1", executed: true, operationUri: "operation-refresh-1" } }
    });
    await expect(
      createProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-create",
        type: "2",
        workpiece_type: "progress",
        analysis_dim_row: "progress",
        filter: { featureUris: ["feature-1"] },
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: { item: { id: "operation-create-1", executed: true, operationUri: "operation-create-1" } }
    });
    await expect(
      updateProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "progress-1",
        name: "progress-report",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "progress-1", executed: true } } });
    await expect(
      deleteProgressHandler({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "progress-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: { item: { id: "progress-1", executed: true, deleted: true } }
    });
  });
});
