import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateDefectStatusInput } from "../schemas.js";

function mapUpdatedDefectStatus(input: {
  task_id: string;
  defect_id: string;
  defect_status: "0" | "1" | "2" | string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check defect ${input.defect_id} status`, {
    id: input.defect_id,
    taskId: input.task_id,
    defectId: input.defect_id,
    defectStatus: input.defect_status,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateDefectStatus: (input: {
    task_id: string;
    defect_id: string;
    defect_status: "0" | "1" | "2";
  }) => Promise<{
    task_id: string;
    defect_id: string;
    defect_status: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateDefectStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateDefectStatusInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedDefectStatus({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateDefectStatus(parsed);
    const result = mapUpdatedDefectStatus({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
