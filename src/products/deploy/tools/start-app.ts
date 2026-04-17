import { asItemResult } from "../../../contracts/tool-result.js";
import { deployStartAppInput } from "../schemas.js";

export function previewStartApp(input: { task_id: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: start deploy task ${input.task_id}`, {
    id: input.task_id,
    executed: !input.dry_run
  });
}

export function mapStartedApp(input: { task_id: string; job_id?: string; status?: string }) {
  return asItemResult(`Started deploy task ${input.task_id}`, {
    id: input.task_id,
    jobId: input.job_id,
    status: input.status,
    executed: true
  });
}

type DeployStartAppClient = {
  startApp: (input: { task_id: string }) => Promise<{
    task_id: string;
    job_id?: string;
    status?: string;
  }>;
};

export function createDeployStartAppHandler(client: DeployStartAppClient) {
  return async (input: unknown) => {
    const parsed = deployStartAppInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStartApp(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.startApp(parsed);
    const result = mapStartedApp(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
