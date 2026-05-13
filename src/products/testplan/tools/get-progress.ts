import { testPlanGetProgressInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getProgress: (input: { id: string; project_id?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProgressHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetProgressInput.parse(input);
    const response = await client.getProgress(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded progress ${parsed.id}`,
      parsed.id,
      "progress",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
