import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCustomizedColumnsInput } from "../schemas.js";

export function mapTestPlanCustomizedColumns(input: {
  project_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded customized columns for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    columns: input.raw
  });
}

type TestPlanGetCustomizedColumnsClient = {
  getCustomizedColumns: (input: {
    project_id: string;
    service_type: number;
    stage_type: number;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCustomizedColumnsHandler(
  client: TestPlanGetCustomizedColumnsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetCustomizedColumnsInput.parse(input);
    const response = await client.getCustomizedColumns(parsed);
    const result = mapTestPlanCustomizedColumns(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
