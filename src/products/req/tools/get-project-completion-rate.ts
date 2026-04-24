import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectCompletionRateInput } from "../schemas.js";

type ReqProjectCompletionRate = {
  project_id: string;
  project_name?: string;
  metric_value?: string | number;
  metric_name?: string;
  dividend_value?: string | number;
  divisor_value?: string | number;
};

type ReqProjectCompletionRateQuery = {
  project_id: string;
  date_range?: string;
  metric_type?: string;
  sprint_id?: string;
  dividend?: Record<string, string>;
  divisor?: Record<string, string>;
};

export function mapReqProjectCompletionRate(input: ReqProjectCompletionRate) {
  return asItemResult(`Loaded completion rate metric for ${input.project_id}`, {
    projectId: input.project_id,
    projectName: input.project_name,
    metricValue: input.metric_value,
    metricName: input.metric_name,
    dividendValue: input.dividend_value,
    divisorValue: input.divisor_value
  });
}

type ReqGetProjectCompletionRateClient = {
  getProjectCompletionRate: (
    input: ReqProjectCompletionRateQuery
  ) => Promise<ReqProjectCompletionRate>;
};

export function createReqGetProjectCompletionRateHandler(
  client: ReqGetProjectCompletionRateClient
) {
  return async (input: unknown) => {
    const parsed = reqGetProjectCompletionRateInput.parse(input);
    const response = await client.getProjectCompletionRate(parsed);
    const result = mapReqProjectCompletionRate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
