import { checkGetCodeSumMeasuresInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getCodeSumMeasures: () => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetCodeSumMeasuresHandler(client: Client) {
  return async (input: unknown) => {
    checkGetCodeSumMeasuresInput.parse(input);
    const response = await client.getCodeSumMeasures();
    const result = mapCheckRecordItem(
      "Loaded Check code sum measures",
      "code-sum-measures",
      "measures",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
