import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateIssueStatusInput } from "../schemas.js";

export function previewUpdateIssueStatus(input: {
  task_id: string;
  status: "0" | "2" | "5";
  comment: string;
  merge_key: string;
  merge_id?: string;
  job_id?: string;
  operator?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update Check issue ${input.merge_key} status`, {
    id: input.merge_key,
    taskId: input.task_id,
    mergeId: input.merge_id,
    jobId: input.job_id,
    status: input.status,
    comment: input.comment,
    operator: input.operator,
    executed: !input.dry_run
  });
}

export function mapUpdatedIssueStatus(input: {
  task_id: string;
  merge_key: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
}) {
  return asItemResult(`Updated Check issue ${input.merge_key} status`, {
    id: input.merge_key,
    taskId: input.task_id,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: true
  });
}

type Client = {
  updateIssueStatus: (input: {
    task_id: string;
    status: "0" | "2" | "5";
    comment: string;
    merge_key: string;
    merge_id?: string;
    job_id?: string;
    operator?: string;
  }) => Promise<{
    task_id: string;
    merge_key: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateIssueStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateIssueStatusInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateIssueStatus(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIssueStatus(parsed);
    const result = mapUpdatedIssueStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
