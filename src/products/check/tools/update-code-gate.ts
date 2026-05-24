import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateCodeGateInput } from "../schemas.js";

type CodeGateReviewData = {
  compare_type: string;
  is_check: 0 | 1;
  name: string;
  value: number;
};

export function mapUpdatedCodeGate(input: {
  task_id: string;
  operator?: string;
  review_data?: CodeGateReviewData[];
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check code gate ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    operator: input.operator,
    reviewDataCount: input.review_data?.length,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateCodeGate: (input: {
    task_id: string;
    operator?: string;
    review_data: CodeGateReviewData[];
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateCodeGateHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateCodeGateInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedCodeGate({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateCodeGate(parsed);
    const result = mapUpdatedCodeGate({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
