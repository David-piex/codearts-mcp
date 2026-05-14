import { testPlanListApiTestPackageStatusInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestPackageStatus: (input: {
    service_id: string;
  }) => Promise<{ statuses: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestPackageStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestPackageStatusInput.parse(input);
    const response = await client.listApiTestPackageStatus(parsed);
    const result = mapTestPlanRecordList(
      response.statuses,
      response.total,
      "API test package statuses",
      "status"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
