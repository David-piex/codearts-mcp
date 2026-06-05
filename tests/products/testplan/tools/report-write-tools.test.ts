import { describe, expect, it } from "vitest";
import {
  createTestPlanCreateTestReportHandler,
  createTestPlanRefreshCustomTemplateReportHandler,
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

    await expect(
      createHandler({ project_id: "project-1", version_uri: "version-1", name: "report-a" })
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

    await expect(
      createHandler({
        project_id: "project-1",
        version_uri: "version-1",
        name: "report-a",
        dry_run: false
      })
    ).resolves.toMatchObject({ structuredContent: { item: { id: "report-1", executed: true } } });
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
  });
});
