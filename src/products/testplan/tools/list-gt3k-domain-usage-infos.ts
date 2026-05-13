import { testPlanListGt3kDomainUsageInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kDomainUsageInfosClient = {
  listGt3kDomainUsageInfos: (input: { project_uuid: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kDomainUsageInfosHandler(
  client: TestPlanListGt3kDomainUsageInfosClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kDomainUsageInfosInput.parse(input);
    const response = await client.listGt3kDomainUsageInfos(parsed);
    const result = mapTestPlanRecordList(
      response.usages,
      response.total,
      "GT3K domain usage infos",
      "usage"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
