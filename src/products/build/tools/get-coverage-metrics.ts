import { buildGetCoverageMetricsInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getCoverageMetrics: (input: { job_id: string; build_no: number; root_id: string }) => Promise<{
    job_id: string;
    build_no: number;
    root_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetCoverageMetricsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetCoverageMetricsInput.parse(input);
    const response = await client.getCoverageMetrics(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build coverage metrics",
      response.root_id,
      "metrics",
      response.raw,
      {
        job_id: response.job_id,
        build_no: response.build_no,
        root_id: response.root_id
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
