import { buildGetDomainChargeTypeInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainChargeType: () => Promise<{ raw: Record<string, unknown> }>;
};

export function createBuildGetDomainChargeTypeHandler(client: Client) {
  return async (input: unknown) => {
    buildGetDomainChargeTypeInput.parse(input);
    const response = await client.getDomainChargeType();
    const result = mapBuildRecordItem(
      "Loaded Build domain charge type",
      "domain-charge-type",
      "chargeType",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
