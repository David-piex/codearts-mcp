import { checkGetTaskOwnerMatchingSwitchInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskOwnerMatchingSwitch: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskOwnerMatchingSwitchHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskOwnerMatchingSwitchInput.parse(input);
    const response = await client.getTaskOwnerMatchingSwitch(parsed);
    const result = mapCheckRecordItem(
      "Loaded Check task owner matching switch",
      response.task_id,
      "ownerMatchingSwitch",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
