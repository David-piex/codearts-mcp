import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanCreateTestReportInput,
  testPlanRefreshCustomTemplateReportInput,
  testPlanUpdateTestReportInput,
  testPlanUpdateTestReportQualityAttributesInput
} from "../schemas.js";

function preview(summary: string, item: Record<string, unknown>) {
  return asItemResult(summary, { ...item, executed: false });
}

function executed(summary: string, item: Record<string, unknown>) {
  return asItemResult(summary, { ...item, executed: true });
}

export function createTestPlanCreateTestReportHandler(client: {
  createTestReport: (input: Omit<ReturnType<typeof testPlanCreateTestReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTestReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: create test plan report ${parsed.name}`, {
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.createTestReport(parsed);
    const result = executed(`Created test plan report ${response.name ?? response.report_id ?? parsed.name}`, {
      id: response.report_id ?? parsed.name,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      name: response.name,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanUpdateTestReportHandler(client: {
  updateTestReport: (input: Omit<ReturnType<typeof testPlanUpdateTestReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTestReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: update test plan report ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateTestReport(parsed);
    const result = executed(`Updated test plan report ${response.name ?? response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      name: response.name,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanUpdateTestReportQualityAttributesHandler(client: {
  updateTestReportQualityAttributes: (input: Omit<ReturnType<typeof testPlanUpdateTestReportQualityAttributesInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTestReportQualityAttributesInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: update test plan report quality attributes ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectId: parsed.project_id,
        versionUri: parsed.version_uri
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateTestReportQualityAttributes(parsed);
    const result = executed(`Updated test plan report quality attributes ${response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanRefreshCustomTemplateReportHandler(client: {
  refreshCustomTemplateReport: (input: Omit<ReturnType<typeof testPlanRefreshCustomTemplateReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanRefreshCustomTemplateReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: refresh custom template report ${parsed.name}`, {
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.refreshCustomTemplateReport(parsed);
    const result = executed(`Refreshed custom template report ${response.name ?? response.report_id ?? parsed.name}`, {
      id: response.report_id ?? parsed.name,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      name: response.name,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
