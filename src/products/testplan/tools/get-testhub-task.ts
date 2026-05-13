import { testPlanGetTesthubTaskInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetTesthubTaskClient = {
  getTesthubTask: (input: {
    project_id: string;
    task_uri: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTesthubTaskHandler(client: TestPlanGetTesthubTaskClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetTesthubTaskInput.parse(input);
    const response = await client.getTesthubTask(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded TestHub task ${response.task_id}`,
      response.task_id,
      "task",
      response.raw,
      { projectId: parsed.project_id, versionUri: parsed.version_uri }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
