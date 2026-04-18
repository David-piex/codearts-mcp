import { asItemResult } from "../../../contracts/tool-result.js";
import { deployRollbackAppInput } from "../schemas.js";

export function previewRollbackApp(input: {
  task_id: string;
  record_id: string;
  status?: string;
  percentage?: number;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: rollback deploy task ${input.task_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    status: input.status,
    percentage: input.percentage,
    executed: !input.dry_run
  });
}

export function mapRollbackApp(input: {
  task_id: string;
  source_record_id: string;
  record_id: string;
  status?: string;
}) {
  return asItemResult(`Rolled back deploy task ${input.task_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    sourceRecordId: input.source_record_id,
    status: input.status,
    executed: true
  });
}

type DeployRollbackAppClient = {
  getStatus: (input: { task_id: string; record_id?: string }) => Promise<{
    task_id: string;
    state?: string;
    percentage?: number;
  }>;
  rollbackApp: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    status?: string;
  }>;
};

export function createDeployRollbackAppHandler(client: DeployRollbackAppClient) {
  return async (input: unknown) => {
    const parsed = deployRollbackAppInput.parse(input);

    if (parsed.dry_run) {
      const status = await client.getStatus({
        task_id: parsed.task_id,
        record_id: parsed.record_id
      });
      const result = previewRollbackApp({
        ...parsed,
        status: status.state,
        percentage: status.percentage
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.rollbackApp(parsed);
    const result = mapRollbackApp({
      task_id: response.task_id,
      source_record_id: parsed.record_id,
      record_id: response.record_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
