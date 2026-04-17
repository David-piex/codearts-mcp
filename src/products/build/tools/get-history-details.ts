import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetHistoryDetailsInput } from "../schemas.js";

export function mapBuildHistoryDetails(input: {
  job_id: string;
  build_number: number;
  job_name?: string;
  project_id?: string;
  project_name?: string;
  parameters?: Record<string, unknown>;
  build_steps?: Array<{ name?: string; status?: string; build_time?: number }>;
}) {
  return asItemResult(`Loaded build history ${input.job_id}#${input.build_number}`, {
    id: input.job_id,
    buildNumber: input.build_number,
    name: input.job_name,
    projectId: input.project_id,
    projectName: input.project_name,
    parameterCount: Object.keys(input.parameters ?? {}).length,
    stepCount: input.build_steps?.length ?? 0
  });
}

type BuildGetHistoryDetailsClient = {
  getHistoryDetails: (input: { job_id: string; build_number: number }) => Promise<{
    job_id: string;
    build_number: number;
    job_name?: string;
    project_id?: string;
    project_name?: string;
    parameters?: Record<string, unknown>;
    build_steps?: Array<{ name?: string; status?: string; build_time?: number }>;
  }>;
};

export function createBuildGetHistoryDetailsHandler(client: BuildGetHistoryDetailsClient) {
  return async (input: unknown) => {
    const parsed = buildGetHistoryDetailsInput.parse(input);
    const response = await client.getHistoryDetails(parsed);
    const result = mapBuildHistoryDetails(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
