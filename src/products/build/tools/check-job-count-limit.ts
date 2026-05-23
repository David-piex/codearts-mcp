import { buildCheckJobCountLimitInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  checkJobCountLimit: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildCheckJobCountLimitHandler(client: Client) {
  return async (input: unknown) => {
    buildCheckJobCountLimitInput.parse(input);
    const response = await client.checkJobCountLimit();
    const result = mapBuildValueItem(
      "Loaded Build job count limit status",
      "job-count-limit",
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
