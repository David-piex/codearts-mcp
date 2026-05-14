import { testPlanGetTesthubProgressInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getTesthubProgress: (input: { project_uuid: string; operation_uri: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTesthubProgressHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTesthubProgressInput.parse(input);
    const response = await client.getTesthubProgress(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded TestHub progress ${parsed.operation_uri}`,
      parsed.operation_uri,
      "progress",
      response.raw,
      { projectUuid: parsed.project_uuid }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
