import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCaseLogdataUploadUrlInput } from "../schemas.js";

type Client = {
  getCaseLogdataUploadUrl: (input: {
    project_id: string;
    task_id: string;
    file_type: string;
    case_id?: string;
    filename?: string;
    round?: string;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCaseLogdataUploadUrlHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetCaseLogdataUploadUrlInput.parse(input);
    const response = await client.getCaseLogdataUploadUrl(parsed);
    const result = asItemResult(`Loaded TestPlan case logdata upload URL for task ${response.task_id}`, {
      id: response.task_id,
      taskId: response.task_id,
      caseId: parsed.case_id,
      fileType: parsed.file_type,
      uploadUrl: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
