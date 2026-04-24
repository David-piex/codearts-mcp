import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectSummaryInput } from "../schemas.js";

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

type ReqDemandStatistic = {
  module?: string;
  total?: number;
  new_num?: number;
  process_num?: number;
  solved_num?: number;
  test_num?: number;
  closed_num?: number;
  rejected_num?: number;
};

type ReqBugStatistic = {
  module?: string;
  total?: number;
  critical_num?: number;
  serious_num?: number;
  normal_num?: number;
  tip_num?: number;
  defect_index?: number;
};

type ReqProjectSummary = {
  project_id: string;
  bug_statistics?: ReqBugStatistic[];
  demand_statistics?: ReqDemandStatistic[];
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

function mapReqIssueCompletionRates(items: ReqIssueCompletionRate[] = []) {
  return items.map((item) => ({
    trackerId: item.tracker_id,
    issueStatus: mapReqIssueStatus(item.issue_status)
  }));
}

export function mapReqProjectSummary(input: ReqProjectSummary) {
  return asItemResult(`Loaded project summary for ${input.project_id}`, {
    projectId: input.project_id,
    bugStatistics: (input.bug_statistics ?? []).map((item) => ({
      module: item.module,
      total: item.total,
      criticalNum: item.critical_num,
      seriousNum: item.serious_num,
      normalNum: item.normal_num,
      tipNum: item.tip_num,
      defectIndex: item.defect_index
    })),
    demandStatistics: (input.demand_statistics ?? []).map((item) => ({
      module: item.module,
      total: item.total,
      newNum: item.new_num,
      processNum: item.process_num,
      solvedNum: item.solved_num,
      testNum: item.test_num,
      closedNum: item.closed_num,
      rejectedNum: item.rejected_num
    })),
    issueCompletionRates: mapReqIssueCompletionRates(input.issue_completion_rates)
  });
}

type ReqGetProjectSummaryClient = {
  getProjectSummary: (input: { project_id: string }) => Promise<ReqProjectSummary>;
};

export function createReqGetProjectSummaryHandler(client: ReqGetProjectSummaryClient) {
  return async (input: unknown) => {
    const parsed = reqGetProjectSummaryInput.parse(input);
    const response = await client.getProjectSummary(parsed);
    const result = mapReqProjectSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
