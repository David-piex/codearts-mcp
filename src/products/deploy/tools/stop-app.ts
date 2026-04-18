import { asItemResult } from "../../../contracts/tool-result.js";
import { deployStopAppInput } from "../schemas.js";

export function previewStopApp(input: {
  task_id: string;
  record_id: string;
  status?: string;
  percentage?: number;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop deploy task ${input.task_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    status: input.status,
    percentage: input.percentage,
    executed: !input.dry_run
  });
}

export function mapStoppedApp(input: { task_id: string; record_id: string; status?: string }) {
  return asItemResult(`Stopped deploy task ${input.task_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    status: input.status,
    executed: true
  });
}

type DeployStopAppClient = {
  getStatus: (input: { task_id: string; record_id?: string }) => Promise<{
    task_id: string;
    state?: string;
    percentage?: number;
  }>;
  stopApp: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    status?: string;
  }>;
};

export function createDeployStopAppHandler(client: DeployStopAppClient) {
  return async (input: unknown) => {
    const parsed = deployStopAppInput.parse(input);

    if (parsed.dry_run) {
      const status = await client.getStatus({
        task_id: parsed.task_id,
        record_id: parsed.record_id
      });
      const result = previewStopApp({
        ...parsed,
        status: status.state,
        percentage: status.percentage
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopApp(parsed);
    const result = mapStoppedApp(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
