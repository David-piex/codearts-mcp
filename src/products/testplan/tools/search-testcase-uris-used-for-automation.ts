import { testPlanSearchTestcaseUrisUsedForAutomationInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  searchTestcaseUrisUsedForAutomation: (input: {
    project_uuid: string;
    page: number;
    page_size: number;
    keyword?: string;
    exeplatforms?: string[];
    own?: boolean;
    conditions?: Array<Record<string, unknown>>;
    queryByDisplayCfg?: boolean;
    useOffset?: boolean;
    version_uri?: string;
    case_uris?: string[];
    owner_ids?: string[];
    status_codes?: string[];
    rank_ids?: string[];
    module_ids?: string[];
    issue_id?: string;
    creator_ids?: string[];
    [key: string]: unknown;
  }) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanSearchTestcaseUrisUsedForAutomationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanSearchTestcaseUrisUsedForAutomationInput.parse(input);
    const response = await client.searchTestcaseUrisUsedForAutomation(parsed);
    const result = mapTestPlanRecordList(
      response.uris,
      response.total,
      "TestPlan automation testcase URIs",
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
