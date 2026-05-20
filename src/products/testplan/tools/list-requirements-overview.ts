import { testPlanListRequirementsOverviewInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listRequirementsOverview: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    fixed_version_id?: string;
    module_id?: string;
    key_word?: string;
    pi_filter?: Record<string, unknown>;
  }) => Promise<{
    requirements: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListRequirementsOverviewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListRequirementsOverviewInput.parse(input);
    const response = await client.listRequirementsOverview(parsed);
    const result = mapTestPlanRecordList(
      response.requirements,
      response.total,
      "TestPlan requirements overview entries",
      "requirement",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        overview: response.raw
      }
    };
  };
}
