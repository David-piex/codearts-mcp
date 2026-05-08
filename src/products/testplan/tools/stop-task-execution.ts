import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanStopTaskExecutionInput } from "../schemas.js";

export function previewStopTaskExecution(input: {
  project_id: string;
  task_uri: string;
  result_uri: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop test plan task execution ${input.result_uri}`, {
    projectId: input.project_id,
    taskId: input.task_uri,
    resultId: input.result_uri,
    executed: !input.dry_run
  });
}

export function mapStoppedTaskExecution(input: {
  result_uri: string;
  value?: string;
  stopped: boolean;
}) {
  return asItemResult(`Stopped test plan task execution ${input.result_uri}`, {
    id: input.result_uri,
    resultId: input.result_uri,
    value: input.value,
    stopped: input.stopped,
    executed: true
  });
}

type TestPlanStopTaskExecutionClient = {
  stopTaskExecution: (input: {
    project_id: string;
    task_uri: string;
    result_uri: string;
  }) => Promise<{
    result_uri: string;
    value?: string;
    stopped: boolean;
  }>;
};

export function createTestPlanStopTaskExecutionHandler(
  client: TestPlanStopTaskExecutionClient
) {
  return async (input: unknown) => {
    const parsed = testPlanStopTaskExecutionInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStopTaskExecution(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopTaskExecution(parsed);
    const result = mapStoppedTaskExecution(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
