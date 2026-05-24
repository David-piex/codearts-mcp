import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetSuccessRateMetricsInput } from "../schemas.js";

type Client = {
  getSuccessRateMetrics: (input: {
    project_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    metrics: Record<string, unknown>;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetSuccessRateMetricsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetSuccessRateMetricsInput.parse(input);
    const response = await client.getSuccessRateMetrics(parsed);
    const result = asItemResult("Deploy success rate metrics loaded", {
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
