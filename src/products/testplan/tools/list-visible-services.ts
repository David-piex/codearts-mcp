import { testPlanListVisibleServicesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListVisibleServicesClient = {
  listVisibleServices: (input: { project_id: string }) => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListVisibleServicesHandler(
  client: TestPlanListVisibleServicesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListVisibleServicesInput.parse(input);
    const response = await client.listVisibleServices(parsed);
    const result = mapTestPlanRecordList(response.services, response.total, "visible services", "service");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
