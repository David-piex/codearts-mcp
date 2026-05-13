import { testPlanListServiceOfferingsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListServiceOfferingsClient = {
  listServiceOfferings: (input: { serviceNames?: string }) => Promise<{
    offerings: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListServiceOfferingsHandler(
  client: TestPlanListServiceOfferingsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListServiceOfferingsInput.parse(input);
    const response = await client.listServiceOfferings(parsed);
    const result = mapTestPlanRecordList(
      response.offerings,
      response.total,
      "service offerings",
      "offering"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
