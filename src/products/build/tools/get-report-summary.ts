import { buildGetReportSummaryInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getReportSummary: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetReportSummaryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetReportSummaryInput.parse(input);
    const response = await client.getReportSummary(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build report summary",
      response.job_id,
      "summary",
      response.raw,
      {
        job_id: response.job_id,
        build_no: response.build_no
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
