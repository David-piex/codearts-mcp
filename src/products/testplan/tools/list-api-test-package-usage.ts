import { testPlanListApiTestPackageUsageInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListApiTestPackageUsageClient = {
  listApiTestPackageUsage: (input: { project_id: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListApiTestPackageUsageHandler(
  client: TestPlanListApiTestPackageUsageClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestPackageUsageInput.parse(input);
    const response = await client.listApiTestPackageUsage(parsed);
    const result = mapTestPlanRecordList(
      response.usages,
      response.total,
      "API test package usages",
      "usage"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
