import { testPlanListRegisteredServicesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListRegisteredServicesClient = {
  listRegisteredServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListRegisteredServicesHandler(
  client: TestPlanListRegisteredServicesClient
) {
  return async (input: unknown) => {
    testPlanListRegisteredServicesInput.parse(input);
    const response = await client.listRegisteredServices();
    const result = mapTestPlanRecordList(
      response.services,
      response.total,
      "registered services",
      "service"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
