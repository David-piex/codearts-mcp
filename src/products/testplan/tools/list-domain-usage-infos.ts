import { testPlanListDomainUsageInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListDomainUsageInfosClient = {
  listDomainUsageInfos: (input: { project_uuid: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListDomainUsageInfosHandler(
  client: TestPlanListDomainUsageInfosClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListDomainUsageInfosInput.parse(input);
    const response = await client.listDomainUsageInfos(parsed);
    const result = mapTestPlanRecordList(response.usages, response.total, "domain usage infos", "usage");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
