import { buildGetJobDisableCheckInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  getJobDisableCheck: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobDisableCheckHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobDisableCheckInput.parse(input);
    const response = await client.getJobDisableCheck(parsed);
    const result = mapBuildValueItem(
      "Loaded Build job disable check",
      response.job_id,
      "disableCheck",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
