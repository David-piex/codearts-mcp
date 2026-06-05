import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanCreateCasesTaskInput,
  testPlanListCaseHistoryInput,
  testPlanListCasesByStidInput,
  testPlanListCasesStatusInput,
  testPlanListCasesStatusV3Input
} from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

export function createTestPlanListCasesStatusHandler(client: {
  listCasesStatus: (input: ReturnType<typeof testPlanListCasesStatusInput.parse>) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListCasesStatusInput.parse(input);
    const response = await client.listCasesStatus(parsed);
    const result = mapTestPlanRecordList(
      response.statuses,
      response.total,
      "legacy case statuses",
      "status"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}

export function createTestPlanListCasesStatusV3Handler(client: {
  listCasesStatusV3: (input: ReturnType<typeof testPlanListCasesStatusV3Input.parse>) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListCasesStatusV3Input.parse(input);
    const response = await client.listCasesStatusV3(parsed);
    const result = mapTestPlanRecordList(
      response.statuses,
      response.total,
      "legacy case statuses",
      "status"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}

export function createTestPlanListCaseHistoryHandler(client: {
  listCaseHistory: (input: ReturnType<typeof testPlanListCaseHistoryInput.parse>) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListCaseHistoryInput.parse(input);
    const response = await client.listCaseHistory(parsed);
    const result = mapTestPlanRecordList(
      response.histories,
      response.total,
      "legacy case histories",
      "history",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}

export function createTestPlanListCasesByStidHandler(client: {
  listCasesByStid: (input: ReturnType<typeof testPlanListCasesByStidInput.parse>) => Promise<{
    cases: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListCasesByStidInput.parse(input);
    const response = await client.listCasesByStid(parsed);
    const result = mapTestPlanRecordList(
      response.cases,
      response.total,
      "legacy suite cases",
      "case",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}

export function createTestPlanCreateCasesTaskHandler(client: {
  createCasesTask: (input: Omit<ReturnType<typeof testPlanCreateCasesTaskInput.parse>, "dry_run">) => Promise<{
    task_id: string;
    need_approve?: unknown;
    warn?: unknown[];
    package_type?: string;
    is_popup?: boolean;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateCasesTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create legacy TestPlan cases task", {
        id: parsed.task_name,
        testServiceId: parsed.testServiceId,
        caseCount: parsed.cases.length,
        taskName: parsed.task_name,
        planId: parsed.plan_id,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createCasesTask(request);
    const result = asItemResult(`Created legacy TestPlan cases task ${response.task_id}`, {
      id: response.task_id,
      taskId: response.task_id,
      needApprove: response.need_approve,
      warn: response.warn,
      packageType: response.package_type,
      isPopup: response.is_popup,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
