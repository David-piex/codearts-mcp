import { testPlanGetApiTestDebugLogInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetApiTestDebugLogClient = {
  getApiTestDebugLog: (input: {
    project_id: string;
    case_id: string;
    task_id: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestDebugLogHandler(
  client: TestPlanGetApiTestDebugLogClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestDebugLogInput.parse(input);
    const response = await client.getApiTestDebugLog(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test debug log for task ${parsed.task_id}`,
      parsed.task_id,
      "debugLog",
      response.raw,
      { projectId: parsed.project_id, caseId: parsed.case_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
