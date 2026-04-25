import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { checkListTaskIssuesInput } from "../schemas.js";

export function mapCheckTaskIssues(
  items: Array<{
    issue_id: string;
    rule_name?: string;
    severity?: string;
    file_path?: string;
    line?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} check issues found`,
    items.map((item) => ({
      id: item.issue_id,
      ruleName: item.rule_name,
      severity: item.severity,
      filePath: item.file_path,
      line: item.line
    })),
    toPageInfo(page, pageSize, total)
  );
}

type CheckListTaskIssuesClient = {
  listTaskIssues: (input: {
    task_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    severity?: string;
    defect_level?: string;
    rule_id?: string;
    rule_name?: string;
    file_path?: string;
    status?: string;
    checker?: string;
  }) => Promise<{
    issues: Array<{
      issue_id: string;
      rule_name?: string;
      severity?: string;
      file_path?: string;
      line?: number;
    }>;
    total?: number;
  }>;
};

export function createCheckListTaskIssuesHandler(client: CheckListTaskIssuesClient) {
  return async (input: unknown) => {
    const parsed = checkListTaskIssuesInput.parse(input);
    const response = await client.listTaskIssues(parsed);
    const result = mapCheckTaskIssues(response.issues, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
