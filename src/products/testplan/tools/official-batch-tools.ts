import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  testPlanBatchCloseTestcaseReviewsInput,
  testPlanBatchCreateTestcasesInput,
  testPlanBatchCreateTestcaseReviewsInput,
  testPlanBatchDeleteBranchesV4Input,
  testPlanBatchDeleteIteratorsV4Input,
  testPlanBatchDeleteTestcasesV4Input,
  testPlanBatchUpdateTestcasesV4Input,
  testPlanCreateApiTestcaseV4Input,
  testPlanCreateExecutionTaskV1Input,
  testPlanListIteratorsV4WithStatsInput
} from "../schemas.js";

function countRecords(...inputs: unknown[]) {
  for (const input of inputs) {
    if (Array.isArray(input)) {
      return input.length;
    }
  }

  return 0;
}

function textResult(result: ReturnType<typeof asItemResult>) {
  return {
    content: [{ type: "text" as const, text: result.summary }],
    structuredContent: result
  };
}

type ValueResponse = {
  project_id?: string;
  value?: unknown;
  raw: Record<string, unknown>;
};

export function createTestPlanBatchCreateTestcasesHandler(client: {
  batchCreateTestcases: (input: Omit<ReturnType<typeof testPlanBatchCreateTestcasesInput.parse>, "dry_run">) => Promise<
    ValueResponse & {
      testcase_count: number;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchCreateTestcasesInput.parse(input);
    const testcaseCount = countRecords(parsed.testcases, parsed.testcase_list, parsed.case_list);

    if (parsed.dry_run) {
      return textResult(asItemResult("Dry run: batch create TestPlan testcases", {
        id: parsed.project_id,
        projectId: parsed.project_id,
        testcaseCount,
        executed: false
      }));
    }

    const response = await client.batchCreateTestcases(parsed);
    return textResult(asItemResult("Batch created TestPlan testcases", {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      testcaseCount: response.testcase_count,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanBatchDeleteTestcasesV4Handler(client: {
  batchDeleteTestcasesV4: (input: Omit<ReturnType<typeof testPlanBatchDeleteTestcasesV4Input.parse>, "dry_run">) => Promise<
    ValueResponse & {
      testcase_uris: string[];
      deleted: boolean;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteTestcasesV4Input.parse(input);
    const testcaseUris = parsed.testcase_uris ?? parsed.case_uris ?? [];

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: batch delete ${testcaseUris.length} TestPlan testcases`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        testcaseUris,
        deletedCount: testcaseUris.length,
        executed: false
      }));
    }

    const response = await client.batchDeleteTestcasesV4(parsed);
    return textResult(asItemResult(`Batch deleted ${response.testcase_uris.length} TestPlan testcases`, {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      testcaseUris: response.testcase_uris,
      deleted: response.deleted,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanBatchUpdateTestcasesV4Handler(client: {
  batchUpdateTestcasesV4: (input: Omit<ReturnType<typeof testPlanBatchUpdateTestcasesV4Input.parse>, "dry_run">) => Promise<
    ValueResponse & {
      project_id: string;
      testcase_count: number;
      updated: boolean;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchUpdateTestcasesV4Input.parse(input);
    const testcaseCount = countRecords(parsed.testcases, parsed.testcase_list, parsed.case_list);

    if (parsed.dry_run) {
      return textResult(asItemResult("Dry run: batch update TestPlan testcases", {
        id: parsed.project_id,
        projectId: parsed.project_id,
        testcaseCount,
        executed: false
      }));
    }

    const response = await client.batchUpdateTestcasesV4(parsed);
    return textResult(asItemResult("Batch updated TestPlan testcases", {
      id: response.project_id,
      projectId: response.project_id,
      testcaseCount: response.testcase_count,
      updated: response.updated,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanBatchCreateTestcaseReviewsHandler(client: {
  batchCreateTestcaseReviews: (input: Omit<ReturnType<typeof testPlanBatchCreateTestcaseReviewsInput.parse>, "dry_run">) => Promise<
    ValueResponse & {
      review_count: number;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchCreateTestcaseReviewsInput.parse(input);
    const reviewCount = countRecords(parsed.testcase_uris, parsed.case_uris);

    if (parsed.dry_run) {
      return textResult(asItemResult("Dry run: batch create TestPlan testcase reviews", {
        id: parsed.project_id,
        projectId: parsed.project_id,
        reviewCount,
        testcaseUris: parsed.testcase_uris ?? parsed.case_uris,
        reviewerIds: parsed.reviewer_ids,
        executed: false
      }));
    }

    const response = await client.batchCreateTestcaseReviews(parsed);
    return textResult(asItemResult("Batch created TestPlan testcase reviews", {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      reviewCount: response.review_count,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanBatchCloseTestcaseReviewsHandler(client: {
  batchCloseTestcaseReviews: (input: Omit<ReturnType<typeof testPlanBatchCloseTestcaseReviewsInput.parse>, "dry_run">) => Promise<
    ValueResponse & {
      review_ids: string[];
      closed: boolean;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchCloseTestcaseReviewsInput.parse(input);
    const reviewIds = parsed.review_ids ?? parsed.review_uris ?? [];

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: batch close ${reviewIds.length} TestPlan testcase reviews`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        reviewIds,
        closedCount: reviewIds.length,
        executed: false
      }));
    }

    const response = await client.batchCloseTestcaseReviews(parsed);
    return textResult(asItemResult(`Batch closed ${response.review_ids.length} TestPlan testcase reviews`, {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      reviewIds: response.review_ids,
      closed: response.closed,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanCreateApiTestcaseV4Handler(client: {
  createApiTestcaseV4: (input: Omit<ReturnType<typeof testPlanCreateApiTestcaseV4Input.parse>, "dry_run">) => Promise<
    ValueResponse & {
      testcase_id?: string;
      name?: string;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateApiTestcaseV4Input.parse(input);

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: create TestPlan API testcase ${parsed.name ?? parsed.project_id}`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        name: parsed.name,
        testType: parsed.test_type,
        executed: false
      }));
    }

    const response = await client.createApiTestcaseV4(parsed);
    return textResult(asItemResult(`Created TestPlan API testcase ${response.name ?? response.testcase_id ?? parsed.name ?? parsed.project_id}`, {
      id: response.testcase_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      testcaseId: response.testcase_id,
      name: response.name,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanCreateExecutionTaskV1Handler(client: {
  createExecutionTaskV1: (input: Omit<ReturnType<typeof testPlanCreateExecutionTaskV1Input.parse>, "dry_run">) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateExecutionTaskV1Input.parse(input);

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: create TestPlan execution task ${parsed.name ?? parsed.project_id}`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        name: parsed.name,
        versionUri: parsed.version_uri,
        executed: false
      }));
    }

    const response = await client.createExecutionTaskV1(parsed);
    return textResult(asItemResult(`Created TestPlan execution task ${response.name ?? response.task_id}`, {
      id: response.task_id,
      projectId: parsed.project_id,
      name: response.name,
      versionUri: response.version_uri,
      statusCode: response.status_code,
      statusName: response.status_name,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanListIteratorsV4WithStatsHandler(client: {
  listIteratorsV4WithStats: (input: ReturnType<typeof testPlanListIteratorsV4WithStatsInput.parse>) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorsV4WithStatsInput.parse(input);
    const response = await client.listIteratorsV4WithStats(parsed);
    const result = asListResult(
      `${response.iterators.length} TestPlan v4 iterators found`,
      response.iterators.map((iterator) => ({
        id: String(iterator.uri ?? iterator.iterator_uri ?? iterator.id ?? ""),
        name: typeof iterator.name === "string" ? iterator.name : undefined,
        currentStage: typeof iterator.current_stage === "string" ? iterator.current_stage : undefined,
        iterator
      })),
      toPageInfo(parsed.page, parsed.page_size, response.total)
    );

    return {
      content: [{ type: "text" as const, text: formatListToolText(result, {
        fields: [
          { label: "id", get: (item) => (item as { id?: string }).id },
          { label: "name", get: (item) => (item as { name?: string }).name },
          { label: "currentStage", get: (item) => (item as { currentStage?: string }).currentStage }
        ]
      }) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export function createTestPlanBatchDeleteIteratorsV4Handler(client: {
  batchDeleteIteratorsV4: (input: Omit<ReturnType<typeof testPlanBatchDeleteIteratorsV4Input.parse>, "dry_run">) => Promise<
    ValueResponse & {
      iterator_uris: string[];
      deleted: boolean;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteIteratorsV4Input.parse(input);
    const iteratorUris = parsed.iterator_uris ?? parsed.iterator_ids ?? [];

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: batch delete ${iteratorUris.length} TestPlan iterators`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        iteratorUris,
        deletedCount: iteratorUris.length,
        executed: false
      }));
    }

    const response = await client.batchDeleteIteratorsV4(parsed);
    return textResult(asItemResult(`Batch deleted ${response.iterator_uris.length} TestPlan iterators`, {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      iteratorUris: response.iterator_uris,
      deleted: response.deleted,
      value: response.value,
      executed: true
    }, response.raw));
  };
}

export function createTestPlanBatchDeleteBranchesV4Handler(client: {
  batchDeleteBranchesV4: (input: Omit<ReturnType<typeof testPlanBatchDeleteBranchesV4Input.parse>, "dry_run">) => Promise<
    ValueResponse & {
      branch_uris: string[];
      deleted: boolean;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteBranchesV4Input.parse(input);
    const branchUris = parsed.branch_uris ?? parsed.branch_ids ?? [];

    if (parsed.dry_run) {
      return textResult(asItemResult(`Dry run: batch delete ${branchUris.length} TestPlan branches`, {
        id: parsed.project_id,
        projectId: parsed.project_id,
        branchUris,
        deletedCount: branchUris.length,
        isAsync: parsed.is_async,
        executed: false
      }));
    }

    const response = await client.batchDeleteBranchesV4(parsed);
    return textResult(asItemResult(`Batch deleted ${response.branch_uris.length} TestPlan branches`, {
      id: response.project_id ?? parsed.project_id,
      projectId: response.project_id ?? parsed.project_id,
      branchUris: response.branch_uris,
      deleted: response.deleted,
      value: response.value,
      executed: true
    }, response.raw));
  };
}
