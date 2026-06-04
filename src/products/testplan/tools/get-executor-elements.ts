import { testPlanGetExecutorElementsInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getExecutorElements: (input: {
    project_id: string;
    execute_mode?: string;
    testcase_infos?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetExecutorElementsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetExecutorElementsInput.parse(input);
    const response = await client.getExecutorElements(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded TestPlan executor elements for project ${parsed.project_id}`,
      parsed.project_id,
      "executorElements",
      response.raw,
      {
        projectId: parsed.project_id,
        executeMode: parsed.execute_mode,
        testcaseCount: parsed.testcase_infos?.length
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
