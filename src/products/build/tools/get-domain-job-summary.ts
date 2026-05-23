import { buildGetDomainJobSummaryInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainJobSummary: () => Promise<{ raw: Record<string, unknown> }>;
};

export function createBuildGetDomainJobSummaryHandler(client: Client) {
  return async (input: unknown) => {
    buildGetDomainJobSummaryInput.parse(input);
    const response = await client.getDomainJobSummary();
    const result = mapBuildRecordItem(
      "Loaded Build domain job summary",
      "domain-job-summary",
      "summary",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
