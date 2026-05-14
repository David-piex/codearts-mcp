import {
  formatTestPlanRecordListText,
  mapTestPlanRecordList
} from "./generic-read-tools.js";
import { testPlanListProjectIssuesInput } from "../schemas.js";

type Client = {
  listProjectIssues: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_id?: string;
    iteration_ids?: string;
    status_id?: string;
    module_id?: string;
    show_page_flag?: string;
    keyword?: string;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectIssuesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectIssuesInput.parse(input);
    const response = await client.listProjectIssues(parsed);
    const result = mapTestPlanRecordList(
      response.issues,
      response.total,
      "project issues",
      "issue",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
