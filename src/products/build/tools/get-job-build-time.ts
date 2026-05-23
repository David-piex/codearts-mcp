import { buildGetJobBuildTimeInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getJobBuildTime: (input: {
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

export function createBuildGetJobBuildTimeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobBuildTimeInput.parse(input);
    const response = await client.getJobBuildTime(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build job build time",
      response.job_id,
      "build_time",
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
