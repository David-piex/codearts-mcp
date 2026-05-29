import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCaseLogdataArchiveInput } from "../schemas.js";

type Client = {
  getCaseLogdataArchive: (input: {
    project_id: string;
    case_id: string;
    task_id: string;
    round?: string;
  }) => Promise<{
    task_id: string;
    case_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCaseLogdataArchiveHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetCaseLogdataArchiveInput.parse(input);
    const response = await client.getCaseLogdataArchive(parsed);
    const result = asItemResult(`Loaded TestPlan case logdata archive for task ${response.task_id}`, {
      id: response.task_id,
      taskId: response.task_id,
      caseId: response.case_id,
      archive: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
