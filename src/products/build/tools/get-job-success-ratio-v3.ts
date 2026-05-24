import { buildGetJobSuccessRatioV3Input } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getJobSuccessRatioV3: (input: {
    job_id: string;
    start_time: string;
    end_time: string;
  }) => Promise<{
    job_id: string;
    start_time: string;
    end_time: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobSuccessRatioV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobSuccessRatioV3Input.parse(input);
    const response = await client.getJobSuccessRatioV3(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build v3 job success ratio",
      response.job_id,
      "ratio",
      response.raw,
      {
        jobId: response.job_id,
        startTime: response.start_time,
        endTime: response.end_time
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
