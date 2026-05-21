import { testPlanListTestcaseUrisV4Input } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTestcaseUrisV4: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    useOffset?: boolean;
    version_uri?: string;
    case_uris?: string[];
    owner_ids?: string[];
    status_codes?: number[];
    rank_ids?: string[];
    module_ids?: string[];
    issue_id?: string;
    creator_ids?: string[];
    result_codes?: number[];
    iteration_ids?: string[];
    create_start_time?: string;
    create_end_time?: string;
    associated_issue?: boolean;
    associated_defects?: boolean;
    include_sub_issue?: boolean;
    include_sub_feature?: boolean;
    label_ids?: string[];
    execute_start_time?: string;
    execute_end_time?: string;
    executor_ids?: string[];
    test_types?: number[];
    is_keyword?: boolean;
    issue_tree_search?: boolean;
    service_type?: number;
    service_types?: number[];
    stage_type?: number;
    feature_uri?: string;
    sort_field?: string;
    sort_type?: string;
    case_type?: number;
    custom_field_info?: Record<string, unknown>;
    task_uri?: string;
    associate_issue_detail?: boolean;
    not_assign_task?: boolean;
    test_designs?: string[];
    review_status?: number;
    just_return_id?: boolean;
  }) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListTestcaseUrisV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseUrisV4Input.parse(input);
    const response = await client.listTestcaseUrisV4(parsed);
    const result = mapTestPlanRecordList(
      response.uris,
      response.total,
      "TestPlan testcase URIs",
      "uri",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
