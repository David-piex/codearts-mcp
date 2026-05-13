import { testPlanGetVariableSynchronizationV2Input } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getVariableSynchronizationV2: (input: {
    project_id: string;
    variable_name: string;
    group_id?: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetVariableSynchronizationV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetVariableSynchronizationV2Input.parse(input);
    const response = await client.getVariableSynchronizationV2(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded v2 variable synchronization info for ${parsed.variable_name}`,
      parsed.variable_name,
      "synchronization",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
