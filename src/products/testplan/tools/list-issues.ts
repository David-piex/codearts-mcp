import { asListResult } from "../../../contracts/tool-result.js";
import { testPlanListIssuesInput } from "../schemas.js";

export function mapIssues(
  items: Array<{
    issue_id: string;
    subject?: string;
    tracker_name?: string;
    parent_issue_id?: string;
    owner_name?: string;
    status?: string;
    severity?: string;
    module?: string;
    iteration?: string;
    start_date?: string;
    end_date?: string;
    workitem_id?: string;
    region_id?: string;
  }>
) {
  return asListResult(
    `${items.length} requirement items found`,
    items.map((item) => ({
      id: item.issue_id,
      title: item.subject,
      type: item.tracker_name,
      parentId: item.parent_issue_id,
      ownerName: item.owner_name,
      status: item.status,
      severity: item.severity,
      module: item.module,
      iteration: item.iteration,
      startDate: item.start_date,
      endDate: item.end_date,
      workItemId: item.workitem_id,
      regionId: item.region_id
    }))
  );
}

type TestPlanListIssuesClient = {
  listIssues: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<{
      issue_id: string;
      subject?: string;
      tracker_name?: string;
      parent_issue_id?: string;
      owner_name?: string;
      status?: string;
      severity?: string;
      module?: string;
      iteration?: string;
      start_date?: string;
      end_date?: string;
      workitem_id?: string;
      region_id?: string;
    }>;
  }>;
};

export function createTestPlanListIssuesHandler(client: TestPlanListIssuesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListIssuesInput.parse(input);
    const response = await client.listIssues(parsed);
    const result = mapIssues(response.issues);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
