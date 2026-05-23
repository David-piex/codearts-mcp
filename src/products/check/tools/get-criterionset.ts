import { checkGetCriterionsetInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getCriterionset: (input: { set_id: string; operator?: string }) => Promise<{
    set_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetCriterionsetHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetCriterionsetInput.parse(input);
    const response = await client.getCriterionset(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check criterionset ${parsed.set_id}`,
      parsed.set_id,
      "criterionset",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
