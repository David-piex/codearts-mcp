import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetSecConfigSummaryInput } from "../schemas.js";

export function mapGovernSecConfigSummary(input: {
  version?: string;
  start_time?: string;
  end_time?: string;
  items?: Array<{
    index?: string;
    name?: string;
    severity?: string;
    result?: unknown;
    confirmation?: unknown;
  }>;
}) {
  return asItemResult("Loaded govern sec config summary", {
    id: "secconfig-summary",
    version: input.version,
    itemCount: input.items?.length ?? 0,
    items: input.items ?? [],
    startTime: input.start_time,
    endTime: input.end_time
  });
}

type GovernGetSecConfigSummaryClient = {
  getSecConfigSummary: (input: { project_id: string; task_id: string }) => Promise<{
    version?: string;
    start_time?: string;
    end_time?: string;
    items?: Array<{
      index?: string;
      name?: string;
      severity?: string;
      result?: unknown;
      confirmation?: unknown;
    }>;
  }>;
};

export function createGovernGetSecConfigSummaryHandler(client: GovernGetSecConfigSummaryClient) {
  return async (input: unknown) => {
    const parsed = governGetSecConfigSummaryInput.parse(input);
    const response = await client.getSecConfigSummary(parsed);
    const result = mapGovernSecConfigSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
