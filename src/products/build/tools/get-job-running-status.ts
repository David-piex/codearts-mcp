import { buildGetJobRunningStatusInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  getJobRunningStatus: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobRunningStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobRunningStatusInput.parse(input);
    const response = await client.getJobRunningStatus(parsed);
    const result = mapBuildValueItem(
      "Loaded Build job running status",
      response.job_id,
      "status",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
