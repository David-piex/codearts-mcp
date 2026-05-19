import { buildGetJobNoticeInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getJobNotice: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobNoticeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobNoticeInput.parse(input);
    const response = await client.getJobNotice(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build job notice",
      response.job_id,
      "notice",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
