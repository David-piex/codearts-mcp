import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectBugDensityInput } from "../schemas.js";

type ReqProjectBugDensity = {
  project_id: string;
  project_name?: string;
  metric_value?: string | number;
  metric_name?: string;
  dividend_value?: string | number;
  divisor_value?: string | number;
};

type ReqProjectBugDensityQuery = {
  project_id: string;
  date_range?: string;
  metric_type?: string;
  dividend?: {
    custom_fields?: Array<{
      name?: string;
      options?: string;
    }>;
  };
  divisor?: {
    custom_fields?: Array<{
      name?: string;
      options?: string;
    }>;
  };
};

export function mapReqProjectBugDensity(input: ReqProjectBugDensity) {
  return asItemResult(`Loaded bug density metric for ${input.project_id}`, {
    projectId: input.project_id,
    projectName: input.project_name,
    metricValue: input.metric_value,
    metricName: input.metric_name,
    dividendValue: input.dividend_value,
    divisorValue: input.divisor_value
  });
}

type ReqGetProjectBugDensityClient = {
  getProjectBugDensity: (input: ReqProjectBugDensityQuery) => Promise<ReqProjectBugDensity>;
};

export function createReqGetProjectBugDensityHandler(client: ReqGetProjectBugDensityClient) {
  return async (input: unknown) => {
    const parsed = reqGetProjectBugDensityInput.parse(input);
    const response = await client.getProjectBugDensity(parsed);
    const result = mapReqProjectBugDensity(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
