import { testPlanListTestReportCustomInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListTestReportCustomInfosClient = {
  listTestReportCustomInfos: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    infos: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestReportCustomInfosHandler(
  client: TestPlanListTestReportCustomInfosClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestReportCustomInfosInput.parse(input);
    const response = await client.listTestReportCustomInfos(parsed);
    const result = mapTestPlanRecordList(response.infos, response.total, "test report custom infos", "info");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
