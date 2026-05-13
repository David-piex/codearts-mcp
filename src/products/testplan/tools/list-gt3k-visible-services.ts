import { testPlanListGt3kVisibleServicesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kVisibleServicesClient = {
  listGt3kVisibleServices: (input: { project_id: string }) => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kVisibleServicesHandler(
  client: TestPlanListGt3kVisibleServicesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kVisibleServicesInput.parse(input);
    const response = await client.listGt3kVisibleServices(parsed);
    const result = mapTestPlanRecordList(
      response.services,
      response.total,
      "GT3K visible services",
      "service"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
