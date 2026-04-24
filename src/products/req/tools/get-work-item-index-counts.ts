import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemIndexCountsInput } from "../schemas.js";

type ReqWorkItemIndexCounts = {
  project_id: string;
  work_item_id: string;
  related_issue_count?: number;
  related_wiki_count?: number;
  related_test_case_count?: number;
  related_test_plan_count?: number;
  code_commit_count?: number;
  code_branch_count?: number;
  code_mergerequest_count?: number;
};

export function mapReqWorkItemIndexCounts(input: ReqWorkItemIndexCounts) {
  return asItemResult(`Loaded work item index counts for ${input.work_item_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    relatedIssueCount: input.related_issue_count,
    relatedWikiCount: input.related_wiki_count,
    relatedTestCaseCount: input.related_test_case_count,
    relatedTestPlanCount: input.related_test_plan_count,
    codeCommitCount: input.code_commit_count,
    codeBranchCount: input.code_branch_count,
    codeMergeRequestCount: input.code_mergerequest_count
  });
}

type ReqGetWorkItemIndexCountsClient = {
  getWorkItemIndexCounts: (input: {
    project_id: string;
    work_item_id: string;
  }) => Promise<ReqWorkItemIndexCounts>;
};

export function createReqGetWorkItemIndexCountsHandler(client: ReqGetWorkItemIndexCountsClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemIndexCountsInput.parse(input);
    const response = await client.getWorkItemIndexCounts(parsed);
    const result = mapReqWorkItemIndexCounts(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
