import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanBatchUpdateTestcaseExecutionInfoInput,
  testPlanStopTaskExecutionByCaseInput,
  testPlanUpdateTaskExecutionInfoInput,
  testPlanUpdateTaskExecutionStatusInput
} from "../schemas.js";

type TaskExecutionMutationPreviewInput = {
  project_id: string;
  task_uri?: string;
  case_list?: Array<Record<string, unknown>>;
  dry_run: boolean;
};

function countCases(caseList?: Array<Record<string, unknown>>) {
  return Array.isArray(caseList) ? caseList.length : 0;
}

function previewTaskExecutionMutation(
  action: string,
  input: TaskExecutionMutationPreviewInput
) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(
    `${mode}: ${action}${input.task_uri ? ` ${input.task_uri}` : ""}`,
    {
      projectId: input.project_id,
      taskId: input.task_uri,
      caseCount: countCases(input.case_list),
      executed: !input.dry_run
    }
  );
}

function mapTaskExecutionMutationResult(
  summary: string,
  input: {
    project_id: string;
    task_uri?: string;
    value?: string;
    executed: boolean;
    stopped?: boolean;
    updated?: boolean;
    case_list?: Array<Record<string, unknown>>;
  }
) {
  return asItemResult(summary, {
    id: input.task_uri ?? input.project_id,
    projectId: input.project_id,
    taskId: input.task_uri,
    value: input.value,
    caseCount: countCases(input.case_list),
    stopped: input.stopped,
    updated: input.updated,
    executed: input.executed
  });
}

type TestPlanUpdateTaskExecutionInfoClient = {
  updateTaskExecutionInfo: (input: Omit<
    ReturnType<typeof testPlanUpdateTaskExecutionInfoInput.parse>,
    "dry_run"
  >) => Promise<{
    task_uri: string;
    value?: string;
    updated: boolean;
  }>;
};

type TestPlanUpdateTaskExecutionStatusClient = {
  updateTaskExecutionStatus: (input: Omit<
    ReturnType<typeof testPlanUpdateTaskExecutionStatusInput.parse>,
    "dry_run"
  >) => Promise<{
    task_uri: string;
    value?: string;
    updated: boolean;
  }>;
};

type TestPlanStopTaskExecutionByCaseClient = {
  stopTaskExecutionByCase: (input: Omit<
    ReturnType<typeof testPlanStopTaskExecutionByCaseInput.parse>,
    "dry_run"
  >) => Promise<{
    task_uri: string;
    value?: string;
    stopped: boolean;
  }>;
};

type TestPlanBatchUpdateTestcaseExecutionInfoClient = {
  batchUpdateTestcaseExecutionInfo: (input: Omit<
    ReturnType<typeof testPlanBatchUpdateTestcaseExecutionInfoInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    value?: string;
    updated: boolean;
  }>;
};

export function createTestPlanUpdateTaskExecutionInfoHandler(
  client: TestPlanUpdateTaskExecutionInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTaskExecutionInfoInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTaskExecutionMutation(
        "update test plan testcase execution info for task",
        parsed
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskExecutionInfo(parsed);
    const result = mapTaskExecutionMutationResult(
      `Updated test plan testcase execution info for task ${response.task_uri}`,
      { ...response, project_id: parsed.project_id, executed: true, case_list: parsed.case_list }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateTaskExecutionStatusHandler(
  client: TestPlanUpdateTaskExecutionStatusClient
) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTaskExecutionStatusInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTaskExecutionMutation(
        "update test plan testcase execution status for task",
        parsed
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskExecutionStatus(parsed);
    const result = mapTaskExecutionMutationResult(
      `Updated test plan testcase execution status for task ${response.task_uri}`,
      { ...response, project_id: parsed.project_id, executed: true, case_list: parsed.case_list }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanStopTaskExecutionByCaseHandler(
  client: TestPlanStopTaskExecutionByCaseClient
) {
  return async (input: unknown) => {
    const parsed = testPlanStopTaskExecutionByCaseInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTaskExecutionMutation(
        "stop test plan testcase execution for task",
        parsed
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopTaskExecutionByCase(parsed);
    const result = mapTaskExecutionMutationResult(
      `Stopped test plan testcase execution for task ${response.task_uri}`,
      {
        ...response,
        project_id: parsed.project_id,
        executed: true,
        case_list: parsed.case_list
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanBatchUpdateTestcaseExecutionInfoHandler(
  client: TestPlanBatchUpdateTestcaseExecutionInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanBatchUpdateTestcaseExecutionInfoInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTaskExecutionMutation(
        "batch update test plan testcase execution info",
        parsed
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateTestcaseExecutionInfo(parsed);
    const result = mapTaskExecutionMutationResult(
      `Batch updated test plan testcase execution info for project ${response.project_id}`,
      {
        ...response,
        task_uri: parsed.task_uri,
        project_id: parsed.project_id,
        executed: true,
        case_list: parsed.case_list
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
