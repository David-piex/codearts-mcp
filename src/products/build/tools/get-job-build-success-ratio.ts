import { buildGetJobBuildSuccessRatioInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getJobBuildSuccessRatio: (input: {
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
  }) => Promise<{
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobBuildSuccessRatioHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobBuildSuccessRatioInput.parse(input);
    const response = await client.getJobBuildSuccessRatio(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build job success ratio",
      response.job_id,
      "ratio",
      response.raw,
      {
        repository_name: response.repository_name,
        branch: response.branch,
        interval: response.interval
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
