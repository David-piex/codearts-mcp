import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetTaskSuccessRateMetricsInput } from "../schemas.js";

type Client = {
  getTaskSuccessRateMetrics: (input: {
    project_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    metrics: Record<string, unknown>;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetTaskSuccessRateMetricsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetTaskSuccessRateMetricsInput.parse(input);
    const response = await client.getTaskSuccessRateMetrics(parsed);
    const result = asItemResult("Deploy task success rate metrics loaded", {
      projectId: response.project_id,
      metrics: response.metrics,
      status: response.status,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
