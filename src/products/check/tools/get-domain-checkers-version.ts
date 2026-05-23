import { checkGetDomainCheckersVersionInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainCheckersVersion: (input: { domain_id: string }) => Promise<{
    domain_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetDomainCheckersVersionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetDomainCheckersVersionInput.parse(input);
    const response = await client.getDomainCheckersVersion(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check domain checkers version ${parsed.domain_id}`,
      parsed.domain_id,
      "checkersVersion",
      response.raw,
      { domainId: response.domain_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
