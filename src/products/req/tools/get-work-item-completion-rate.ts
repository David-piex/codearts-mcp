import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemCompletionRateInput } from "../schemas.js";

type ReqIssueStatus = {
  new_num?: number;
  process_num?: number;
  solved_num?: number;
  test_num?: number;
  closed_num?: number;
  rejected_num?: number;
};

type ReqIssueCompletionRate = {
  tracker_id?: number;
  issue_status?: ReqIssueStatus;
};

type ReqWorkItemCompletionRate = {
  project_id: string;
  total?: number;
  issue_completion_rates?: ReqIssueCompletionRate[];
};

function mapReqIssueStatus(input?: ReqIssueStatus) {
  return {
    newNum: input?.new_num,
    processNum: input?.process_num,
    solvedNum: input?.solved_num,
    testNum: input?.test_num,
    closedNum: input?.closed_num,
    rejectedNum: input?.rejected_num
  };
}

export function mapReqWorkItemCompletionRate(input: ReqWorkItemCompletionRate) {
  return asItemResult(`Loaded work item completion rates for ${input.project_id}`, {
    projectId: input.project_id,
    total: input.total,
    issueCompletionRates: (input.issue_completion_rates ?? []).map((item) => ({
      trackerId: item.tracker_id,
      issueStatus: mapReqIssueStatus(item.issue_status)
    }))
  });
}

type ReqGetWorkItemCompletionRateClient = {
  getWorkItemCompletionRate: (input: { project_id: string }) => Promise<ReqWorkItemCompletionRate>;
};

export function createReqGetWorkItemCompletionRateHandler(
  client: ReqGetWorkItemCompletionRateClient
) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemCompletionRateInput.parse(input);
    const response = await client.getWorkItemCompletionRate(parsed);
    const result = mapReqWorkItemCompletionRate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
