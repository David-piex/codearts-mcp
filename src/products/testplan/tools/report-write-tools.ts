import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanBatchDeleteTestReportsInput,
  testPlanCreateProgressReportInput,
  testPlanCreateCustomTemplateReportInput,
  testPlanDeleteCustomTemplateReportInput,
  testPlanDeleteProgressReportInput,
  testPlanCreateTestReportInput,
  testPlanRefreshProgressReportInput,
  testPlanRefreshCustomTemplateReportInput,
  testPlanUpdateCustomTemplateReportInput,
  testPlanUpdateProgressReportInput,
  testPlanUpdateRuleCheckViolationInput,
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

export function createTestPlanCreateCustomTemplateReportHandler(client: {
  createCustomTemplateReport: (input: Omit<ReturnType<typeof testPlanCreateCustomTemplateReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateCustomTemplateReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: create custom template report ${parsed.name}`, {
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.createCustomTemplateReport(parsed);
    const result = executed(`Created custom template report ${response.name ?? response.report_id ?? parsed.name}`, {
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

export function createTestPlanUpdateCustomTemplateReportHandler(client: {
  updateCustomTemplateReport: (input: Omit<ReturnType<typeof testPlanUpdateCustomTemplateReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateCustomTemplateReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: update custom template report ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateCustomTemplateReport(parsed);
    const result = executed(`Updated custom template report ${response.name ?? response.report_id}`, {
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

export function createTestPlanDeleteCustomTemplateReportHandler(client: {
  deleteCustomTemplateReport: (input: Omit<ReturnType<typeof testPlanDeleteCustomTemplateReportInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteCustomTemplateReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: delete custom template report ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectId: parsed.project_id,
        versionUri: parsed.version_uri
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.deleteCustomTemplateReport(parsed);
    const result = executed(`Deleted custom template report ${response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      deleted: response.deleted,
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

export function createTestPlanRefreshProgressReportHandler(client: {
  refreshProgressReport: (input: Omit<ReturnType<typeof testPlanRefreshProgressReportInput.parse>, "dry_run">) => Promise<{
    project_uuid: string;
    version_uri: string;
    operation_uri?: string;
    is_async_operate?: boolean;
    return_value?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanRefreshProgressReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview("Dry run: refresh progress report", {
        projectUuid: parsed.project_uuid,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.refreshProgressReport(parsed);
    const result = executed(`Refreshed progress report ${response.operation_uri ?? response.return_value ?? parsed.name ?? parsed.version_uri}`, {
      id: response.operation_uri ?? response.return_value ?? parsed.version_uri,
      operationUri: response.operation_uri,
      projectUuid: response.project_uuid,
      versionUri: response.version_uri,
      isAsyncOperate: response.is_async_operate,
      returnValue: response.return_value,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanUpdateProgressReportHandler(client: {
  updateProgressReport: (input: Omit<ReturnType<typeof testPlanUpdateProgressReportInput.parse>, "dry_run">) => Promise<{
    project_uuid: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateProgressReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: update progress report ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectUuid: parsed.project_uuid,
        versionUri: parsed.version_uri,
        name: parsed.name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateProgressReport(parsed);
    const result = executed(`Updated progress report ${response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectUuid: response.project_uuid,
      versionUri: response.version_uri,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanCreateProgressReportHandler(client: {
  createProgressReport: (input: Omit<ReturnType<typeof testPlanCreateProgressReportInput.parse>, "dry_run">) => Promise<{
    project_uuid: string;
    version_uri: string;
    operation_uri?: string;
    is_async_operate?: boolean;
    return_value?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateProgressReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: create progress report ${parsed.name}`, {
        projectUuid: parsed.project_uuid,
        versionUri: parsed.version_uri,
        name: parsed.name,
        type: parsed.type
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.createProgressReport(parsed);
    const result = executed(`Created progress report ${response.operation_uri ?? response.return_value ?? parsed.name}`, {
      id: response.operation_uri ?? response.return_value ?? parsed.name,
      operationUri: response.operation_uri,
      projectUuid: response.project_uuid,
      versionUri: response.version_uri,
      name: parsed.name,
      type: parsed.type,
      isAsyncOperate: response.is_async_operate,
      returnValue: response.return_value,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanDeleteProgressReportHandler(client: {
  deleteProgressReport: (input: Omit<ReturnType<typeof testPlanDeleteProgressReportInput.parse>, "dry_run">) => Promise<{
    project_uuid: string;
    version_uri: string;
    report_id: string;
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteProgressReportInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: delete progress report ${parsed.report_uri}`, {
        id: parsed.report_uri,
        reportId: parsed.report_uri,
        projectUuid: parsed.project_uuid,
        versionUri: parsed.version_uri
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.deleteProgressReport(parsed);
    const result = executed(`Deleted progress report ${response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectUuid: response.project_uuid,
      versionUri: response.version_uri,
      deleted: response.deleted,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanBatchDeleteTestReportsHandler(client: {
  batchDeleteTestReports: (input: Omit<ReturnType<typeof testPlanBatchDeleteTestReportsInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    report_ids: string[];
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteTestReportsInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: batch-delete ${parsed.report_uris.length} test report(s)`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        reportIds: parsed.report_uris
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.batchDeleteTestReports(parsed);
    const result = executed(`Batch-deleted ${response.report_ids.length} test report(s)`, {
      id: response.project_id,
      projectId: response.project_id,
      reportIds: response.report_ids,
      deleted: response.deleted,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createTestPlanUpdateRuleCheckViolationHandler(client: {
  updateRuleCheckViolation: (input: Omit<ReturnType<typeof testPlanUpdateRuleCheckViolationInput.parse>, "dry_run">) => Promise<{
    project_id: string;
    version_uri: string;
    violation_id: string;
    status: number;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateRuleCheckViolationInput.parse(input);
    if (parsed.dry_run) {
      const result = preview(`Dry run: update rule check violation ${parsed.violation_uri}`, {
        id: parsed.violation_uri,
        violationId: parsed.violation_uri,
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        status: parsed.status
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateRuleCheckViolation(parsed);
    const result = executed(`Updated rule check violation ${response.violation_id}`, {
      id: response.violation_id,
      violationId: response.violation_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      status: response.status,
      value: response.value,
      response: response.raw
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
