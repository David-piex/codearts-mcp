import { testPlanListTestcaseRelationsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTestcaseRelations: (input: {
    project_id: string;
    test_case_uris: string[];
    page: number;
    page_size: number;
    version_uri?: string;
    tracker_id?: string;
    relate_type?: string;
    owner?: string[];
    severity?: string[];
    status?: string[];
    findReleaseDev?: string[];
    keyWord?: string;
    ownerContainEmpty?: boolean;
    severityContainEmpty?: boolean;
    statusContainEmpty?: boolean;
  }) => Promise<{
    relations: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestcaseRelationsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseRelationsInput.parse(input);
    const response = await client.listTestcaseRelations(parsed);
    const result = mapTestPlanRecordList(
      response.relations,
      response.total,
      "TestPlan testcase relations",
      "relation",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
