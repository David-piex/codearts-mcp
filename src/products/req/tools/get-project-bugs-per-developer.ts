import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectBugsPerDeveloperInput } from "../schemas.js";

type ReqProjectBugsPerDeveloper = {
  project_id: string;
  project_name?: string;
  metric_value?: string | number;
  metric_name?: string;
  dividend_value?: string | number;
  divisor_value?: string | number;
};

export function mapReqProjectBugsPerDeveloper(input: ReqProjectBugsPerDeveloper) {
  return asItemResult(`Loaded bugs per developer metric for ${input.project_id}`, {
    projectId: input.project_id,
    projectName: input.project_name,
    metricValue: input.metric_value,
    metricName: input.metric_name,
    dividendValue: input.dividend_value,
    divisorValue: input.divisor_value
  });
}

type ReqGetProjectBugsPerDeveloperClient = {
  getProjectBugsPerDeveloper: (input: { project_id: string }) => Promise<ReqProjectBugsPerDeveloper>;
};

export function createReqGetProjectBugsPerDeveloperHandler(
  client: ReqGetProjectBugsPerDeveloperClient
) {
  return async (input: unknown) => {
    const parsed = reqGetProjectBugsPerDeveloperInput.parse(input);
    const response = await client.getProjectBugsPerDeveloper(parsed);
    const result = mapReqProjectBugsPerDeveloper(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
