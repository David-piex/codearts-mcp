import { buildGetJobCopyNameInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  getJobCopyName: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobCopyNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobCopyNameInput.parse(input);
    const response = await client.getJobCopyName(parsed);
    const result = mapBuildValueItem(
      "Loaded Build job copy name",
      response.job_id,
      "copyName",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
