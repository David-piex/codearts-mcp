import { buildGetDomainStatusInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainStatus: () => Promise<{ raw: Record<string, unknown> }>;
};

export function createBuildGetDomainStatusHandler(client: Client) {
  return async (input: unknown) => {
    buildGetDomainStatusInput.parse(input);
    const response = await client.getDomainStatus();
    const result = mapBuildRecordItem(
      "Loaded Build domain status",
      "domain-status",
      "status",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
