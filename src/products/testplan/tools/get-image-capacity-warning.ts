import { testPlanGetImageCapacityWarningInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetImageCapacityWarningClient = {
  getImageCapacityWarning: (input: { project_id: string }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetImageCapacityWarningHandler(
  client: TestPlanGetImageCapacityWarningClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetImageCapacityWarningInput.parse(input);
    const response = await client.getImageCapacityWarning(parsed);
    const result = mapTestPlanValueItem(
      `Loaded image capacity warning for ${parsed.project_id}`,
      parsed.project_id,
      "warning",
      response.value,
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
