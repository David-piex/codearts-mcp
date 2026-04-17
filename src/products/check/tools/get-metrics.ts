import { asItemResult } from "../../../contracts/tool-result.js";
import { checkGetMetricsInput } from "../schemas.js";

export function mapCheckMetrics(input: {
  task_id: string;
  code_lines?: number;
  issues_count?: number;
  duplicated_lines?: number;
}) {
  return asItemResult(`Loaded check metrics ${input.task_id}`, {
    id: input.task_id,
    codeLines: input.code_lines,
    issuesCount: input.issues_count,
    duplicatedLines: input.duplicated_lines
  });
}

type CheckGetMetricsClient = {
  getMetrics: (input: { task_id: string; project_id?: string }) => Promise<{
    task_id: string;
    code_lines?: number;
    issues_count?: number;
    duplicated_lines?: number;
  }>;
};

export function createCheckGetMetricsHandler(client: CheckGetMetricsClient) {
  return async (input: unknown) => {
    const parsed = checkGetMetricsInput.parse(input);
    const response = await client.getMetrics(parsed);
    const result = mapCheckMetrics(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
