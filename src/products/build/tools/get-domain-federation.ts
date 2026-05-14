import { buildGetDomainFederationInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  getDomainFederation: () => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
};

export function createBuildGetDomainFederationHandler(client: Client) {
  return async (input: unknown) => {
    buildGetDomainFederationInput.parse(input);
    const response = await client.getDomainFederation();
    const result = mapBuildValueItem(
      "Loaded Build domain federation status",
      "domain-federation",
      "federation",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
