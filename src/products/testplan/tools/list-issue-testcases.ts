import { testPlanListIssueTestcasesInput } from "../schemas.js";
import { mapTestPlanTaskCasesV4 } from "./list-task-cases-v4.js";

type Client = {
  listIssueTestcases: (input: {
    project_id: string;
    issue_id: string;
    page: number;
    page_size: number;
    version_uri?: string;
    relate_type?: string;
    key_word?: string;
    sort_field?: string;
    sort_type?: string;
    rank_ids?: string[];
    result_codes?: string[];
  }) => Promise<{
    cases: Array<{
      case_id: string;
      name?: string;
      status?: string;
      result?: string;
      executor_id?: string;
      executor_name?: string;
    }>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListIssueTestcasesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListIssueTestcasesInput.parse(input);
    const response = await client.listIssueTestcases(parsed);
    const result = mapTestPlanTaskCasesV4(
      response.cases,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        issueId: parsed.issue_id,
        overview: response.raw
      }
    };
  };
}
