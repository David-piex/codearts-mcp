import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemStatusRuleFlagInput } from "../schemas.js";

type ReqWorkItemStatusRuleFlag = {
  project_id: string;
  tracker_id: 2 | 3 | 5 | 6 | 7;
  status_rule_flag: {
    tracker_config_id?: string | number;
    issue_field_config?: boolean;
    code_commit?: boolean;
  };
};

export function mapReqWorkItemStatusRuleFlag(input: ReqWorkItemStatusRuleFlag) {
  return asItemResult(`Loaded work item status rule flag for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    statusRuleFlag: {
      trackerConfigId: input.status_rule_flag.tracker_config_id,
      issueFieldConfig: input.status_rule_flag.issue_field_config,
      codeCommit: input.status_rule_flag.code_commit
    }
  });
}

type ReqGetWorkItemStatusRuleFlagClient = {
  getWorkItemStatusRuleFlag: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<ReqWorkItemStatusRuleFlag>;
};

export function createReqGetWorkItemStatusRuleFlagHandler(
  client: ReqGetWorkItemStatusRuleFlagClient
) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemStatusRuleFlagInput.parse(input);
    const response = await client.getWorkItemStatusRuleFlag(parsed);
    const result = mapReqWorkItemStatusRuleFlag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
