import { testPlanCheckUserDefinedConfigUsedInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanCheckUserDefinedConfigUsedClient = {
  checkUserDefinedConfigUsed: (input: {
    project_id: string;
    config_id: string;
    type: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckUserDefinedConfigUsedHandler(
  client: TestPlanCheckUserDefinedConfigUsedClient
) {
  return async (input: unknown) => {
    const parsed = testPlanCheckUserDefinedConfigUsedInput.parse(input);
    const response = await client.checkUserDefinedConfigUsed(parsed);
    const result = mapTestPlanValueItem(
      `Checked user-defined config ${parsed.config_id}`,
      parsed.config_id,
      "usage",
      response.value,
      response.raw,
      { projectId: parsed.project_id, type: parsed.type }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
