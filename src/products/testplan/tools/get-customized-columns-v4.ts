import { testPlanGetCustomizedColumnsInput } from "../schemas.js";
import { mapTestPlanCustomizedColumns } from "./get-customized-columns.js";

type Client = {
  getCustomizedColumnsV4: (input: {
    project_id: string;
    service_type: number;
    stage_type: number;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCustomizedColumnsV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetCustomizedColumnsInput.parse(input);
    const response = await client.getCustomizedColumnsV4(parsed);
    const result = mapTestPlanCustomizedColumns(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
